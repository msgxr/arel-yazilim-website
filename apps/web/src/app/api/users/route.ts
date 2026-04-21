import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(['USER', 'MEMBER', 'ADMIN', 'SUPER_ADMIN']).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const where: Record<string, unknown> = {};
    if (role) where.role = role;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: { memberships: true, applications: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      users,
      pagination: { total, limit, offset, hasMore: offset + users.length < total },
    });
  } catch (error) {
    console.error('[Users GET]', error);
    return NextResponse.json({ success: false, error: 'Kullanıcılar yüklenemedi' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID gerekli' }, { status: 400 });
    }

    if (session.user.role !== 'SUPER_ADMIN' && data.role === 'SUPER_ADMIN') {
      return NextResponse.json({ success: false, error: 'Bu işlem için yetkiniz yok' }, { status: 403 });
    }

    const validated = updateUserSchema.parse(data);

    const updateData: Record<string, unknown> = {};
    if (validated.name) updateData.name = validated.name;
    if (validated.role) updateData.role = validated.role;
    if (typeof validated.isActive === 'boolean') updateData.isActive = validated.isActive;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validasyon hatası' }, { status: 400 });
    }
    console.error('[Users PATCH]', error);
    return NextResponse.json({ success: false, error: 'Güncelleme yapılamadı' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID gerekli' }, { status: 400 });
    }

    if (id === session.user.id) {
      return NextResponse.json({ success: false, error: 'Kendinizi silemezsiniz' }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Users DELETE]', error);
    return NextResponse.json({ success: false, error: 'Silme yapılamadı' }, { status: 500 });
  }
}
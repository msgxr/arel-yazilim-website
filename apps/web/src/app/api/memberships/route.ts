import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createMembershipSchema = z.object({
  userId: z.string(),
  role: z.enum(['MEMBER', 'BOARD', 'ADMIN']).default('MEMBER'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).default('ACTIVE'),
  position: z.string().optional(),
});

const updateMembershipSchema = z.object({
  role: z.enum(['MEMBER', 'BOARD', 'ADMIN']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).optional(),
  position: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const role = searchParams.get('role');

  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (role) where.role = role;

    const memberships = await prisma.membership.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { memberSince: 'desc' },
    });

    return NextResponse.json({ success: true, memberships });
  } catch (error) {
    console.error('[Memberships GET]', error);
    return NextResponse.json({ success: false, error: 'Üyelikler yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const body = await request.json();
    const validated = createMembershipSchema.parse(body);

    const membership = await prisma.membership.create({
      data: {
        userId: validated.userId,
        role: validated.role,
        status: validated.status,
        position: validated.position || null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, membership });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validasyon hatası' }, { status: 400 });
    }
    console.error('[Memberships POST]', error);
    return NextResponse.json({ success: false, error: 'Üyelik oluşturulamadı' }, { status: 500 });
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

    const validated = updateMembershipSchema.parse(data);

    const updateData: Record<string, unknown> = {};
    if (validated.role) updateData.role = validated.role;
    if (validated.status) updateData.status = validated.status;
    if (validated.position) updateData.position = validated.position;

    const membership = await prisma.membership.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, membership });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validasyon hatası' }, { status: 400 });
    }
    console.error('[Memberships PATCH]', error);
    return NextResponse.json({ success: false, error: 'Güncelleme yapılamadı' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID gerekli' }, { status: 400 });
    }

    await prisma.membership.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Memberships DELETE]', error);
    return NextResponse.json({ success: false, error: 'Silme yapılamadı' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createAnnouncementSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  type: z.enum(['GENERAL', 'EVENT', 'MEMBERSHIP', 'URGENT']).default('GENERAL'),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH']).default('NORMAL'),
  isPinned: z.boolean().default(false),
  publishedAt: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const where: Record<string, unknown> = {};
    
    if (type) where.type = type;

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        include: {
          author: { select: { id: true, name: true } },
        },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        take: limit,
        skip: offset,
      }),
      prisma.announcement.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      announcements,
      pagination: { total, limit, offset, hasMore: offset + announcements.length < total },
    });
  } catch (error) {
    console.error('[Announcements GET]', error);
    return NextResponse.json({ success: false, error: 'Duyurular yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const body = await request.json();
    const validated = createAnnouncementSchema.parse(body);

    const slug = validated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    const announcement = await prisma.announcement.create({
      data: {
        title: validated.title,
        content: validated.content,
        type: validated.type,
        priority: validated.priority,
        isPinned: validated.isPinned,
        slug,
        authorId: session.user.id,
        publishedAt: validated.publishedAt ? new Date(validated.publishedAt) : new Date(),
      },
    }).catch((e: unknown) => {
      console.error('Announcement create error:', e);
      throw e;
    });

    return NextResponse.json({ success: true, announcement });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validasyon hatası' }, { status: 400 });
    }
    console.error('[Announcements POST]', error);
    return NextResponse.json({ success: false, error: 'Duyuru oluşturulamadı' }, { status: 500 });
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

    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title;
    if (data.content) updateData.content = data.content;
    if (data.type) updateData.type = data.type;
    if (data.priority) updateData.priority = data.priority;
    if (typeof data.isPinned === 'boolean') updateData.isPinned = data.isPinned;
    if (typeof data.isPublished === 'boolean') updateData.isPublished = data.isPublished;

    const announcement = await prisma.announcement.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, announcement });
  } catch (error) {
    console.error('[Announcements PATCH]', error);
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

    await prisma.announcement.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Announcements DELETE]', error);
    return NextResponse.json({ success: false, error: 'Silme yapılamadı' }, { status: 500 });
  }
}
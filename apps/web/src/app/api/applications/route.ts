import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createApplicationSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  studentId: z.string().optional(),
  department: z.string().min(2),
  year: z.enum(['1', '2', '3', '4', '5']),
  motivation: z.string().min(50),
  experience: z.string().optional(),
  source: z.enum(['FRIEND', 'SOCIAL_MEDIA', 'POSTER', 'NEWS', 'OTHER']).optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'WAITING_LIST']),
  reviewNotes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      applications,
      pagination: { total, limit, offset, hasMore: offset + applications.length < total },
    });
  } catch (error) {
    console.error('[Applications GET]', error);
    return NextResponse.json({ success: false, error: 'Başvurular yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Giriş yapmalısınız' }, { status: 401 });
    }

    const body = await request.json();
    const validated = createApplicationSchema.parse(body);

    const existing = await prisma.application.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ['PENDING', 'REVIEWING'] },
      },
    });

    if (existing) {
      return NextResponse.json({ success: false, error: 'Zaten aktif bir başvurunuz var' }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        department: validated.department,
        year: validated.year,
        motivation: validated.motivation,
        studentId: validated.studentId || null,
        experience: validated.experience || null,
        source: validated.source || null,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validasyon hatası' }, { status: 400 });
    }
    console.error('[Applications POST]', error);
    return NextResponse.json({ success: false, error: 'Başvuru gönderilemedi' }, { status: 500 });
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

    const validated = updateStatusSchema.parse(data);

    const application = await prisma.application.update({
      where: { id },
      data: {
        status: validated.status,
        reviewNotes: validated.reviewNotes || null,
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (validated.status === 'APPROVED' && application.userId) {
      const existingMember = await prisma.membership.findUnique({
        where: { userId: application.userId },
      });
      
      if (!existingMember) {
        await prisma.membership.create({
          data: {
            userId: application.userId,
            role: 'MEMBER',
            status: 'ACTIVE',
          },
        });
      }
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validasyon hatası' }, { status: 400 });
    }
    console.error('[Applications PATCH]', error);
    return NextResponse.json({ success: false, error: 'Güncelleme yapılamadı' }, { status: 500 });
  }
}
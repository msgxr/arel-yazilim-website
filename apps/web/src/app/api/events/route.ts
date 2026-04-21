import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createEventSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  type: z.enum(['WORKSHOP', 'HACKATHON', 'SEMINAR', 'PANEL', 'TRAINING', 'SOCIAL', 'MEETUP']),
  location: z.string(),
  isOnline: z.boolean().default(false),
  meetingUrl: z.string().url().optional(),
  capacity: z.number().optional(),
  date: z.string(),
  endDate: z.string().optional(),
  registrationDeadline: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'REGISTRATION_OPEN', 'ONGOING', 'COMPLETED', 'CANCELLED']).default('DRAFT'),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  agenda: z.array(z.object({ time: z.string(), title: z.string(), speaker: z.string().optional() })).optional(),
  registrationUrl: z.string().url().optional(),
  requirements: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const featured = searchParams.get('featured');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const where: Record<string, unknown> = {};

    if (status) where.status = status;
    if (type) where.type = type;
    if (featured === 'true') where.featured = true;

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          creator: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { attendances: true },
          },
        },
        orderBy: { date: 'asc' },
        take: limit,
        skip: offset,
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      events,
      pagination: { total, limit, offset, hasMore: offset + events.length < total },
    });
  } catch (error) {
    console.error('[Events GET]', error);
    return NextResponse.json({ success: false, error: 'Etkinlikler yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Yetkiniz yok' }, { status: 403 });
    }

    const body = await request.json();
    const validated = createEventSchema.parse(body);

    const event = await prisma.event.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        type: validated.type,
        location: validated.location,
        isOnline: validated.isOnline,
        meetingUrl: validated.meetingUrl || null,
        capacity: validated.capacity || null,
        date: new Date(validated.date),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        registrationDeadline: validated.registrationDeadline ? new Date(validated.registrationDeadline) : null,
        status: validated.status,
        featured: validated.featured,
        tags: validated.tags ? JSON.stringify(validated.tags) : null,
        agenda: validated.agenda ? JSON.stringify(validated.agenda) : null,
        registrationUrl: validated.registrationUrl || null,
        requirements: validated.requirements || null,
        creatorId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validasyon hatası' }, { status: 400 });
    }
    console.error('[Events POST]', error);
    return NextResponse.json({ success: false, error: 'Etkinlik oluşturulamadı' }, { status: 500 });
  }
}
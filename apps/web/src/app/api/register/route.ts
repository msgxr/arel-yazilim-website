import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

const registerSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı').max(100),
  email: z.string().email('Geçerli e-posta girin').toLowerCase(),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
  department: z.string().min(1, 'Bölüm seçimi zorunlu'),
  year: z.string().min(1, 'Sınıf seçimi zorunlu'),
  motivation: z.string().min(20, 'Motivasyon en az 20 karakter olmalı'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta adresi zaten kayıtlı' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validated.password, 12);

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        department: validated.department,
        year: validated.year,
        role: 'USER',
      },
    });

    await prisma.application.create({
      data: {
        userId: user.id,
        fullName: validated.name,
        email: validated.email,
        phone: '',
        department: validated.department,
        year: validated.year,
        motivation: validated.motivation,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı! Başvurunuz değerlendirilmek üzere iletildi.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0]?.message || 'Validasyon hatası' },
        { status: 400 }
      );
    }

    console.error('[Register Error]', error);
    return NextResponse.json(
      { success: false, error: 'Kayıt sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
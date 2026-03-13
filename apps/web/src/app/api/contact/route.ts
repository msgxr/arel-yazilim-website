import { type NextRequest, NextResponse } from 'next/server';export const dynamic = 'force-static';


export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; email?: string; message?: string; subject?: string };

    const { name, email, message, subject } = body;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Ad soyad, e-posta ve mesaj zorunludur.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitized = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 200),
      subject: (subject ?? 'Genel').trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
    };

    // Forward to Express backend if configured, otherwise log
    const backendUrl = process.env['BACKEND_API_URL'];
    if (backendUrl) {
      const backendRes = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
      });
      if (!backendRes.ok) {
        const err = await backendRes.json().catch(() => ({})) as { message?: string };
        return NextResponse.json(
          { success: false, message: err.message ?? 'Mesaj gönderilemedi.' },
          { status: 502 },
        );
      }
    } else {
      // Dev: log to console
      console.info('[Contact Form]', sanitized);
    }

    return NextResponse.json({ success: true, message: 'Mesajınız alındı.' }, { status: 200 });
  } catch (err) {
    console.error('[Contact Form Error]', err);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 },
    );
  }
}

// Only allow POST
export function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}

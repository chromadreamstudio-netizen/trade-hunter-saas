import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // هذا الجسر يكلم سيرفرك الألماني من الخلفية لتجاوز حظر المتصفحات
    const vpsResponse = await fetch('http://178.105.30.59:8000/api/generate-leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await vpsResponse.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("VPS Connection Error:", error);
    return NextResponse.json(
      { status: 'error', message: 'فشل الاتصال بالسيرفر الألماني. تأكد من تشغيل FastAPI.' },
      { status: 500 }
    );
  }
}
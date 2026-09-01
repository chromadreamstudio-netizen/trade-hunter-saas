import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to_email, company_name, email_body } = await req.json();

    const data = await resend.emails.send({
      from: 'TradeHunter <onboarding@resend.dev>', // سيتم تغييره لاحقاً لدومينك الرسمي
      to: [to_email],
      subject: `Partnership Inquiry with ${company_name}`,
      text: email_body,
    });

    return NextResponse.json({ status: 'success', data });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
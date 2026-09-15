import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/site-settings';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'contact-submissions.json');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string' || !name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    let submissions: unknown[] = [];
    try {
      const stored = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
      submissions = Array.isArray(stored) ? stored : [];
    } catch {
      submissions = [];
    }

    submissions.push({
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      received_at: new Date().toISOString(),
    });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf8');

    const recipient = getSiteSettings().admin_email || process.env.ADMIN_EMAIL;
    let emailSent = false;
    if (recipient && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: recipient,
          replyTo: email.trim(),
          subject: `[TechKnowledge inquiry] ${subject.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
        });
        emailSent = true;
      } catch (emailError) {
        console.error('Inquiry email delivery failed:', emailError instanceof Error ? emailError.message : 'unknown error');
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: emailSent ? 'Your message has been sent successfully.' : 'Your message has been received. We will get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

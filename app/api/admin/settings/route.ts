import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSiteSettings, saveSiteSettings } from '@/lib/site-settings';

async function isAdmin() {
  const token = (await cookies()).get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ settings: getSiteSettings() });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const settings = saveSiteSettings(await request.json());
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 400 });
  }
}

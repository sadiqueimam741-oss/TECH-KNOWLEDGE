import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createAdvertisementRecord, deleteAdvertisementRecord, getAdvertisements, updateAdvertisementRecord } from '@/lib/advertisements';
import { verifyToken } from '@/lib/auth';

async function isAdmin() {
  const token = (await cookies()).get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ advertisements: getAdvertisements() });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const advertisement = body.id ? updateAdvertisementRecord(body) : createAdvertisementRecord(body);
    return NextResponse.json({ advertisement });
  } catch {
    return NextResponse.json({ error: 'Failed to save advertisement' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Advertisement id required' }, { status: 400 });
    deleteAdvertisementRecord(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete advertisement' }, { status: 400 });
  }
}

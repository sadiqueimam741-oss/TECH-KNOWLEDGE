import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const UPLOAD_DIRECTORY = path.join(process.cwd(), 'public', 'uploads', 'advertisements');
const MIME_EXTENSIONS: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
};
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File) || !MIME_EXTENSIONS[file.type]) {
      return NextResponse.json({ error: 'Please select a JPG, PNG, GIF, WebP, or SVG image.' }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Image must be 5 MB or smaller.' }, { status: 400 });
    }

    await fs.mkdir(UPLOAD_DIRECTORY, { recursive: true });
    const filename = `${crypto.randomUUID()}${MIME_EXTENSIONS[file.type]}`;
    await fs.writeFile(path.join(UPLOAD_DIRECTORY, filename), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ url: `/uploads/advertisements/${filename}` });
  } catch {
    return NextResponse.json({ error: 'Unable to upload image.' }, { status: 500 });
  }
}

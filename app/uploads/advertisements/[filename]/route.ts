import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const UPLOAD_DIRECTORY = path.join(process.cwd(), 'public', 'uploads', 'advertisements');
const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (filename !== path.basename(filename)) return new NextResponse('Not found', { status: 404 });

  const extension = path.extname(filename).toLowerCase();
  const contentType = CONTENT_TYPES[extension];
  if (!contentType) return new NextResponse('Not found', { status: 404 });

  try {
    const file = await fs.readFile(path.join(UPLOAD_DIRECTORY, filename));
    return new NextResponse(file, { headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}

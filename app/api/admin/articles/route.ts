import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createArticleRecord, deleteArticleById, getArticleList, updateArticleRecord } from '@/lib/articles';
import { verifyToken } from '@/lib/auth';

async function isAdmin() {
  const token = (await cookies()).get('admin_token')?.value;
  return Boolean(token && verifyToken(token));
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ articles: getArticleList() }, { status: 200 });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const normalized = {
      ...body,
      tags: Array.isArray(body.tags) ? body.tags : [],
      status: body.status ?? 'draft',
      publication_date: body.publication_date ?? new Date().toISOString().slice(0, 10),
      reading_time: Number(body.reading_time ?? 5),
    };

    const article = body.id
      ? updateArticleRecord(normalized)
      : createArticleRecord(normalized);

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.error('Create/update article error:', error);
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const { id } = body ?? {};

    if (!id) {
      return NextResponse.json({ error: 'Article id required' }, { status: 400 });
    }

    deleteArticleById(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

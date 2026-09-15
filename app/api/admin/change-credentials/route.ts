import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, verifyPassword, hashPassword } from '@/lib/auth';
import { getAdminCredentials, setAdminCredentials } from '@/lib/admin-credentials';

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const token = (await cookies()).get('admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newUsername, newPassword } = body;

    if (!currentPassword || !newUsername || !newPassword) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const current = getAdminCredentials();

    // Verify current password
    const isPasswordValid = await verifyPassword(currentPassword, current.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Validate new credentials
    if (!newUsername.trim()) {
      return NextResponse.json(
        { error: 'New username cannot be empty' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update credentials in cache
    setAdminCredentials({
      username: newUsername,
      passwordHash: newPasswordHash,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Credentials updated successfully',
    });
    response.cookies.delete('admin_token');
    return response;
  } catch (error) {
    console.error('Change credentials error:', error);
    return NextResponse.json(
      { error: 'An error occurred while changing credentials' },
      { status: 500 }
    );
  }
}

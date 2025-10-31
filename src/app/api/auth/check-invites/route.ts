import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { autoAcceptPendingInvites } from '@/actions/team';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ accepted: 0 });
    }

    const result = await autoAcceptPendingInvites(session.user.id, session.user.email);

    return NextResponse.json({
      accepted: result.accepted || 0,
      ownerNames: result.ownerNames || [],
    });
  } catch (error) {
    console.error('Error checking invites:', error);
    return NextResponse.json({ error: 'Failed to check invites' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prismaClient';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const matchID = url.searchParams.get('matchID');

  if (!matchID) {
    return NextResponse.json({ error: 'matchId is required' }, { status: 400 });
  }

  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(matchID, 10) },
      include: {
        sets: {
          include: { scores: true },
        },
        team1: true,
        team2: true,
        user: true,
      },
    });

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    return NextResponse.json(match, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch match:', error);
    return NextResponse.json({ error: 'Failed to fetch match' }, { status: 500 });
  }
}

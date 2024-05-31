import { NextResponse } from 'next/server';
import prisma from '@/libs/prismaClient';

export async function GET(req: Request, { params }: { params: { matchID: string } }) {
  const { matchID } = params;

  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(matchID, 10) },
      include: {
        team1: true,
        team2: true,
        sets: {
          include: {
            scores: true,
          },
        },
      },
    });

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    return NextResponse.json(match);
  } catch (error) {
    console.error('Failed to fetch match data:', error);
    return NextResponse.json({ error: 'Failed to fetch match data' }, { status: 500 });
  }
}

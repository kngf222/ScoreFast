import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prismaClient';

export async function POST(req: Request) {
  const { matchId, setId, team1Score, team2Score } = await req.json();

  if (!matchId || !setId || team1Score === undefined || team2Score === undefined) {
    return NextResponse.json({ error: 'matchId, setId, team1Score, and team2Score are required' }, { status: 400 });
  }

  try {
    const set = await prisma.set.findUnique({
      where: { id: parseInt(setId, 10) },
      include: { scores: true },
    });

    if (!set) {
      return NextResponse.json({ error: 'Set not found' }, { status: 404 });
    }

    const newScore = await prisma.score.create({
      data: {
        setId: parseInt(setId, 10),
        team1Score,
        team2Score,
      },
    });

    return NextResponse.json({ message: 'Score updated successfully', updatedSet: set });
  } catch (error) {
    console.error('Failed to update score:', error);
    return NextResponse.json({ error: 'Failed to update score' }, { status: 500 });
  }
}

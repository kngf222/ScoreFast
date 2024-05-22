import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prismaClient';

export async function POST(req: Request) {
  const { player1, player2, player3, player4, userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const userExists = await prisma.userProfile.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    const team1 = await prisma.team.create({
      data: { player1, player2 },
    });

    const team2 = await prisma.team.create({
      data: { player1: player3, player2: player4 },
    });

    const match = await prisma.match.create({
      data: {
        team1Id: team1.id,
        team2Id: team2.id,
        userId,
        sets: {
          create: [
            { scores: { create: [{ team1Score: 0, team2Score: 0 }] } },
          ],
        },
      },
    });

    return NextResponse.json({ matchId: match.id }, { status: 200 });
  } catch (error) {
    console.error('Failed to create match:', error);
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}

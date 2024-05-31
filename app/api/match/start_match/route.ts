import { NextResponse } from 'next/server';
import prisma from '@/libs/prismaClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { player1, player2, player3, player4 } = body;

    const team1 = await prisma.team.create({
      data: {
        player1,
        player2,
      },
    });

    const team2 = await prisma.team.create({
      data: {
        player1: player3 || '',
        player2: player4 || '',
      },
    });

    const match = await prisma.match.create({
      data: {
        team1Id: team1.id,
        team2Id: team2.id,
        sets: {
          create: [{
            scores: {
              create: [{
                team1Score: 0,
                team2Score: 0,
              }],
            },
          }],
        },
      },
    });

    return NextResponse.json({ matchId: match.id });
  } catch (error) {
    console.error('Failed to create match:', error);
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}

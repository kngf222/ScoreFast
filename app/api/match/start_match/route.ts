import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../libs/prismaClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { player1, player2, player3, player4, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
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

      res.status(200).json({ matchId: match.id });
    } catch (error) {
      console.error('Failed to create match:', error);
      res.status(500).json({ error: 'Failed to create match' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

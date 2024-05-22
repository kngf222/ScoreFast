import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { player, newScore, matchId } = req.body;

    console.log('Request body:', req.body);

    if (!matchId) {
      console.log('No matchId provided');
      return res.status(400).json({ error: 'matchId is required' });
    }

    try {
      const match = await prisma.match.findUnique({
        where: { id: parseInt(matchId, 10) },
        include: { histories: true },
      });

      if (!match) {
        console.log('Match not found for matchId:', matchId);
        return res.status(404).json({ error: 'Match not found' });
      }

      const updateData = player === 'player1' ? { score1: newScore } : { score2: newScore };

      await prisma.match.update({
        where: { id: parseInt(matchId, 10) },
        data: updateData,
      });

      await prisma.history.create({
        data: {
          matchId: parseInt(matchId, 10),
          player,
          newScore,
        },
      });

      console.log('Score updated successfully for matchId:', matchId);
      res.status(200).json({ message: 'Score updated successfully' });
    } catch (error) {
      console.error('Failed to update score:', error);
      res.status(500).json({ error: 'Failed to update score' });
    }
  } else {
    console.log('Method not allowed');
    res.status(405).json({ error: 'Method not allowed' });
  }
};

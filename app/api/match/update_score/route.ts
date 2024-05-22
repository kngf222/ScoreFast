import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../libs/prismaClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { matchId, setId, team1Score, team2Score } = req.body;

    if (!matchId || !setId || team1Score === undefined || team2Score === undefined) {
      return res.status(400).json({ error: 'matchId, setId, team1Score, and team2Score are required' });
    }

    try {
      const set = await prisma.set.findUnique({
        where: { id: parseInt(setId, 10) },
        include: { scores: true },
      });

      if (!set) {
        return res.status(404).json({ error: 'Set not found' });
      }

      await prisma.score.create({
        data: {
          setId: parseInt(setId, 10),
          team1Score,
          team2Score,
        },
      });

      res.status(200).json({ message: 'Score updated successfully' });
    } catch (error) {
      console.error('Failed to update score:', error);
      res.status(500).json({ error: 'Failed to update score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
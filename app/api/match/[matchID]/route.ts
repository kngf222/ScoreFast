import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../libs/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { matchID } = req.query;

  if (!matchID) {
    return res.status(400).json({ error: 'matchId is required' });
  }

  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(matchID as string, 10) },
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
      return res.status(404).json({ error: 'Match not found' });
    }

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API endpoint hit');
  const { matchID } = req.query;
  console.log('req.query:', req.query);
  console.log('matchId:', matchID);

  if (!matchID) {
    console.error('No matchId provided in the request');
    return res.status(400).json({ error: 'matchId is required' });
  }

  console.log(`Fetching match data for matchId: ${matchID}`);

  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(matchID as string, 10) },
      include: { histories: true },
    });

    if (!match) {
      console.error(`No match found for matchId: ${matchID}`);
      return res.status(404).json({ error: 'Match not found' });
    }

    console.log(`Match data retrieved successfully for matchId: ${matchID}`);
    res.status(200).json(match);
  } catch (error) {
    console.error('Error fetching match data:', error);
    res.status(500).json({ error: 'Failed to fetch match' });
  }
}

"use client";

// /app/match/[matchID]/page.tsx
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Match {
  id: number;
  team1: {
    player1: string;
    player2: string;
  };
  team2: {
    player1: string;
    player2: string;
  };
  sets: {
    id: number;
    matchId: number;
    scores: {
      team1Score: number;
      team2Score: number;
    }[];
  }[];
}

const MatchPage = () => {
  const pathname = usePathname();
  const matchID = pathname.split('/').pop();
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      if (!matchID) return;

      try {
        const response = await axios.get(`/api/match/${matchID}`);
        console.log('Fetched match data:', response.data); // Add this line to inspect data
        setMatch(response.data);
      } catch (error) {
        console.error('Failed to fetch match data:', error);
      }
    };

    fetchMatch();
  }, [matchID]);

  if (!match) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 text-white p-6 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white text-gray-800 shadow-lg rounded-lg max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Match between {match.team1.player1} & {match.team1.player2} vs {match.team2.player1} & {match.team2.player2}
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Match Score</h2>
        <div className="flex justify-around mb-4">
          {match.sets.map((set, index) => {
            const latestScore = set.scores.length ? set.scores[set.scores.length - 1] : { team1Score: 0, team2Score: 0 };
            return (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-red-600">Set {index + 1}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">{latestScore.team1Score}</span>
                  <span className="text-2xl">-</span>
                  <span className="text-2xl">{latestScore.team2Score}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchPage;

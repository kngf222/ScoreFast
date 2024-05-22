import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Match {
  id: number;
  player1: string;
  player2: string;
  score1: number;
  score2: number;
  histories: History[];
}

interface History {
  id: number;
  player: string;
  newScore: number;
  timestamp: string;
}

export default function MatchPage() {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMatchData = async () => {
      if (!router.isReady) {
        console.log('Router is not ready');
        return;
      }

      const { matchId } = router.query;
      console.log('Router is ready');
      console.log('router query matchId:', matchId);

      if (matchId) {
        console.log(`Fetching match data for matchId: ${matchId}`);
        try {
          console.log('Sending request to /api/get_match');
          console.log('matchId:', matchId);
          console.log(`/api/get_match/${matchId}`);
          const response = await axios.get(`/api/get_match/${matchId}`);
          console.log('Match data received:', response.data);
          setMatch(response.data);
        } catch (error) {
          console.error('Failed to fetch match:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('matchId is undefined');
      }
    };

    fetchMatchData();
  }, [router.isReady, router.query]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!match) {
    return <div className="text-center mt-10">Match not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white text-gray-800 shadow-lg rounded-lg max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-600">Match between {match.player1} and {match.player2}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">Score</h2>
        <div className="flex justify-around mb-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{match.player1}</h3>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">{match.score1}</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{match.player2}</h3>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">{match.score2}</span>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">Match History</h2>
        <ul className="list-disc list-inside bg-base-100 p-4 rounded shadow-md">
          {match.histories.map(history => (
            <li key={history.id} className="mb-2">
              <span className="text-blue-600">{history.player}</span> scored <span className="text-green-600">{history.newScore}</span> at {new Date(history.timestamp).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

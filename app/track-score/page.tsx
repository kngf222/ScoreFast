"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ButtonSignin from '@/components/ButtonSignin';

const TrackScore = () => {
  const { data: session, status } = useSession();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player3, setPlayer3] = useState('');
  const [player4, setPlayer4] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [matchId, setMatchId] = useState<number | null>(null);
  const [matchUrl, setMatchUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
  }, [status, session]);

  const startMatch = async () => {
    if (!session || !session.user?.id) {
      console.error('User not authenticated');
      return;
    }
    const userId = session.user.id;
    try {
      const response = await axios.post('/api/match/start_match', { player1, player2, player3, player4, userId });
      setMatchId(response.data.matchId);
      setScore1(0);
      setScore2(0);
      setMatchUrl(`${window.location.origin}/match/${response.data.matchId}`);
    } catch (error) {
      console.error('Failed to start match:', error);
    }
  };

  const updateScore = async (team: string, newScore: number) => {
    if (!matchId) {
      console.error('No matchId available');
      return;
    }
    try {
      const setId = 1; // You need to determine the current set ID dynamically
      if (team === 'team1') {
        await axios.post('/api/match/update_score', { matchId, setId, team1Score: newScore, team2Score: score2 });
        setScore1(newScore);
      } else {
        await axios.post('/api/match/update_score', { matchId, setId, team1Score: score1, team2Score: newScore });
        setScore2(newScore);
      }
    } catch (error) {
      console.error('Failed to update score:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 text-white p-6 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4">You need to log in to continue</h2>
            <ButtonSignin text="Log In" extraStyle="btn-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 text-white p-6 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white text-gray-800 shadow-lg rounded-lg max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Live Score Tracker</h1>
        <div className="mb-6 flex flex-col items-center">
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="input input-bordered input-primary mb-2"
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="input input-bordered input-secondary mb-2"
          />
          <input
            type="text"
            placeholder="Player 3 Name"
            value={player3}
            onChange={(e) => setPlayer3(e.target.value)}
            className="input input-bordered input-primary mb-2"
          />
          <input
            type="text"
            placeholder="Player 4 Name"
            value={player4}
            onChange={(e) => setPlayer4(e.target.value)}
            className="input input-bordered input-secondary mb-4"
          />
          <button onClick={startMatch} className="btn btn-primary">Start Match</button>
        </div>
        {matchUrl && (
          <div className="mb-4 text-center">
            <p className="text-lg">Match URL: <Link href={matchUrl}><a className="link link-primary">{matchUrl}</a></Link></p>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Match Score</h2>
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-red-600">{player1} & {player2}</h3>
              <div className="flex items-center justify-center space-x-2">
                <button onClick={() => updateScore('team1', score1 + 1)} className="btn btn-success">+</button>
                <span className="text-2xl">{score1}</span>
                <button onClick={() => updateScore('team1', score1 - 1)} className="btn btn-error">-</button>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-red-600">{player3} & {player4}</h3>
              <div className="flex items-center justify-center space-x-2">
                <button onClick={() => updateScore('team2', score2 + 1)} className="btn btn-success">+</button>
                <span className="text-2xl">{score2}</span>
                <button onClick={() => updateScore('team2', score2 - 1)} className="btn btn-error">-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackScore;

// components/LoginPrompt.tsx
import { signIn } from 'next-auth/react';

const LoginPrompt = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">You need to log in to continue</h2>
        <button onClick={() => signIn()} className="btn btn-primary">
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;

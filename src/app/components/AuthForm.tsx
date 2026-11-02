import React, { useState } from 'react';
import { signIn, signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn('credentials', { email, password, redirect: false });
        toast.success('Logged in successfully');
        router.push('/');
      } else {
        await signUp('credentials', { email, password, redirect: false });
        toast.success('Account created, you can now log in');
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">
        {mode === 'login' ? 'Login to Your Account' : 'Create a New Account'}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border px-3 py-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

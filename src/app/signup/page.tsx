'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Page() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [button, setButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [username, email, password]);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/users/signup', { username, email, password });
      toast.success('Successfully created!');
     
      if (res) {
        router.push('/login');
      }
    } catch (error: any) {
      toast.error('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <Toaster position="top-right" reverseOrder={false} />
      <form className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg" onSubmit={onSignup}>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {loading ? 'Processing...' : 'Sign Up'}
        </h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={button}
        >
          {loading ? 'Processing...' : 'Register'}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link href="/login">
            <button>Login</button>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Page;

'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">📻</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-900">Public Radio Agents</h1>
          <p className="text-gray-600">AI-Powered Station Management</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <SignUpForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          By using Public Radio Agents, you agree to our{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
        </p>
        <p className="mt-2">
          Built with the BMAd-Method™ framework for public radio excellence
        </p>
      </div>
    </div>
  );
}
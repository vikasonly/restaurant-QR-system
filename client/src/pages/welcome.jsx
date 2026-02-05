import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, LogIn, UserPlus, User } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGuest = () => {
    localStorage.setItem('guestMode', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-sky-500/10 border border-sky-500 flex items-center justify-center">
            <ChefHat className="w-10 h-10 text-sky-400" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-bold text-white tracking-wide">
          TasteBox
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Quick Bites. Big Taste.
        </p>

        <p className="text-slate-300 text-sm mt-4 max-w-md mx-auto">
          Discover delicious food, manage your orders, and enjoy a seamless
          restaurant experience crafted just for you.
        </p>

        {/* Actions */}
        <div className="mt-8 space-y-4">

          <Link
            to="/login"
            className="w-full py-3 bg-sky-500 text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-sky-400 transition"
          >
            <LogIn className="w-5 h-5" />
            Login
          </Link>

          <Link
            to="/register"
            className="w-full py-3 bg-transparent border border-sky-500 text-sky-400 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-sky-500/10 transition"
          >
            <UserPlus className="w-5 h-5" />
            Create Account
          </Link>

          <button
            onClick={handleGuest}
            className="w-full py-3 bg-slate-800 text-slate-300 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-700 hover:text-white transition"
          >
            <User className="w-5 h-5" />
            Continue as Guest
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-500 mt-8">
          © 2025 TasteBox · Crafted with ❤️ for food lovers
        </p>
      </div>
    </div>
  );
};

export default Welcome;

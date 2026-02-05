import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  ChefHat
} from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .unwrap()
      .then(() => navigate('/'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-sm bg-slate-900/80 backdrop-blur rounded-2xl shadow-xl p-6 border border-slate-700">

        {/* Logo & Brand */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500 flex items-center justify-center">
            <ChefHat className="w-7 h-7 text-sky-400" />
          </div>
          <h1 className="text-lg font-semibold text-white mt-2">
            TasteBox
          </h1>
          <p className="text-xs text-slate-400 text-center">
            Quick Bites. Big Taste.
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-white text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-400 text-center mb-5">
          Login to manage your restaurant
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-xs text-slate-400">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@tastebox.com"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-xs text-sky-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-sky-500 text-black font-semibold rounded-lg hover:bg-sky-400 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <p className="text-xs text-slate-400 text-center mt-4">
          New here?
          <Link to="/register" className="ml-1 text-sky-400 font-medium">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

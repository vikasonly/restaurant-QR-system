import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authSlice';
import { ChefHat } from 'lucide-react';

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center px-3 py-2">

      {/* Brand Header */}
      <div className="flex flex-col items-center mb-3">
        <div className="w-12 h-12 border-2 border-sky-500 rounded-full flex items-center justify-center">
          <ChefHat className="w-6 h-6 text-sky-500" />
        </div>
        <h1 className="text-lg font-semibold text-white mt-2">
          TasteBox
        </h1>
        <p className="text-xs text-slate-400 text-center">
          Quick Bites. Big Taste.
        </p>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-xs bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-4">

        <h2 className="text-lg font-semibold text-white mb-1">
          Create Account
        </h2>
        <p className="text-xs text-slate-400 mb-3">
          Sign up in less than a minute
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">

          {/* Full Name */}
          <div>
            <label className="text-xs text-slate-400">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 py-2 rounded-xl border border-slate-600 bg-slate-900 text-white text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-slate-400">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 py-2 rounded-xl border border-slate-600 bg-slate-900 text-white text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-slate-400">Mobile Number</label>
            <div className="relative mt-1">
              <Phone className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 py-2 rounded-xl border border-slate-600 bg-slate-900 text-white text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="9876543210"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-slate-400">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 py-2 rounded-xl border border-slate-600 bg-slate-900 text-white text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="Min 6 characters"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-slate-400">Confirm Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-9 py-2 rounded-xl border border-slate-600 bg-slate-900 text-white text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-xl font-semibold transition text-sm"
          >
            Create Account
          </button>
        </form>

        <p className="text-xs text-center text-slate-400 mt-3">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-400 font-medium inline-flex items-center gap-1">
            Login <ArrowRight className="w-3 h-3" />
          </Link>
        </p>
      </div>

      {/* Footer Benefits */}
      <div className="mt-3 text-xs text-slate-400 flex flex-col sm:flex-row justify-center items-center gap-2">
        <span>✔ Fast checkout</span>
        <span>✔ Exclusive offers</span>
        <span>✔ Reward points</span>
      </div>

    </div>
  );
};

export default Register;

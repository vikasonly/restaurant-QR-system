import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  
  const { loading, error } = useSelector((state) => state.auth);
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData))
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0f] px-4">
      <div className="w-full max-w-md bg-[#151516] border border-gray-800 rounded-2xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
            alt="restaurant-logo"
            className="w-16 h-16"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-1">
            Login to manage your restaurant dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 bg-red-600/20 border border-red-500/40 text-red-300 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <div className="flex items-center bg-[#1a1a1b] border border-gray-700 rounded-lg px-3">
              <Mail className="text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent p-2 text-gray-100 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <div className="flex items-center bg-[#1a1a1b] border border-gray-700 rounded-lg px-3">
              <Lock className="text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent p-2 text-gray-100 focus:outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-medium hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

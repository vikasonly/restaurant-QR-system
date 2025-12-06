import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Phone, User, UserPlus, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">

      {/* Static background gradient (NO animation) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-orange-500/10 to-yellow-500/20"></div>

      {/* Static color glows */}
      <div className="absolute w-64 h-64 bg-red-500/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-64 h-64 bg-yellow-500/20 blur-[130px] rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-[0_0_40px_rgba(255,100,50,0.4)]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png
"
            alt="Restaurant Logo"
            className="w-20 drop-shadow-[0_0_8px_rgba(255,150,50,0.7)]"
          />
          <h1 className="text-3xl mt-3 font-extrabold text-orange-400 drop-shadow-[0_0_10px_rgba(255,150,50,0.6)]">
            Restaurant Hub
          </h1>
          <p className="text-gray-300 text-sm mt-1">A Taste That Brings You Back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
            <input
              type="text"
              name="name"
              className="w-full bg-transparent border border-white/15 rounded-xl pl-12 pr-3 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-400 transition"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
            <input
              type="email"
              name="email"
              className="w-full bg-transparent border border-white/15 rounded-xl pl-12 pr-3 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-400 transition"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
            <input
              type="tel"
              name="phone"
              maxLength="15"
              className="w-full bg-transparent border border-white/15 rounded-xl pl-12 pr-3 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-400 transition"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
            <input
              type="password"
              name="password"
              className="w-full bg-transparent border border-white/15 rounded-xl pl-12 pr-3 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-400 transition"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
            <input
              type="password"
              className="w-full bg-transparent border border-white/15 rounded-xl pl-12 pr-3 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-400 transition"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange }
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-[4px]" />
            <p className="text-xs text-gray-400">
              I agree to the{" "}
              <span className="text-orange-300">Terms</span> &{" "}
              <span className="text-orange-300">Privacy Policy</span>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white py-3 rounded-xl 
            font-semibold text-sm flex items-center justify-center gap-2 
            hover:shadow-[0_0_20px_rgba(255,80,50,0.6)] transition active:scale-95"
          >
            <UserPlus className="w-5 h-5" />
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-300 hover:underline inline-flex items-center gap-1"
          >
            Sign in <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

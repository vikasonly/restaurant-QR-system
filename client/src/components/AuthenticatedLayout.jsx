import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { setSearchQuery } from '../redux/menuSlice';
import {
  ChefHat,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  Search,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Footer from './Footer';

const AuthenticatedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { name, email } = useSelector((state) => state.auth);
  const searchQuery = useSelector((state) => state.menu.searchQuery);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  // ✅ Mentor-like behavior (menu always visible)
  const isAdmin = true;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    dispatch(setSearchQuery(value));
  };
const totalQty = useSelector((state) => state.cart.totalQty);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020b1c] to-[#020617] flex flex-col">

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* BRAND */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-sky-500/40 bg-sky-500/10 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">TasteBox</p>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase">
                Vegetarian Kitchen
              </p>
            </div>
          </Link>

          {/* SEARCH */}
          <div className="hidden md:block w-[320px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={localSearchQuery}
                onChange={handleSearchChange}
                placeholder="Search dishes..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg
                bg-slate-900/70 border border-slate-700
                text-slate-100 placeholder-slate-400
                focus:ring-2 focus:ring-sky-500/30"
              />
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/menu" className="text-slate-300 hover:text-sky-400">Menu</Link>
            <Link to="/orders" className="text-slate-300 hover:text-sky-400">Orders</Link>
            <Link to="/tables" className="text-slate-300 hover:text-sky-400">Tables</Link>
            <Link to="/dashboard" className="text-slate-300 hover:text-sky-400">Dashboard</Link>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-8">
          <button onClick={() => navigate('/cart')} className="relative">
  <ShoppingCart className="w-5 h-5 text-slate-300 hover:text-white" />

  {totalQty > 0 && (
    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1
    text-[10px] font-semibold
    bg-sky-400 text-black rounded-full
    flex items-center justify-center leading-none">
      {totalQty}
    </span>
  )}
</button>

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg
              bg-slate-900/70 border border-slate-700"
            >
              <User className="w-4 h-4 text-slate-300" />
              <ChevronDown className={`w-4 h-4 text-slate-400 transition ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-4 top-16 w-56 bg-slate-950 border border-slate-800 rounded-xl shadow-xl">
                <div className="p-4 border-b border-slate-800">
                  <p className="text-sm text-white font-semibold">{name || 'User'}</p>
                  <p className="text-xs text-slate-400">{email || '—'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;

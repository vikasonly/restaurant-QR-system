import React from 'react';
import { ArrowRight, Clock, Award, UtensilsCrossed, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#020b1c] to-[#020617] border-b border-slate-800">
      
      {/* Subtle blue glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] -left-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center lg:text-left">

            {/* LOGO + NAME */}
            <div className="flex flex-col items-center mb-3 lg:items-start">
              <div className="w-12 h-12 border-2 border-sky-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-sky-500" />
              </div>
              <h1 className="text-lg font-semibold text-slate-100 mt-2 tracking-wide">
                TasteBox
              </h1>
            </div>

            {/* HEADING */}
            <h2 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl leading-tight">
              Crafted vegetarian meals
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                served with care
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="max-w-xl text-base text-slate-300 sm:text-lg mx-auto lg:mx-0">
              TasteBox brings you thoughtfully prepared vegetarian dishes using
              fresh ingredients, balanced flavors, and a modern dining experience.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap justify-center gap-6 pt-2 lg:justify-start">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="h-5 w-5 text-sky-400" />
                Fast Service
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="h-5 w-5 text-sky-400" />
                Quality Assured
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <UtensilsCrossed className="h-5 w-5 text-sky-400" />
                100% Vegetarian
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={() => {
                  const menuSection = document.getElementById('menu-section');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-8 py-3 text-sm font-semibold text-black transition hover:bg-sky-600"
              >
                Explore Menu
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => navigate('/reserve')}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-transparent px-8 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900"
              >
                Reserve Table
              </button>
            </div>
          </div>

          {/* RIGHT FEATURE CARD */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 backdrop-blur shadow-xl">

              <span className="inline-block mb-3 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
                Today’s Special
              </span>

              <div className="mb-4 h-48 rounded-xl bg-gradient-to-br from-sky-400/20 to-cyan-400/20 flex items-center justify-center">
                <UtensilsCrossed className="h-16 w-16 text-sky-300/60" />
              </div>

              <h3 className="text-lg font-semibold text-slate-100">
                Signature Veg Platter
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                A balanced combination of our most loved vegetarian dishes.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-sky-400">
                  ₹249
                </span>
                <button className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-black hover:bg-sky-600 transition">
                  Order Now
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

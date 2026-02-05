import React from "react";
import {
  ChefHat,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-[#0b1220] to-[#050914] text-gray-300">

      {/* Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

      {/* Offers */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "WELCOME DEAL", desc: "Flat 20% OFF", sub: "Use: WELCOME20" },
          { title: "FAST DELIVERY", desc: "Above ₹499", sub: "No extra charges" },
          { title: "REWARD POINTS", desc: "On every order", sub: "Redeem later" },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/5 backdrop-blur-md p-6 text-center hover:bg-white/10 transition"
          >
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="text-sm mt-2">{item.desc}</p>
            <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <ChefHat className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">TasteTrail</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Smart Food Ordering
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-400">
            TasteTrail connects food lovers with curated restaurants, seamless
            ordering, and lightning-fast delivery — all in one platform.
          </p>

          <div className="flex gap-4 mt-5">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            {["About", "Menu", "Orders", "Offers", "Careers", "Support"].map(
              (link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition">
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-white font-semibold mb-4">Top Cities</h4>
          <div className="space-y-4 text-sm">
            {["Mumbai", "Delhi", "Bangalore"].map((city, i) => (
              <div key={i} className="flex gap-2">
                <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <Phone className="w-4 h-4 mt-1 text-gray-400" />
              <span>+91 90000 12345</span>
            </div>
            <div className="flex gap-3">
              <Mail className="w-4 h-4 mt-1 text-gray-400" />
              <span>support@tastetrail.app</span>
            </div>
            <div className="flex gap-3">
              <Clock className="w-4 h-4 mt-1 text-gray-400" />
              <span>10 AM – 12 Midnight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-400">
        © 2024 TasteTrail • Crafted for modern food experiences
      </div>
    </footer>
  );
};

export default Footer;

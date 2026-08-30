import React from 'react';
import { Store, HelpCircle, Gift, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <footer className="bg-[#172337] text-white text-xs mt-12 border-t border-gray-800">
      {/* Top Links Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 border-b border-gray-700/80">
        {/* About */}
        <div className="space-y-2.5">
          <h4 className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">ABOUT</h4>
          <ul className="space-y-1.5 text-gray-300 text-[11px]">
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Flipkart Stories</li>
            <li className="hover:underline cursor-pointer">Press</li>
            <li className="hover:underline cursor-pointer">Corporate Information</li>
          </ul>
        </div>

        {/* Group Companies */}
        <div className="space-y-2.5">
          <h4 className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">GROUP COMPANIES</h4>
          <ul className="space-y-1.5 text-gray-300 text-[11px]">
            <li className="hover:underline cursor-pointer">Myntra</li>
            <li className="hover:underline cursor-pointer">Cleartrip</li>
            <li className="hover:underline cursor-pointer">Shopsy</li>
          </ul>
        </div>

        {/* Help */}
        <div className="space-y-2.5">
          <h4 className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">HELP</h4>
          <ul className="space-y-1.5 text-gray-300 text-[11px]">
            <li className="hover:underline cursor-pointer">Payments</li>
            <li className="hover:underline cursor-pointer">Shipping</li>
            <li className="hover:underline cursor-pointer">Cancellation & Returns</li>
            <li className="hover:underline cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div className="space-y-2.5">
          <h4 className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">CONSUMER POLICY</h4>
          <ul className="space-y-1.5 text-gray-300 text-[11px]">
            <li className="hover:underline cursor-pointer">Cancellation & Returns</li>
            <li className="hover:underline cursor-pointer">Terms Of Use</li>
            <li className="hover:underline cursor-pointer">Security</li>
            <li className="hover:underline cursor-pointer">Privacy</li>
            <li className="hover:underline cursor-pointer">Sitemap</li>
            <li className="hover:underline cursor-pointer">EPR Compliance</li>
          </ul>
        </div>

        {/* Mail Us */}
        <div className="space-y-2.5 border-t sm:border-t-0 sm:border-l border-gray-700 sm:pl-6 text-[11px] text-gray-300">
          <h4 className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Mail Us:</h4>
          <p className="leading-relaxed">
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp;<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
        </div>

        {/* Registered Office */}
        <div className="space-y-2.5 border-t sm:border-t-0 sm:border-l border-gray-700 sm:pl-6 text-[11px] text-gray-300">
          <h4 className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Registered Office:</h4>
          <p className="leading-relaxed">
            Flipkart Internet Private Limited,<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: 044-45614700 / 044-67415800
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-gray-400">
        <div className="flex items-center gap-6 flex-wrap">
          <button
            onClick={() => setActiveTab('admin')}
            className="flex items-center gap-1.5 text-amber-400 hover:underline font-bold"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>Become a Seller</span>
          </button>
          <span className="flex items-center gap-1.5 text-gray-300 hover:text-white cursor-pointer">
            <Sparkles className="w-4 h-4 text-amber-400" /> Advertise
          </span>
          <span className="flex items-center gap-1.5 text-gray-300 hover:text-white cursor-pointer">
            <Gift className="w-4 h-4 text-amber-400" /> Gift Cards
          </span>
          <span className="flex items-center gap-1.5 text-gray-300 hover:text-white cursor-pointer">
            <HelpCircle className="w-4 h-4 text-amber-400" /> Help Center
          </span>
        </div>

        <div>
          <span>© 2007-2026 Flipkart.com — All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

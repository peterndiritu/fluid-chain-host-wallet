
import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const WalletPreview: React.FC = () => {
  const router = useRouter();

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Your Fluid Wallet
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Manage your <strong>$FLUID</strong> tokens, NFTs, and hosting assets effortlessly.
              Fully non-custodial, multichain compatible, with live updates.
            </p>

            <button
              onClick={() => router.push("/wallet")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Open Full Wallet
              <ArrowRight size={18} />
            </button>
          </div>

          {/* RIGHT: Wallet Image */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 blur-2xl rounded-3xl"></div>
            <img
              src="/fluid-wallet.png"
              alt="Fluid Wallet Preview"
              className="relative z-10 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WalletPreview;

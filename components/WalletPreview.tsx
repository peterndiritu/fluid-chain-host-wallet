import React, { useEffect, useState, useRef } from 'react';

type TxType = 'sent' | 'received' | 'staked';

interface Tx {
  text: string;
  type: TxType;
}

const WalletPreview: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [displayedTx, setDisplayedTx] = useState<Tx[]>([]);
  const [connected, setConnected] = useState(false);
  const txIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mockTx: Tx[] = [
    { text: "Sent 0.5 $FLUID", type: "sent" },
    { text: "Received 1.2 $FLUID", type: "received" },
    { text: "Bought NFT", type: "staked" },
    { text: "Staked 100 $FLUID", type: "staked" },
    { text: "Earned 5 $FLUID Rewards", type: "received" },
  ];

  // Animate balance increment
  useEffect(() => {
    let current = 0;
    const target = 12345;
    const step = 123;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setBalance(current);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Simulate wallet connection after 2s
  useEffect(() => {
    const timer = setTimeout(() => setConnected(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect for transactions
  useEffect(() => {
    const interval = setInterval(() => {
      if (txIndexRef.current >= mockTx.length) {
        txIndexRef.current = 0;
        setDisplayedTx([]);
      } else {
        const nextTx = mockTx[txIndexRef.current];
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= nextTx.text.length) {
            const partial = nextTx.text.slice(0, charIndex + 1);
            setDisplayedTx(prev => [...prev.slice(0, prev.length), { text: partial, type: nextTx.type }]);
            charIndex++;
          } else {
            clearInterval(typeInterval);
          }
        }, 50);
        txIndexRef.current++;
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedTx]);

  const getTxColor = (type: TxType) => {
    switch (type) {
      case "sent": return "bg-red-500";
      case "received": return "bg-emerald-400";
      case "staked": return "bg-blue-400";
      default: return "bg-slate-400";
    }
  };

  return (
    <section id="wallet-preview" className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

        {/* Wallet Image / Mockup */}
        <div className="flex-1 flex justify-center lg:justify-start relative">
          <img
            src="/fluid-wallet.png"
            alt="Fluid Wallet Preview"
            className="rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform"
          />

          {/* Overlay Mockup */}
          <div className="absolute top-6 left-6 w-72 h-96 bg-slate-800/90 dark:bg-slate-900/80 rounded-2xl p-6 text-white shadow-lg backdrop-blur-md flex flex-col justify-between">
            
            {/* Header with Connection Status */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">FLUID Wallet</span>
              <span className="flex items-center gap-2 text-xs">
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    connected ? 'bg-emerald-400' : 'bg-red-500'
                  }`}
                ></span>
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* Balance */}
            <div className="mb-4">
              <p className="text-sm text-slate-400">Balance</p>
              <p className="text-3xl font-bold flex items-center gap-2">
                {balance.toLocaleString()} <span className="text-emerald-400">$FLUID</span>
              </p>
            </div>

            {/* Recent Transactions with Autoscroll */}
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto mb-4 space-y-2 bg-slate-700/20 rounded-lg p-2"
            >
              {displayedTx.map((tx, i) => (
                <div
                  key={i}
                  className="text-sm flex justify-between items-center px-2 py-1 hover:bg-slate-700/40 transition-colors"
                >
                  <span className={`w-3 h-3 rounded-full animate-ping ${getTxColor(tx.type)} inline-block mr-2`}></span>
                  <span>{tx.text}</span>
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
              ))}
            </div>

            {/* Connect Button */}
            <button
              onClick={() => setConnected(prev => !prev)}
              className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Your Fluid Wallet
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Manage your $FLUID tokens, NFTs, and hosting assets effortlessly. Fully non-custodial, multichain compatible, with live updates.
          </p>
          <button
            onClick={() => window.location.href = '/wallet'}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-1"
          >
            Open Full Wallet
          </button>
        </div>

      </div>
    </section>
  );
};

export default WalletPreview;

import React from 'react';
import { Play, Apple, Box } from 'lucide-react';

const WalletPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
         <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6 animate-fade-in-up">
            <span className="text-emerald-500 font-bold uppercase tracking-wider text-sm">Beta Access Now Live</span>
         </div>
         <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
            One Wallet. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Infinite Possibilities.</span>
         </h1>
         <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            The only non-custodial wallet you'll ever need. Swap, stake, and spend crypto with zero fees on Fluid Chain.
         </p>
         
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="flex items-center gap-3 bg-slate-900 text-white border border-slate-700 rounded-xl px-5 py-3 hover:bg-slate-800 transition-colors">
                <Play size={24} className="fill-white" />
                <div className="text-left">
                   <div className="text-[10px] uppercase font-bold text-slate-400">Get it on</div>
                   <div className="text-lg font-bold leading-none">Google Play</div>
                </div>
             </button>
             <button className="flex items-center gap-3 bg-slate-900 text-white border border-slate-700 rounded-xl px-5 py-3 hover:bg-slate-800 transition-colors">
                <Apple size={24} className="fill-white" />
                <div className="text-left">
                   <div className="text-[10px] uppercase font-bold text-slate-400">Download on the</div>
                   <div className="text-lg font-bold leading-none">App Store</div>
                </div>
             </button>
             <button className="flex items-center gap-3 bg-slate-900 text-white border border-slate-700 rounded-xl px-5 py-3 hover:bg-slate-800 transition-colors">
                <Box size={24} />
                <div className="text-left">
                   <div className="text-[10px] uppercase font-bold text-slate-400">Direct Download</div>
                   <div className="text-lg font-bold leading-none">.APK File</div>
                </div>
             </button>
         </div>
      </section>

      {/* Interface Mockup */}
      <section className="max-w-md mx-auto px-4 mb-12 relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-800/50 flex items-center justify-center gap-2">
                 <div className="w-20 h-4 bg-black rounded-full"></div>
              </div>
              <div className="p-6 pt-12">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <div className="text-xs text-slate-400 font-bold uppercase">Total Balance</div>
                       <div className="text-3xl font-bold text-white">$12,458.00</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                       <span className="text-emerald-500 font-bold">F</span>
                    </div>
                 </div>
                 
                 <div className="flex gap-4 mb-8">
                    {['Send', 'Receive', 'Buy', 'Swap'].map(action => (
                       <button key={action} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center">
                             <div className="w-6 h-6 bg-current rounded-sm opacity-50"></div>
                          </div>
                          <span className="text-xs text-slate-400 font-bold">{action}</span>
                       </button>
                    ))}
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { name: 'Bitcoin', symbol: 'BTC', amount: '0.45', value: '$29,000', color: 'bg-orange-500' },
                      { name: 'Ethereum', symbol: 'ETH', amount: '4.20', value: '$8,100', color: 'bg-indigo-500' },
                      { name: 'Fluid', symbol: 'FLD', amount: '15,000', value: '$15,000', color: 'bg-emerald-500' }
                    ].map(coin => (
                       <div key={coin.symbol} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-full ${coin.color} flex items-center justify-center text-white font-bold`}>{coin.symbol[0]}</div>
                             <div>
                                <div className="text-white font-bold">{coin.name}</div>
                                <div className="text-xs text-slate-400">{coin.amount} {coin.symbol}</div>
                             </div>
                          </div>
                          <div className="text-white font-bold">{coin.value}</div>
                       </div>
                    ))}
                 </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default WalletPage;
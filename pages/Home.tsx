import React from 'react';
import GeminiImageEditor from '../components/GeminiImageEditor';
import FluidAssistant from '../components/FluidAssistant';
import HowItWorks from '../components/HowItWorks';
import { Shield, Zap, Layers, Code2, Globe, Smartphone, Wallet, ArrowRight, Play, Gitlab, Flame, Box, Blocks, ShieldCheck, Coins, Triangle, Cloud } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const shareUrl = "https://fluid.finance";
  const shareText = "Check out Fluid - Crypto, Fiat, One Fluid App. Presale live now!";

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'discord':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert("Link copied! Paste it in Discord to share.");
        return;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  const partners = [
    { name: 'Google Play', icon: Play },
    { name: 'GitLab', icon: Gitlab },
    { name: 'Firebase', icon: Flame },
    { name: 'WalletConnect', icon: Wallet },
    { name: 'Android', icon: Smartphone },
    { name: 'INFURA', icon: Box },
    { name: 'NEXT.js', icon: Blocks },
    { name: 'CertiK', icon: ShieldCheck },
    { name: 'Ether', icon: Coins },
    { name: 'Vercel', icon: Triangle },
    { name: 'AWS', icon: Cloud },
  ];

  return (
    <>
        {/* Hero Section - Compact Layout */}
        <section id="presale" className="relative pt-32 pb-6 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              
                  <button 
                    onClick={() => onNavigate('buy')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-700/50 mb-6 animate-fade-in-up backdrop-blur-sm hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  >
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 text-xs font-bold tracking-wide uppercase group-hover:text-emerald-300">Presale Stage 1 Live</span>
                    <ArrowRight size={14} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-4 text-slate-900 dark:text-white tracking-tight">
                    Fluid <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400">Store. Spend. Host Infinitely.</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                    The first Layer-1 blockchain delivering <strong>2M+ TPS</strong> with zero-downtime hosting. Secure, Multichain Non-Custodial Crypto Wallet.
                  </p>

                  <div className="mb-12">
                     <button 
                        onClick={() => onNavigate('buy')}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-1"
                      >
                        Buy FLUID
                      </button>
                  </div>
                  
                  {/* Partners / Audited By Marquee */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/50 w-full overflow-hidden">
                    <p className="text-xs text-center text-slate-500 uppercase font-bold tracking-widest mb-3">Partners & Technologies</p>
                    
                    <div className="relative flex overflow-x-hidden group max-w-[100vw]">
                        <div className="animate-marquee-reverse flex items-center gap-12 whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100 pr-12">
                            {/* Set 1 */}
                            {partners.map((p, i) => (
                                <div key={`p1-${i}`} className="flex items-center gap-3">
                                    <p.icon size={24} className="text-slate-800 dark:text-white" />
                                    <span className="font-bold text-xl text-slate-800 dark:text-white">{p.name}</span>
                                </div>
                            ))}
                            {/* Set 2 */}
                            {partners.map((p, i) => (
                                <div key={`p2-${i}`} className="flex items-center gap-3">
                                    <p.icon size={24} className="text-slate-800 dark:text-white" />
                                    <span className="font-bold text-xl text-slate-800 dark:text-white">{p.name}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Gradient Masks for fade effect */}
                        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                    </div>
                  </div>

            </div>
          </div>
        </section>

        {/* Performance Metrics Section - Tightened */}
        <section className="py-4 bg-transparent border-y border-slate-200 dark:border-slate-800/50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {/* Card 1 */}
                 <div className="scroll-card bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-400 transition-colors shadow-sm group">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-3 text-cyan-500 group-hover:scale-110 transition-transform">
                        <Zap size={20}/>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-bold">Peak TPS</p>
                    <div className="flex items-end justify-between">
                       <span className="text-2xl font-bold text-slate-900 dark:text-white">2,000,000+</span>
                       <span className="text-xs text-emerald-500 font-bold mb-1.5">+∞%</span>
                    </div>
                 </div>
                 {/* Card 2 */}
                 <div className="scroll-card bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-400 transition-colors shadow-sm group">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 text-blue-500 group-hover:scale-110 transition-transform">
                        <Layers size={20}/>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-bold">Scalability</p>
                    <div className="flex items-end justify-between">
                       <span className="text-2xl font-bold text-slate-900 dark:text-white">Sharded</span>
                       <span className="text-xs text-emerald-500 font-bold mb-1.5">Linear</span>
                    </div>
                 </div>
                 {/* Card 3 */}
                 <div className="scroll-card bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-400 transition-colors shadow-sm group">
                     <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 text-purple-500 group-hover:scale-110 transition-transform">
                        <Code2 size={20}/>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-bold">Finality</p>
                    <div className="flex items-end justify-between">
                       <span className="text-2xl font-bold text-slate-900 dark:text-white">~1 Second</span>
                       <span className="text-xs text-emerald-500 font-bold mb-1.5">Instant</span>
                    </div>
                 </div>
                 {/* Card 4 */}
                 <div className="scroll-card bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-400 transition-colors shadow-sm group">
                     <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3 text-orange-500 group-hover:scale-110 transition-transform">
                        <Smartphone size={20}/>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-bold">Mobile</p>
                    <div className="flex items-end justify-between">
                       <span className="text-2xl font-bold text-slate-900 dark:text-white">Native</span>
                       <span className="text-xs text-emerald-500 font-bold mb-1.5">Optimized</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Features Section - Revolutionary */}
        <section id="features" className="py-8 bg-transparent relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white text-cyan-400">Revolutionary Features</h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium text-lg">
                Fluid Chain redefines what's possible in blockchain technology with groundbreaking innovations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="scroll-card bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/50 hover:border-cyan-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center text-cyan-400">
                      <Zap size={20} />
                   </div>
                   <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">1B+ TPS</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Ultra-Fast Processing</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  Revolutionary architecture enabling 1+ billion transactions per second with sub-millisecond finality.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="scroll-card bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/50 hover:border-cyan-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center text-cyan-400">
                      <Shield size={20} />
                   </div>
                   <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">Quantum-Safe</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Military-Grade Security</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  Advanced cryptographic protocols and quantum-resistant algorithms ensure maximum security for hosting and assets.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="scroll-card bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/50 hover:border-cyan-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center text-cyan-400">
                      <Code2 size={20} />
                   </div>
                   <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">100% Compatible</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Full EVM Compatibility</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  Seamlessly deploy existing Ethereum smart contracts without any modifications. Essential for DeFi interoperability.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="scroll-card bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/50 hover:border-cyan-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center text-cyan-400">
                      <Layers size={20} />
                   </div>
                   <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">Auto-Scale</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Infinite Scalability</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  Dynamic sharding and parallel processing scale automatically with network demand, perfect for Parmaweb hosting.
                </p>
              </div>

               {/* Feature 5 */}
              <div className="scroll-card bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/50 hover:border-cyan-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center text-cyan-400">
                      <Wallet size={20} />
                   </div>
                   <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">All Wallets</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Universal Wallet Support</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  Works with MetaMask, WalletConnect, and all major EVM-compatible wallets.
                </p>
              </div>

               {/* Feature 6 */}
              <div className="scroll-card bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/20 dark:border-slate-800/50 hover:border-cyan-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center text-cyan-400">
                      <Globe size={20} />
                   </div>
                   <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">150+ Countries</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Global Infrastructure</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  Distributed node network spanning 150+ countries for optimal performance worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (Economics) */}
        <HowItWorks />

        {/* Fluid Assistant (AI + Google Search) */}
        <FluidAssistant />

        {/* AI Editor Section */}
        <GeminiImageEditor />
    </>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import GeminiImageEditor from '../components/GeminiImageEditor';
import FluidAssistant from '../components/FluidAssistant';
import HowItWorks from '../components/HowItWorks';
import { Shield, Zap, Layers, Code2, Globe, Smartphone, Wallet, ArrowRight, Play, Gitlab, Flame, Box, Blocks, ShieldCheck, Coins, Triangle, Cloud, CreditCard, ArrowLeftRight, Server, Lock, Repeat } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [isLoadingPartners, setIsLoadingPartners] = useState(true);

  useEffect(() => {
    // Simulate loading delay for partners data/rendering
    const timer = setTimeout(() => {
      setIsLoadingPartners(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const shareUrl = "https://fluid.finance";
  const shareText = "Check out Fluid - Crypto, Fiat, One Fluid App. Presale live now!";

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

  const features = [
    {
      title: "Store & Manage",
      desc: "Secure non-custodial storage for all your digital assets across multiple chains.",
      icon: Wallet,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Send & Receive",
      desc: "Instant transfers with sub-second finality and near-zero fees globally.",
      icon: Repeat,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Fluid Pay",
      desc: "Spend your crypto like fiat with virtual and physical cards accepted worldwide.",
      icon: CreditCard,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Integrated DEX",
      desc: "Swap tokens instantly within the app using our high-liquidity decentralized exchange.",
      icon: ArrowLeftRight,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Static Hosting",
      desc: "Deploy censorship-resistant Dapps and websites directly to Parmaweb.",
      icon: Server,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Ironclad Security",
      desc: "Military-grade encryption and biometric protection for your private keys.",
      icon: Lock,
      color: "text-red-500",
      bg: "bg-red-500/10"
    }
  ];

  return (
    <div className="flex flex-col gap-0">
        {/* ==========================================
            1. BLOCKCHAIN LAYER (Hero + Metrics + Tech)
           ========================================== */}
        <div className="relative bg-transparent">
            {/* Hero Section */}
            <section id="presale" className="relative pt-32 pb-12 overflow-hidden">
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
                      
                      {/* Partners Marquee */}
                      <div className="pt-8 border-t border-slate-200 dark:border-slate-800/50 w-full overflow-hidden min-h-[100px]">
                        <p className="text-xs text-center text-slate-500 uppercase font-bold tracking-widest mb-6">Partners & Technologies</p>
                        
                        {isLoadingPartners ? (
                           <div className="flex justify-center items-center gap-12 overflow-hidden opacity-30 select-none max-w-7xl mx-auto">
                              {[...Array(5)].map((_, i) => (
                                 <div key={i} className="flex items-center gap-3 animate-pulse">
                                    <div className="w-6 h-6 bg-slate-400/50 rounded-full"></div>
                                    <div className="w-20 h-4 bg-slate-400/30 rounded"></div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                          <div className="relative flex overflow-x-hidden group w-full animate-fade-in-up">
                              <div className="animate-marquee flex items-center gap-12 whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100 pr-12">
                                  {partners.map((p, i) => (
                                      <div key={`p1-${i}`} className="flex items-center gap-3">
                                          <p.icon size={24} className="text-slate-800 dark:text-white" />
                                          <span className="font-bold text-xl text-slate-800 dark:text-white">{p.name}</span>
                                      </div>
                                  ))}
                                  {/* Duplicate for infinite loop effect */}
                                  {partners.map((p, i) => (
                                      <div key={`p2-${i}`} className="flex items-center gap-3">
                                          <p.icon size={24} className="text-slate-800 dark:text-white" />
                                          <span className="font-bold text-xl text-slate-800 dark:text-white">{p.name}</span>
                                      </div>
                                  ))}
                              </div>
                              
                              <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                              <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                          </div>
                        )}
                      </div>
                </div>
              </div>
            </section>

            {/* Blockchain Metrics - Animated Outline Cards */}
            <section className="py-10 bg-transparent border-y border-slate-200/50 dark:border-slate-800/50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                     <div className="scroll-card animated-outline-card p-5 group backdrop-blur-sm">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-3 text-cyan-500 group-hover:scale-110 transition-transform">
                            <Zap size={20}/>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-bold">Peak TPS</p>
                        <div className="flex items-end justify-between">
                           <span className="text-2xl font-bold text-slate-900 dark:text-white">2,000,000+</span>
                           <span className="text-xs text-emerald-500 font-bold mb-1.5">+∞%</span>
                        </div>
                     </div>
                     <div className="scroll-card animated-outline-card p-5 group backdrop-blur-sm">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 text-blue-500 group-hover:scale-110 transition-transform">
                            <Layers size={20}/>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-bold">Scalability</p>
                        <div className="flex items-end justify-between">
                           <span className="text-2xl font-bold text-slate-900 dark:text-white">Sharded</span>
                           <span className="text-xs text-emerald-500 font-bold mb-1.5">Linear</span>
                        </div>
                     </div>
                     <div className="scroll-card animated-outline-card p-5 group backdrop-blur-sm">
                         <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 text-purple-500 group-hover:scale-110 transition-transform">
                            <Code2 size={20}/>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-bold">Finality</p>
                        <div className="flex items-end justify-between">
                           <span className="text-2xl font-bold text-slate-900 dark:text-white">~1 Second</span>
                           <span className="text-xs text-emerald-500 font-bold mb-1.5">Instant</span>
                        </div>
                     </div>
                     <div className="scroll-card animated-outline-card p-5 group backdrop-blur-sm">
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

            {/* Blockchain Tech Features */}
            <section id="features" className="py-24 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white text-cyan-400">Revolutionary Features</h2>
                  <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium text-lg">
                    Fluid Chain redefines what's possible in blockchain technology with groundbreaking innovations
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="scroll-card animated-outline-card p-8 group backdrop-blur-md">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 bg-blue-900/30 rounded-2xl flex items-center justify-center text-cyan-400">
                          <Zap size={24} />
                       </div>
                       <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">1B+ TPS</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Ultra-Fast Processing</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                      Revolutionary architecture enabling 1+ billion transactions per second with sub-millisecond finality.
                    </p>
                  </div>

                  <div className="scroll-card animated-outline-card p-8 group backdrop-blur-md">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 bg-blue-900/30 rounded-2xl flex items-center justify-center text-cyan-400">
                          <Shield size={24} />
                       </div>
                       <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">Quantum-Safe</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Military-Grade Security</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                      Advanced cryptographic protocols and quantum-resistant algorithms ensure maximum security for hosting and assets.
                    </p>
                  </div>

                  <div className="scroll-card animated-outline-card p-8 group backdrop-blur-md">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 bg-blue-900/30 rounded-2xl flex items-center justify-center text-cyan-400">
                          <Code2 size={24} />
                       </div>
                       <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">100% Compatible</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Full EVM Compatibility</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                      Seamlessly deploy existing Ethereum smart contracts without any modifications. Essential for DeFi interoperability.
                    </p>
                  </div>

                  <div className="scroll-card animated-outline-card p-8 group backdrop-blur-md">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 bg-blue-900/30 rounded-2xl flex items-center justify-center text-cyan-400">
                          <Layers size={24} />
                       </div>
                       <span className="px-3 py-1 rounded-full bg-slate-800/50 text-cyan-400 text-xs font-bold border border-slate-700/50">Auto-Scale</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Infinite Scalability</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                      Dynamic sharding and parallel processing scale automatically with network demand, perfect for Parmaweb hosting.
                    </p>
                  </div>
                </div>
              </div>
            </section>
        </div>

        {/* ==========================================
            2. WALLET LAYER
           ========================================== */}
        <section className="py-24 bg-transparent border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
           <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Complete Financial Freedom</h2>
                 <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                    Everything you need to manage your digital life in one powerful application.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {features.map((feature, idx) => (
                    <div key={idx} className="scroll-card animated-outline-card p-8 group backdrop-blur-md">
                       <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                          <feature.icon size={28} />
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                 ))}
              </div>
              
              <div className="mt-16 text-center">
                 <button 
                    onClick={() => onNavigate('wallet')}
                    className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-105 transition-transform shadow-xl flex items-center gap-2 mx-auto"
                 >
                    Explore Wallet Features <ArrowRight size={18} />
                 </button>
              </div>
           </div>
        </section>

        {/* ==========================================
            3. HOSTING & ENDOWMENT ECONOMY LAYER
           ========================================== */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-transparent">
           <HowItWorks />
        </div>

        {/* ==========================================
            4. AI TOOLS LAYER
           ========================================== */}
        <div className="flex flex-col border-t border-slate-200 dark:border-slate-800">
           <FluidAssistant />
           <GeminiImageEditor />
        </div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect, useRef } from 'react';
import { Server, Database, Cloud, Lock, Terminal, Cpu, Globe, ArrowRight } from 'lucide-react';

interface TerminalLine {
  type: 'command' | 'output';
  content: string | string[];
}

const HostPage: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const script = [
    { 
      type: 'command', 
      text: 'npm install -g fluid-cli',
      delay: 500
    },
    { 
      type: 'output', 
      content: [
        '<span class="text-slate-400">+ fluid-cli@1.0.4</span>',
        '<span class="text-slate-400">added 12 packages in 2s</span>'
      ],
      delay: 400
    },
    { 
      type: 'command', 
      text: 'fluid init',
      delay: 800
    },
    { 
      type: 'output', 
      content: [
        '<span class="text-blue-400">?</span> Project name: <span class="text-white">awesome-dapp</span>',
        '<span class="text-blue-400">?</span> Framework: <span class="text-white">React / Next.js</span>',
        '<span class="text-blue-400">?</span> Storage: <span class="text-white">Permanent (Parmaweb)</span>'
      ],
      delay: 600
    },
    { 
      type: 'command', 
      text: 'fluid deploy',
      delay: 800
    },
    { 
      type: 'output', 
      content: [
        '<span class="text-slate-300">> Building project...</span>',
        '<span class="text-slate-300">> Uploading assets to Shard 1...</span>',
        '<span class="text-slate-300">> Uploading assets to Shard 2...</span>',
        '<span class="text-slate-300">> Verifying integrity...</span>'
      ],
      delay: 600
    },
    { 
      type: 'output', 
      content: [
        '<span class="text-emerald-400 font-bold">✔ Deployment Successful!</span>',
        'Access your app at: <span class="underline text-blue-400 cursor-pointer hover:text-blue-300">https://fluid.link/awesome-dapp</span>'
      ],
      delay: 400
    }
  ];

  useEffect(() => {
    let timeoutId: any;
    
    // Safety check to prevent rapid re-renders or zombie updates
    let isMounted = true;

    const processStep = async () => {
      if (stepIndex >= script.length) {
         // Reset loop after a longer delay
         timeoutId = setTimeout(() => {
            if (isMounted) {
                setTerminalHistory([]);
                setStepIndex(0);
            }
         }, 8000);
         return;
      }

      const step = script[stepIndex];

      if (step.type === 'command') {
        if (isMounted) setIsTyping(true);
        let charIndex = 0;
        
        const typeChar = () => {
          if (!isMounted) return;
          
          if (charIndex <= (step.text as string).length) {
            setCurrentLine((step.text as string).slice(0, charIndex));
            charIndex++;
            timeoutId = setTimeout(typeChar, 50 + Math.random() * 30); // Random typing speed
          } else {
            setIsTyping(false);
            timeoutId = setTimeout(() => {
               if (isMounted) {
                   setTerminalHistory(prev => [...prev, { type: 'command', content: step.text as string }]);
                   setCurrentLine('');
                   setStepIndex(prev => prev + 1);
               }
            }, 300);
          }
        };
        typeChar();
      } else {
        timeoutId = setTimeout(() => {
           if (isMounted) {
               setTerminalHistory(prev => [...prev, { type: 'output', content: step.content as string[] }]);
               setStepIndex(prev => prev + 1);
           }
        }, step.delay);
      }
    };

    // Only run if not currently typing a command (handled by recursion in typeChar)
    if (!isTyping) {
        processStep();
    }

    return () => {
        isMounted = false;
        clearTimeout(timeoutId);
    };
  }, [stepIndex]); // Dependency on stepIndex ensures sequential execution

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalHistory, currentLine]);

  return (
    <div className="min-h-screen pt-28 pb-16">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
         <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6 animate-pulse">
            <span className="text-indigo-500 font-bold uppercase tracking-wider text-sm">Parmaweb Protocol V1</span>
         </div>
         <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
            The Permanent Web. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Unstoppable Hosting.</span>
         </h1>
         <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Deploy full-stack applications to the Fluid Blockchain. Censorship-resistant, 100% uptime, and one-time payment for eternal storage.
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
                <Terminal size={20} /> Start Deploying
             </button>
             <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                Read Documentation
             </button>
         </div>
      </section>

      {/* Terminal Visual */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
         <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
            {/* Terminal Header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
               <div className="ml-4 text-slate-400 text-xs md:text-sm">user@dev:~/my-fluid-app</div>
            </div>
            
            {/* Terminal Body */}
            <div 
                ref={scrollRef}
                className="p-6 text-slate-300 space-y-1 h-[400px] overflow-y-auto scroll-smooth"
            >
               {terminalHistory.map((item, index) => (
                   <div key={index}>
                       {item.type === 'command' ? (
                           <div className="flex flex-wrap">
                               <span className="text-green-400 mr-2 shrink-0">$</span>
                               <span>{item.content as string}</span>
                           </div>
                       ) : (
                           <div className="flex flex-col">
                               {Array.isArray(item.content) ? (
                                   item.content.map((line, i) => (
                                       <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                                   ))
                               ) : (
                                   <div dangerouslySetInnerHTML={{ __html: item.content as string }} />
                               )}
                           </div>
                       )}
                   </div>
               ))}

               {/* Current active typing line */}
               {isTyping && (
                   <div className="flex flex-wrap">
                       <span className="text-green-400 mr-2 shrink-0">$</span>
                       <span>{currentLine}</span>
                       <span className="animate-pulse bg-slate-400 w-2 h-5 inline-block ml-1 align-middle"></span>
                   </div>
               )}

               {/* Idle cursor if not typing but waiting */}
               {!isTyping && stepIndex < script.length && (
                   <div className="flex">
                        {/* Hidden placeholder to keep layout if needed, or just cursor */}
                        <span className="animate-pulse bg-slate-400 w-2 h-5 inline-block align-middle mt-1"></span>
                   </div>
               )}
               
               {/* Final prompt state */}
               {!isTyping && stepIndex >= script.length && (
                   <div className="flex">
                       <span className="text-green-400 mr-2">$</span>
                       <span className="animate-pulse bg-slate-400 w-2 h-5 inline-block align-middle mt-1"></span>
                   </div>
               )}
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-24 border-y border-slate-200 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-16 text-slate-900 dark:text-white">Why Host on Fluid?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               
               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-500 group-hover:scale-110 transition-transform">
                     <Lock size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Censorship Resistant</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Data is stored immutably across a distributed network of nodes. No central authority can take your site down.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                     <Cloud size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">100% Uptime</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Redundant sharding ensures your content is always available, even if multiple nodes go offline simultaneously.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                     <Database size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">One-Time Payment</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Pay once in $FLUID tokens to store data forever. No monthly subscription fees for storage.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                     <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Global CDN</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Built-in content delivery network serves your dApp from the node closest to the user for blazing fast speeds.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                     <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Serverless Compute</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Run serverless functions directly on-chain for dynamic applications and backend logic.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform">
                     <ArrowRight size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Instant Deployment</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     CI/CD integration allows you to deploy from GitHub automatically with every commit.
                  </p>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
};

export default HostPage;
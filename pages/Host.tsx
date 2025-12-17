import React, { useEffect, useRef, useState } from 'react';
import {
  Server,
  Database,
  Cloud,
  Lock,
  Terminal,
  Cpu,
  Globe,
  ArrowRight,
} from 'lucide-react';

const HostPage: React.FC = () => {
  /* ------------------ TERMINAL LOGIC ------------------ */
  const deploySteps = [
    "Building project...",
    "Uploading assets to Shard 1...",
    "Uploading assets to Shard 2...",
    "Verifying integrity...",
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Typing animation
  useEffect(() => {
    if (stepIndex >= deploySteps.length) return;

    const line = deploySteps[stepIndex];
    let char = 0;

    const typing = setInterval(() => {
      setTypedText((prev) => prev + line[char]);
      char++;

      if (char === line.length) {
        clearInterval(typing);
        setTimeout(() => {
          setTypedText("");
          setStepIndex((prev) => prev + 1);
        }, 700);
      }
    }, 35);

    return () => clearInterval(typing);
  }, [stepIndex]);

  // Auto-scroll terminal
  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [typedText, stepIndex]);

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen pt-28 pb-16">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 mb-24 text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6 animate-pulse">
          <span className="text-indigo-500 font-bold uppercase tracking-wider text-sm">
            Parmaweb Protocol V1
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
          The Permanent Web. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Unstoppable Hosting.
          </span>
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
          Deploy full-stack applications to the Fluid Blockchain. Censorship-resistant,
          100% uptime, and one-time payment for eternal storage.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/25">
            <Terminal size={20} /> Start Deploying
          </button>

          <button className="px-8 py-4 border border-slate-300 dark:border-slate-700 font-bold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Read Documentation
          </button>
        </div>
      </section>

      {/* Terminal */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
          
          {/* Header */}
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-slate-400">
              user@dev:~/my-fluid-app
            </div>
          </div>

          {/* Body */}
          <div
            ref={terminalRef}
            className="p-6 text-slate-300 space-y-2 max-h-[420px] overflow-y-auto"
          >
            <div className="flex">
              <span className="text-green-400 mr-2">$</span>
              npm install -g fluid-cli
            </div>

            <div className="text-slate-500">
              + fluid-cli@1.0.4 <br />
              added 12 packages in 2s
            </div>

            <div className="flex">
              <span className="text-green-400 mr-2">$</span>
              fluid init
            </div>

            <div className="text-blue-400">
              ? Project name: <span className="text-white">awesome-dapp</span> <br />
              ? Framework: <span className="text-white">React / Next.js</span> <br />
              ? Storage: <span className="text-white">Permanent (Parmaweb)</span>
            </div>

            <div className="flex">
              <span className="text-green-400 mr-2">$</span>
              fluid deploy
            </div>

            {/* Animated logs */}
            <div className="space-y-1">
              {deploySteps.slice(0, stepIndex).map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  <span>{line}</span>
                </div>
              ))}

              {stepIndex < deploySteps.length && (
                <div className="flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  <span>{typedText}</span>
                  <span className="ml-1 w-2 h-5 bg-emerald-400 animate-pulse inline-block" />
                </div>
              )}
            </div>

            {/* Success */}
            {stepIndex >= deploySteps.length && (
              <div className="text-emerald-400 font-bold mt-4">
                ✔ Deployment Successful! <br />
                Access your app at:{" "}
                <a href="#" className="underline">
                  https://fluid.link/awesome-dapp
                </a>
              </div>
            )}

            {/* Cursor */}
            <div className="flex animate-pulse">
              <span className="text-green-400 mr-2">$</span>
              <span className="w-3 h-5 bg-slate-500 block"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-24 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-16">
            Why Host on Fluid?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              [Lock, "Censorship Resistant"],
              [Cloud, "100% Uptime"],
              [Database, "One-Time Payment"],
              [Globe, "Global CDN"],
              [Cpu, "Serverless Compute"],
              [ArrowRight, "Instant Deployment"],
            ].map(([Icon, title], i) => (
              <div
                key={i}
                className="p-8 bg-white dark:bg-slate-950 border rounded-2xl hover:border-indigo-500/50 transition-colors"
              >
                <Icon className="mb-4 text-indigo-500" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  High-performance decentralized infrastructure built for Web3.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HostPage;

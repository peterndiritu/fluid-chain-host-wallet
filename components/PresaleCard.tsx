import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ExternalLink, CreditCard } from 'lucide-react';
import { 
  useActiveAccount, 
  useSendTransaction, 
  useReadContract,
  ConnectButton,
  useAutoConnect
} from "thirdweb/react";
import { 
  getContract, 
  prepareContractCall, 
  defineChain,
  toWei,
  toUnits
} from "thirdweb";
import { client, wallets } from "../client";
import confetti from 'canvas-confetti';

// --- Configuration ---
const CHAIN = defineChain(1); 
const PRESALE_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; 
const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; 
// Unused but kept for reference if needed
// const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
// const DAI_CONTRACT_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  isNative: boolean;
  isFiat?: boolean;
  address?: string;
  decimals?: number;
  apiId?: string;
}

const INITIAL_CURRENCIES: Currency[] = [
  { id: 'ETH', name: 'ETH', symbol: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026', price: 3200, isNative: true, apiId: 'ethereum' },
  { id: 'USDT', name: 'USDT', symbol: 'USDT', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', price: 1, isNative: false, address: USDT_CONTRACT_ADDRESS, decimals: 6, apiId: 'tether' },
  { id: 'BNB', name: 'BNB', symbol: 'BNB', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026', price: 600, isNative: true, apiId: 'binancecoin' }, 
  { id: 'CARD', name: 'Card', symbol: 'USD', icon: '', price: 1, isNative: false, isFiat: true },
];

type TransactionStatus = 'IDLE' | 'APPROVING' | 'CONFIRMING' | 'SUCCESS' | 'ERROR';

const PresaleCard: React.FC = () => {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  
  // State
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 19, minutes: 54, seconds: 32 });
  const [raised, setRaised] = useState<number>(2492463.99); 
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(INITIAL_CURRENCIES[0]);
  const [amount, setAmount] = useState<string>('');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [status, setStatus] = useState<TransactionStatus>('IDLE');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pricesLoading, setPricesLoading] = useState(false);

  const FLUID_PRICE_USD = 1.0;
  const NEXT_PRICE_USD = 1.25;
  const TARGET_RAISE = 4500000;

  useAutoConnect({
    client,
    wallets,
    timeout: 10000,
  });

  // Fetch Prices (Binance API with CoinGecko Fallback)
  useEffect(() => {
    const fetchPrices = async () => {
      setPricesLoading(true);
      try {
        // Try Binance first (Faster/Reliable for majors)
        const [ethRes, bnbRes] = await Promise.all([
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT').catch(() => null),
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT').catch(() => null)
        ]);

        if (ethRes?.ok && bnbRes?.ok) {
            const ethData = await ethRes.json();
            const bnbData = await bnbRes.json();
            
            setCurrencies(prev => prev.map(c => {
                if (c.symbol === 'ETH') return { ...c, price: parseFloat(ethData.price) };
                if (c.symbol === 'BNB') return { ...c, price: parseFloat(bnbData.price) };
                if (c.symbol === 'USDT') return { ...c, price: 1.0 }; // Assume peg
                return c;
            }));
        } else {
            // Fallback to CoinGecko
            const ids = INITIAL_CURRENCIES.map(c => c.apiId).filter(Boolean).join(',');
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
            const data = await response.json();
            
            setCurrencies(prev => prev.map(c => {
              if (c.apiId && data[c.apiId]) {
                return { ...c, price: data[c.apiId].usd };
              }
              return c;
            }));
        }
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      } finally {
        setPricesLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  // Update selected currency price when currencies update
  useEffect(() => {
    const updated = currencies.find(c => c.id === selectedCurrency.id);
    if (updated && updated.price !== selectedCurrency.price) {
      setSelectedCurrency(updated);
    }
  }, [currencies, selectedCurrency.id]);

  // Contracts
  const presaleContract = getContract({
    client,
    chain: CHAIN,
    address: PRESALE_CONTRACT_ADDRESS,
  });

  const tokenContract = selectedCurrency.address ? getContract({
    client,
    chain: CHAIN,
    address: selectedCurrency.address,
  }) : null;

  const { data: weiRaised } = useReadContract({
    contract: presaleContract,
    method: "function weiRaised() view returns (uint256)",
    params: []
  });

  // --- Timer & Simulation Fallback ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
      
      if (!weiRaised && raised < TARGET_RAISE && Math.random() > 0.95) {
          setRaised(prev => prev + Math.random() * 100);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [raised, weiRaised]);

  const progress = Math.min((raised / TARGET_RAISE) * 100, 100);
  
  const receivedAmount = amount 
    ? ((parseFloat(amount) * selectedCurrency.price) / FLUID_PRICE_USD).toLocaleString(undefined, { maximumFractionDigits: 0 }) 
    : '0';

  const triggerSuccess = (hash: string) => {
    setTxHash(hash);
    setStatus('SUCCESS');
    setRaised(prev => prev + (parseFloat(amount || '0') * selectedCurrency.price));
    setAmount('');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#3b82f6', '#ffffff']
    });
  };

  const handleError = (msg: string) => {
    setStatus('ERROR');
    setErrorMsg(msg);
    setTimeout(() => {
        setErrorMsg(prev => (prev === msg ? null : prev));
        setStatus(prev => prev === 'ERROR' ? 'IDLE' : prev);
    }, 5000);
  };

  const handleBuy = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    if (selectedCurrency.isFiat) {
       // Placeholder for Fiat Onramp
       window.open("https://wert.io", "_blank");
       return;
    }

    if (!account) return; 

    setErrorMsg(null);
    setTxHash(null);

    try {
      if (selectedCurrency.isNative) {
        if (selectedCurrency.id === 'ETH' || selectedCurrency.id === 'BNB') {
            setStatus('CONFIRMING');
            const transaction = prepareContractCall({
              contract: presaleContract,
              method: "function buyTokens() payable",
              params: [],
              value: toWei(amount),
            });
            
            sendTransaction(transaction, {
              onSuccess: (tx) => triggerSuccess(tx.transactionHash),
              onError: (err) => {
                console.error(err);
                handleError("Transaction failed. Please try again.");
              }
            });
        }
      } else if (tokenContract) {
        const decimals = (selectedCurrency as any).decimals || 18;
        const amountInUnits = toUnits(amount, decimals);
        
        setStatus('APPROVING');
        const approveTx = prepareContractCall({
          contract: tokenContract,
          method: "function approve(address spender, uint256 amount)",
          params: [PRESALE_CONTRACT_ADDRESS, amountInUnits],
        });

        sendTransaction(approveTx, {
          onSuccess: () => {
             setStatus('CONFIRMING');
             const buyTx = prepareContractCall({
               contract: presaleContract,
               method: "function buyWithUSDT(uint256 amount)", 
               params: [amountInUnits],
             });
             sendTransaction(buyTx, {
               onSuccess: (tx) => triggerSuccess(tx.transactionHash),
               onError: (err) => handleError("Purchase failed during execution.")
             });
          },
          onError: () => handleError(`${selectedCurrency.symbol} Approval failed.`)
        });
      }
    } catch (error: any) {
      console.error("Transaction setup failed:", error);
      handleError("Failed to initiate transaction.");
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-10">
      <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* Status Indicators */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wide">Sale Live</span>
            </div>
            <div className="flex items-center gap-2">
                {pricesLoading && <Loader2 size={12} className="animate-spin text-blue-400" />}
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wide">Batch 1</div>
            </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-white mb-2">Buy $FLUID</h2>
            <div className="flex items-center justify-center gap-4 text-sm">
                <span className="text-slate-400">Current: <span className="text-white font-bold">${FLUID_PRICE_USD.toFixed(2)}</span></span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">Next: <span className="text-orange-400 font-bold">${NEXT_PRICE_USD.toFixed(2)}</span></span>
            </div>
        </div>

        {/* Timer Box */}
        <div className="bg-slate-900/50 rounded-xl p-3 mb-6 border border-slate-800">
             <div className="flex justify-between text-center gap-2">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex-1">
                        <div className="bg-slate-800 rounded-lg py-2 mb-1 border border-slate-700">
                             <span className="text-xl font-bold text-white font-mono">{String(value).padStart(2, '0')}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">{unit}</span>
                    </div>
                ))}
             </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
            <div className="flex justify-between text-xs mb-2 font-bold">
                 <span className="text-slate-400">Raised: <span className="text-emerald-400">${raised.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></span>
                 <span className="text-slate-500">${TARGET_RAISE.toLocaleString()}</span>
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 relative transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
            </div>
        </div>

        {/* Currency Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-4">
             {currencies.map((curr) => (
                 <button
                    key={curr.id}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all relative overflow-hidden ${
                        selectedCurrency.id === curr.id 
                        ? 'bg-blue-600/10 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                 >
                    {curr.isFiat ? (
                        <CreditCard size={20} className={selectedCurrency.id === curr.id ? "text-blue-400" : "text-slate-500"} />
                    ) : (
                        <img src={curr.icon} alt={curr.name} className="w-5 h-5 rounded-full mb-1" />
                    )}
                    <span className="text-[10px] font-bold uppercase mt-1">{curr.name}</span>
                    {/* Price tooltip/display on active */}
                    {selectedCurrency.id === curr.id && !curr.isFiat && (
                         <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    )}
                 </button>
             ))}
        </div>

        {/* Inputs */}
        <div className="space-y-1 mb-6">
            <div className="bg-slate-900 border border-slate-700 rounded-t-xl p-3 flex items-center justify-between transition-colors focus-within:border-blue-500/50">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">
                        You Pay {selectedCurrency.symbol}
                        </label>
                        {!selectedCurrency.isFiat && (
                             <span className="flex items-center gap-1 text-[10px] text-cyan-500 bg-cyan-500/10 px-1.5 rounded font-mono">
                                ${selectedCurrency.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                {pricesLoading ? <Loader2 size={8} className="animate-spin ml-1"/> : <span className="w-1 h-1 rounded-full bg-cyan-500 ml-1"></span>}
                             </span>
                        )}
                    </div>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="bg-transparent text-xl font-bold text-white placeholder-slate-600 focus:outline-none w-full"
                    />
                </div>
                {selectedCurrency.icon && <img src={selectedCurrency.icon} className="w-6 h-6 rounded-full opacity-80" />}
                {selectedCurrency.isFiat && <CreditCard className="w-6 h-6 text-slate-400" />}
            </div>
            
            <div className="bg-slate-900 border border-slate-700 border-t-0 rounded-b-xl p-3 flex items-center justify-between">
                <div className="flex-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">You Receive FLUID</label>
                    <input 
                        type="text" 
                        readOnly
                        value={receivedAmount}
                        placeholder="0"
                        className="bg-transparent text-xl font-bold text-emerald-400 placeholder-slate-700 focus:outline-none w-full cursor-default"
                    />
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">F</div>
            </div>
        </div>

        {/* Connect / Buy Button */}
        {!account ? (
             <ConnectButton 
                client={client}
                wallets={wallets}
                theme={"dark"}
                connectButton={{
                  label: "Connect Wallet to Buy",
                  className: "!w-full !bg-white !text-slate-900 !font-bold !rounded-xl !py-4 !h-auto !text-lg !hover:bg-slate-200 transition-colors"
                }}
             />
        ) : (
            <button 
                onClick={handleBuy}
                disabled={status !== 'IDLE' && status !== 'ERROR'}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'IDLE' || status === 'ERROR' ? 'Buy Tokens Now' : 'Processing...'}
            </button>
        )}
        
        {/* Helper Links */}
        <div className="flex justify-center gap-4 mt-6 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">How to buy <ExternalLink size={10} /></a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">New Wallet <ExternalLink size={10} /></a>
        </div>

        {/* Processing/Success Overlays */}
        {(status === 'SUCCESS') && (
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center z-20 animate-fade-in-up p-6 text-center">
                <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                <p className="text-slate-400 mb-6 text-sm">Tokens reserved successfully.</p>
                <button onClick={() => setStatus('IDLE')} className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold">Close</button>
            </div>
        )}

      </div>
    </div>
  );
};

export default PresaleCard;
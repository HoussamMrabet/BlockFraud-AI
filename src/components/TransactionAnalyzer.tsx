import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';

export default function TransactionAnalyzer() {
  const [result, setResult] = useState<null | boolean>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(Math.random() > 0.8);
  };

  return (
    <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl mb-8">
      <div className="p-6">
        <h2 className="text-lg font-medium text-white mb-4">Transaction Analyzer</h2>
        
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#ffffffcc] mb-1">Transaction Value (ETH)</label>
              <input
                type="number"
                className="w-full bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg px-4 py-2.5 text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#ffffffcc] mb-1">Gas Price (Gwei)</label>
              <input
                type="number"
                className="w-full bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg px-4 py-2.5 text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                placeholder="21"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#ffffffcc] mb-1">From Address</label>
              <input
                type="text"
                className="w-full bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg px-4 py-2.5 text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#ffffffcc] mb-1">To Address</label>
              <input
                type="text"
                className="w-full bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg px-4 py-2.5 text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                placeholder="0x..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2.5 border border-[#99e39e] text-sm font-medium rounded-lg text-[#99e39e] hover:bg-[#99e39e] hover:text-[#000510] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#99e39e] transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-2" />
              Analyze Transaction
            </button>
          </div>
        </form>

        {result !== null && (
          <div className={`mt-4 p-4 rounded-lg ${result ? 'bg-red-900/20 border border-red-500/20' : 'bg-green-900/20 border border-[#99e39e]/20'}`}>
            <div className="flex">
              {result ? (
                <AlertCircle className="h-5 w-5 text-red-400" />
              ) : (
                <CheckCircle className="h-5 w-5 text-[#99e39e]" />
              )}
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${result ? 'text-red-400' : 'text-[#99e39e]'}`}>
                  {result ? 'Potentially Fraudulent Transaction' : 'Legitimate Transaction'}
                </h3>
                <div className={`mt-2 text-sm ${result ? 'text-red-400/80' : 'text-[#99e39e]/80'}`}>
                  {result
                    ? 'This transaction shows patterns consistent with fraudulent activity.'
                    : 'This transaction appears to be legitimate.'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
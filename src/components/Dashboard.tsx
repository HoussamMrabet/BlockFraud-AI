import { BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';
import TransactionAnalyzer from './TransactionAnalyzer';
import DataExplorer from './DataExplorer';
import TransactionHistogram from './TransactionHistogram';
import useData from '../hooks/useData';

export default function Dashboard() {
  const { data, loading, error } = useData('/transaction_dataset.csv');

  const stats = useMemo(() => {
    if (!data || data.length === 0) return {
      totalTransactions: 0,
      fraudulentTransactions: 0,
      fraudPercentage: 0,
    };

    const totalTransactions = data.length;
    const fraudulentTransactions = data.filter((item) => Number(item.FLAG) === 1).length;
    const fraudPercentage = ((fraudulentTransactions / totalTransactions) * 100).toFixed(2);

    return {
      totalTransactions,
      fraudulentTransactions,
      fraudPercentage: Number(fraudPercentage),
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-[#000510]">
      <nav className="bg-[#ffffff05] border-b border-[#ffffff1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-[#99e39e]" />
              <h1 className="text-xl font-bold text-white">BlockFraud Dashboard</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#99e39e]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 text-red-400">
            Error loading data: {error.message}
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6 hover:bg-[#ffffff08] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Total Transactions</h3>
                  <BarChart3 className="h-5 w-5 text-[#99e39e]" />
                </div>
                <p className="mt-2 text-3xl font-bold text-white">{stats.totalTransactions.toLocaleString()}</p>
              </div>

              <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6 hover:bg-[#ffffff08] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Fraudulent Transactions</h3>
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <p className="mt-2 text-3xl font-bold text-red-400">{stats.fraudulentTransactions.toLocaleString()}</p>
              </div>

              <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6 hover:bg-[#ffffff08] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Fraud Percentage</h3>
                  <CheckCircle2 className="h-5 w-5 text-[#99e39e]" />
                </div>
                <p className="mt-2 text-3xl font-bold text-[#99e39e]">{stats.fraudPercentage}%</p>
              </div>
            </div>

            {/* Transaction Distribution Histogram */}
            <div className="mb-8">
              <TransactionHistogram
                legitimateCount={stats.totalTransactions - stats.fraudulentTransactions}
                fraudulentCount={stats.fraudulentTransactions}
              />
            </div>

            {/* Transaction Analyzer */}
            <TransactionAnalyzer />

            {/* Data Explorer */}
            <DataExplorer />
          </>
        )}
      </main>
    </div>
  );
}
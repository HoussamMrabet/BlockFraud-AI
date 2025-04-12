import { useState, useEffect } from 'react';
import { Shield, AlertCircle, Trash2, X, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";

interface Transaction {
  address: string;
  avgMinBetweenSentTnx: number;
  avgMinBetweenReceivedTnx: number;
  timeDiffFirstLast: number;
  sentTnx: number;
  receivedTnx: number;
  numCreatedContracts: number;
  maxValueReceived: number;
  avgValReceived: number;
  avgValSent: number;
  totalEtherSent: number;
  totalEtherBalance: number;
  erc20TotalEtherReceived: number;
  erc20TotalEtherSent: number;
  erc20TotalEtherSentContract: number;
  status: string;
  probability: number;
  timestamp: number;
}

interface ApiResponse {
  prediction: string;
  probability: number;
}

const TransactionPreview = ({ transaction }: { transaction: Transaction }) => {
  const metrics = [
    { label: 'Average Minutes Between Sent Transactions', value: transaction.avgMinBetweenSentTnx },
    { label: 'Average Minutes Between Received Transactions', value: transaction.avgMinBetweenReceivedTnx },
    { label: 'Time Difference First/Last (mins)', value: transaction.timeDiffFirstLast },
    { label: 'Sent Transactions', value: transaction.sentTnx },
    { label: 'Received Transactions', value: transaction.receivedTnx },
    { label: 'Created Contracts', value: transaction.numCreatedContracts },
    { label: 'Max Value Received (ETH)', value: transaction.maxValueReceived },
    { label: 'Average Value Received (ETH)', value: transaction.avgValReceived },
    { label: 'Average Value Sent (ETH)', value: transaction.avgValSent },
    { label: 'Total Ether Sent', value: transaction.totalEtherSent },
    { label: 'Total Ether Balance', value: transaction.totalEtherBalance },
    { label: 'ERC20 Total Ether Received', value: transaction.erc20TotalEtherReceived },
    { label: 'ERC20 Total Ether Sent', value: transaction.erc20TotalEtherSent },
    { label: 'ERC20 Total Ether Sent to Contracts', value: transaction.erc20TotalEtherSentContract },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Transaction Details</h3>
          <p className="text-sm text-[#ffffff99]">
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            transaction.status === 'Fraudulent'
              ? 'bg-red-900/20 text-red-400'
              : 'bg-[#99e39e20] text-[#99e39e]'
          }`}
        >
          {transaction.status}
        </span>
      </div>

      <div className="bg-[#ffffff0a] rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-[#ffffff99]">Address:</span>
          <span className="text-white font-mono">{transaction.address}</span>
        </div>
        <div className="text-[#ffffff99] mb-2">
          Fraud Probability: {transaction.probability.toFixed(2)}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[#ffffff0a] rounded-lg p-4 hover:bg-[#ffffff15] transition-colors"
          >
            <div className="text-sm text-[#ffffff99]">{metric.label}</div>
            <div className="text-white font-medium mt-1">
              {typeof metric.value === 'number' ? metric.value.toFixed(4) : metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function FraudPredictor() {
  const [formData, setFormData] = useState<Transaction>({
    address: '',
    avgMinBetweenSentTnx: 0,
    avgMinBetweenReceivedTnx: 0,
    timeDiffFirstLast: 0,
    sentTnx: 0,
    receivedTnx: 0,
    numCreatedContracts: 0,
    maxValueReceived: 0,
    avgValReceived: 0,
    avgValSent: 0,
    totalEtherSent: 0,
    totalEtherBalance: 0,
    erc20TotalEtherReceived: 0,
    erc20TotalEtherSent: 0,
    erc20TotalEtherSentContract: 0,
    status: '',
    probability: 0,
    timestamp: 0,
  });

  const [history, setHistory] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('transactionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'address' ? value : Number(value),
    }));
  };

  const clearForm = () => {
    setFormData({
      address: '',
      avgMinBetweenSentTnx: 0,
      avgMinBetweenReceivedTnx: 0,
      timeDiffFirstLast: 0,
      sentTnx: 0,
      receivedTnx: 0,
      numCreatedContracts: 0,
      maxValueReceived: 0,
      avgValReceived: 0,
      avgValSent: 0,
      totalEtherSent: 0,
      totalEtherBalance: 0,
      erc20TotalEtherReceived: 0,
      erc20TotalEtherSent: 0,
      erc20TotalEtherSentContract: 0,
      status: '',
      probability: 0,
      timestamp: 0,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      avg_min_between_sent_tnx: formData.avgMinBetweenSentTnx,
      avg_min_between_received_tnx: formData.avgMinBetweenReceivedTnx,
      time_diff_between_first_and_last: formData.timeDiffFirstLast,
      sent_tnx: formData.sentTnx,
      received_tnx: formData.receivedTnx,
      number_of_created_contracts: formData.numCreatedContracts,
      max_value_received: formData.maxValueReceived,
      avg_val_received: formData.avgValReceived,
      avg_val_sent: formData.avgValSent,
      total_ether_sent: formData.totalEtherSent,
      total_ether_balance: formData.totalEtherBalance,
      erc20_total_ether_received: formData.erc20TotalEtherReceived,
      erc20_total_ether_sent: formData.erc20TotalEtherSent,
      erc20_total_ether_sent_contract: formData.erc20TotalEtherSentContract,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }

      const result = data as ApiResponse;
      
      const newTransaction: Transaction = {
        ...formData,
        status: result.prediction,
        probability: result.probability,
        timestamp: Date.now(),
      };

      const updatedHistory = [newTransaction, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
      clearForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const removeTransaction = (timestamp: number) => {
    const updatedHistory = history.filter(t => t.timestamp !== timestamp);
    setHistory(updatedHistory);
    localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('transactionHistory');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Fraud Predictor</h1>
        <p className="text-[#ffffff99] mb-8">
          Analyze transactions in real-time to detect potential fraud using our advanced AI model.
        </p>
      </div>

      <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-[#ffffffcc] mb-1">Address</label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg px-4 py-2.5 text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                placeholder="0x..."
              />
            </div>

            {Object.entries(formData)
              .filter(([key]) => key !== 'address' && key !== 'status' && key !== 'probability' && key !== 'timestamp')
              .map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-[#ffffffcc] mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    required
                    type="number"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    step="any"
                    className="w-full bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg px-4 py-2.5 text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                  />
                </div>
              ))}
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 text-red-400">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-2.5 border border-[#ffffff1a] rounded-lg text-[#ffffff99] hover:bg-[#ffffff0a] transition-all duration-200"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-2.5 border border-[#99e39e] text-sm font-medium rounded-lg text-[#99e39e] hover:bg-[#99e39e] hover:text-[#000510] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#99e39e] transition-all duration-200"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Predict Fraud
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Transaction History */}
      {history.length > 0 && (
        <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">Fraud predictions History</h2>
            <button
              onClick={clearHistory}
              className="text-[#ffffff99] hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {history.map((transaction) => (
              <div
                key={transaction.timestamp}
                className="bg-[#ffffff0a] rounded-lg p-4 flex items-start justify-between group hover:bg-[#ffffff15] transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#ffffff99]">Address:</span>
                    <span className="text-white">{transaction.address}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status == 'fraud'
                          ? 'bg-red-900/20 text-red-400'
                          : 'bg-[#99e39e20] text-[#99e39e]'
                      }`}
                    >
                      {transaction.status}
                    </span>
                    <span className="text-[#ffffff99]">
                      Probability: {(transaction.probability).toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-sm text-[#ffffff99]">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-2 text-[#ffffff99] hover:text-[#99e39e] rounded-lg hover:bg-[#ffffff1a] transition-all duration-200">
                        <Eye className="h-5 w-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] overflow-y-auto">
                      <TransactionPreview transaction={transaction} />
                    </DialogContent>
                  </Dialog>
                  <button
                    onClick={() => removeTransaction(transaction.timestamp)}
                    className="p-2 text-[#ffffff99] hover:text-red-400 rounded-lg hover:bg-[#ffffff1a] transition-all duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
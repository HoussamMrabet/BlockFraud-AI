import { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Trash2, AlertCircle, Eye } from 'lucide-react';
import Papa from 'papaparse';
import FilePreview from './FilePreview';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface FileData {
  id: string;
  name: string;
  timestamp: number;
  data: any[];
  stats: {
    totalTransactions: number;
    fraudulentTransactions: number;
    fraudPercentage: number;
  };
}

interface PredictionResponse {
  prediction: string;
  probability: number;
}

const REQUIRED_FIELDS = [
  'Address',
  'total ether balance',
  'total Ether sent',
  'total ether received',
  'Avg min between sent tnx',
  'Avg min between received tnx',
  'Time Diff between first and last (Mins)',
  'Sent tnx',
  'Received Tnx',
  'Number of Created Contracts',
  'max value received',
  'avg val received',
  'avg val sent',
  'ERC20 total Ether received',
  'ERC20 total ether sent',
  'ERC20 total Ether sent contract'
];

export default function DataAnalyzer() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load saved files from localStorage
  useEffect(() => {
    const savedFiles = localStorage.getItem('analyzedFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  const cancelProcessing = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsProcessing(false);
    setProgress(0);
    setTotalRows(0);
  };

  const predictRow = async (row: any): Promise<PredictionResponse> => {
    if (abortControllerRef.current?.signal.aborted) {
      throw new Error('Processing cancelled');
    }

    const payload = {
      avg_min_between_sent_tnx: parseFloat(row['Avg min between sent tnx']),
      avg_min_between_received_tnx: parseFloat(row['Avg min between received tnx']),
      time_diff_between_first_and_last: parseFloat(row['Time Diff between first and last (Mins)']),
      sent_tnx: parseFloat(row['Sent tnx']),
      received_tnx: parseFloat(row['Received Tnx']),
      number_of_created_contracts: parseFloat(row['Number of Created Contracts']),
      max_value_received: parseFloat(row['max value received']),
      avg_val_received: parseFloat(row['avg val received']),
      avg_val_sent: parseFloat(row['avg val sent']),
      total_ether_sent: parseFloat(row['total Ether sent']),
      total_ether_balance: parseFloat(row['total ether balance']),
      erc20_total_ether_received: parseFloat(row['ERC20 total Ether received']),
      erc20_total_ether_sent: parseFloat(row['ERC20 total ether sent']),
      erc20_total_ether_sent_contract: parseFloat(row['ERC20 total Ether sent contract'])
    };

    const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: abortControllerRef.current?.signal
    });

    if (!response.ok) {
      throw new Error('Prediction failed');
    }

    return response.json();
  };

  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Function to validate required fields
  const validateFields = (data: any[]) => {
    if (data.length === 0) {
      throw new Error('File is empty');
    }

    const firstRow = data[0];
    const missingFields = REQUIRED_FIELDS.filter(field => !(field in firstRow));

    if (missingFields.length > 0) {
      throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
    }

    return true;
  };

  // Function to calculate stats
  const calculateStats = (data: any[]) => {
    const totalTransactions = data.length;
    const fraudulentTransactions = data.filter((item) => Number(item.FLAG) === 1).length;
    const fraudPercentage = ((fraudulentTransactions / totalTransactions) * 100).toFixed(2);

    return {
      totalTransactions,
      fraudulentTransactions,
      fraudPercentage: Number(fraudPercentage),
    };
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            validateFields(results.data);
            setIsProcessing(true);
            setTotalRows(results.data.length);
            setProgress(0);

            abortControllerRef.current = new AbortController();

            const processedData = [];
            for (let i = 0; i < results.data.length; i++) {
              setProgress(i + 1);
              await sleep(1); // Simulate processing delay
              if (abortControllerRef.current.signal.aborted) {
                break;
              }

              try {
                const row = results.data[i] as Record<string, any>;
                const prediction = await predictRow(row);

                // Store only essential fields and prediction results
                processedData.push({
                  address: row.Address,
                  totalEtherBalance: row['total ether balance'],
                  totalEtherSent: row['total Ether sent'],
                  totalEtherReceived: row['total ether received'],
                  prediction: prediction.prediction,
                  probability: prediction.probability,
                  FLAG: row.FLAG == "0" || row.FLAG == "1" ? row.FLAG : prediction.prediction == "fraud" ? '1' : '0',
                });

              } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                  return;
                }
                throw err;
              }
            }

            if (!abortControllerRef.current.signal.aborted) {
              const fileData: FileData = {
                id: crypto.randomUUID(),
                name: file.name,
                timestamp: Date.now(),
                data: processedData,
                stats: calculateStats(processedData),
              };

              const updatedFiles = [...files, fileData];
              setFiles(updatedFiles);
              localStorage.setItem('analyzedFiles', JSON.stringify(updatedFiles));
            }
          } catch (err: any) {
            setError(err.message);
          } finally {
            setIsProcessing(false);
            setProgress(0);
            setTotalRows(0);
            abortControllerRef.current = null;
          }
        },
        error: (err) => {
          setError(`Error parsing file: ${err.message}`);
        },
      });
    };

    reader.readAsText(file);
  };

  // Delete a specific file
  const deleteFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    localStorage.setItem('analyzedFiles', JSON.stringify(updatedFiles));
  };

  // Clear all files
  const clearAllFiles = () => {
    localStorage.removeItem('analyzedFiles');
    setFiles([]);
  };

  if (selectedFile) {
    return <FilePreview fileData={selectedFile} onBack={() => setSelectedFile(null)} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Analyze from File</h1>
        <p className="text-[#ffffff99] mb-8">
          Upload CSV files to analyze transaction patterns and detect potential fraud.
        </p>
      </div>

      {/* Processing Dialog */}
      <Dialog open={isProcessing} onOpenChange={(open) => !open && cancelProcessing()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Processing File</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-[#ffffff99] mb-2">
                <span>Processing data...</span>
                <span>{progress} of {totalRows}</span>
              </div>
              <div className="w-full bg-[#ffffff1a] rounded-full h-2">
                <div
                  className="bg-[#99e39e] h-2 rounded-full"
                  style={{ width: `${(progress / totalRows) * 100}%` }}
                />
              </div>
            </div>
            <button
              onClick={cancelProcessing}
              className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Cancel Processing
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Section */}
      <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#ffffff1a] border-dashed rounded-lg cursor-pointer hover:bg-[#ffffff0a] transition-all duration-300">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-[#99e39e]" />
              <p className="mb-2 text-lg text-white">Click to upload a CSV file</p>
              <p className="text-sm text-[#ffffff99]">or drag and drop</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={(e) => {
                handleFileUpload(e);
                e.target.value = '';
              }}
            />
          </label>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}
      </div>

      {/* Clear All Button */}
      {files.length > 0 && (
        <div className="flex justify-start mt-4">
          <button
            onClick={clearAllFiles}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
          >
            Clear All Files
          </button>
        </div>
      )}

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6 hover:bg-[#ffffff08] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-[#99e39e] mr-3" />
                <div>
                  <h3 className="text-white font-medium">{file.name}</h3>
                  <p className="text-sm text-[#ffffff99]">
                    {new Date(file.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedFile(file)}
                  className="text-[#ffffff99] hover:text-[#99e39e] transition-colors p-2"
                  title="Preview file"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="text-[#ffffff99] hover:text-red-400 transition-colors p-2"
                  title="Delete file"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#ffffff0a] rounded-lg p-3">
                <p className="text-sm text-[#ffffff99]">Total Transactions</p>
                <p className="text-lg font-medium text-white">
                  {file.stats.totalTransactions.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#ffffff0a] rounded-lg p-3">
                <p className="text-sm text-[#ffffff99]">Fraudulent Transactions</p>
                <p className="text-lg font-medium text-red-400">
                  {file.stats.fraudulentTransactions.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#ffffff0a] rounded-lg p-3">
                <p className="text-sm text-[#ffffff99]">Fraud Percentage</p>
                <p className="text-lg font-medium text-[#99e39e]">
                  {file.stats.fraudPercentage}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
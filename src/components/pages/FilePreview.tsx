import { ArrowLeft, SortAsc, SortDesc, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import TransactionHistogram from '../TransactionHistogram';

interface FilePreviewProps {
  fileData: {
    id: string;
    name: string;
    timestamp: number;
    data: any[];
    stats: {
      totalTransactions: number;
      fraudulentTransactions: number;
      fraudPercentage: number;
    };
  };
  onBack: () => void;
}

export default function FilePreview({ fileData, onBack }: FilePreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | '0' | '1'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...fileData.data];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.address.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.FLAG == statusFilter);
    }

    // Apply sorting
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = parseFloat(a[sortField]) || 0;
        const bValue = parseFloat(b[sortField]) || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    return filtered;
  }, [fileData.data, sortField, sortDirection, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center text-[#ffffff99] hover:text-[#99e39e] mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Files
          </button>
          <h1 className="text-2xl font-bold text-white">{fileData.name}</h1>
          <p className="text-[#ffffff99]">
            Uploaded on {new Date(fileData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6 hover:bg-[#ffffff08] transition-all duration-300">
          <h3 className="text-lg font-medium text-white mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold text-white">
            {fileData.stats.totalTransactions.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6 hover:bg-[#ffffff08] transition-all duration-300">
          <h3 className="text-lg font-medium text-white mb-2">Fraudulent Transactions</h3>
          <p className="text-3xl font-bold text-red-400">
            {fileData.stats.fraudulentTransactions.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6 hover:bg-[#ffffff08] transition-all duration-300">
          <h3 className="text-lg font-medium text-white mb-2">Fraud Percentage</h3>
          <p className="text-3xl font-bold text-[#99e39e]">{fileData.stats.fraudPercentage}%</p>
        </div>
      </div>

      <TransactionHistogram
        legitimateCount={fileData.stats.totalTransactions - fileData.stats.fraudulentTransactions}
        fraudulentCount={fileData.stats.fraudulentTransactions}
      />

      <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl">
        <div className="p-6">
          <div className="flex flex-col space-y-4 mb-6">
            <h2 className="text-lg font-medium text-white">Fraud predictions Details</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffffff80] h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by address..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Status Filter */}
              <select
                className="px-4 py-2 bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as 'all' | '0' | '1');
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Predictions</option>
                <option value="0">Legitimate</option>
                <option value="1">Fraudulent</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#ffffff1a]">
              <thead className="bg-[#ffffff08]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                      onClick={() => handleSort('address')}
                    >
                      <span>Address</span>
                      {sortField === 'address' && (
                        sortDirection === 'asc' ? (
                          <SortAsc className="h-4 w-4 text-[#99e39e]" />
                        ) : (
                          <SortDesc className="h-4 w-4 text-[#99e39e]" />
                        )
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">Probability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                      onClick={() => handleSort('totalEtherBalance')}
                    >
                      <span>Balance (ETH)</span>
                      {sortField === 'totalEtherBalance' && (
                        sortDirection === 'asc' ? (
                          <SortAsc className="h-4 w-4 text-[#99e39e]" />
                        ) : (
                          <SortDesc className="h-4 w-4 text-[#99e39e]" />
                        )
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                      onClick={() => handleSort('totalEtherSent')}
                    >
                      <span>Sent (ETH)</span>
                      {sortField === 'totalEtherSent' && (
                        sortDirection === 'asc' ? (
                          <SortAsc className="h-4 w-4 text-[#99e39e]" />
                        ) : (
                          <SortDesc className="h-4 w-4 text-[#99e39e]" />
                        )
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                      onClick={() => handleSort('totalEtherReceived')}
                    >
                      <span>Received (ETH)</span>
                      {sortField === 'totalEtherReceived' && (
                        sortDirection === 'asc' ? (
                          <SortAsc className="h-4 w-4 text-[#99e39e]" />
                        ) : (
                          <SortDesc className="h-4 w-4 text-[#99e39e]" />
                        )
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff1a]">
                {paginatedData.map((row, index) => (
                  <tr key={index} className="hover:bg-[#ffffff08] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">
                      {row.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.FLAG == "1"
                          ? 'bg-red-900/20 text-red-400'
                          : 'bg-[#99e39e20] text-[#99e39e]'
                      }`}>
                        {row.FLAG == "1" ? 'Fraudulent' : 'Legitimate'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">
                      {row.probability}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">
                      {parseFloat(row.totalEtherBalance).toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">
                      {parseFloat(row.totalEtherSent).toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">
                      {parseFloat(row.totalEtherReceived).toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-[#ffffff99]">
              Showing {paginatedData.length} of {filteredAndSortedData.length} transactions
            </p>
            <div className="space-x-2">
              <button
                className="px-3 py-1 border border-[#ffffff1a] rounded-lg text-sm text-white hover:bg-[#ffffff0a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span className="text-sm text-[#ffffff99]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 border border-[#ffffff1a] rounded-lg text-sm text-white hover:bg-[#ffffff0a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
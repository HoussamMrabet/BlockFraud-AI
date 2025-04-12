import { useState, useMemo } from 'react';
import { SortAsc, SortDesc, Search } from 'lucide-react';
import useData from '../hooks/useData';

export default function DataExplorer() {
  const { data, loading, error } = useData('/transaction_dataset.csv');

  const [statusFilter, setStatusFilter] = useState<'all' | 'Legitimate' | 'Fraudulent'>('all');
  const [sortField, setSortField] = useState<'id' | 'balance' | 'sent' | 'received' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const formattedData = useMemo(() => {
    if (!data) return [];
    return data.map((item: any, index: number) => ({
      id: index + 1,
      address: item.Address || 'N/A',
      balance: parseFloat(item['total ether balance']) || 0,
      sent: parseFloat(item['total Ether sent']) || 0,
      received: parseFloat(item['total ether received']) || 0,
      status: item.FLAG === "1" ? 'Fraudulent' : 'Legitimate',
    }));
  }, [data]);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...formattedData];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.id.toString().includes(searchTerm) ||
        t.address.toLowerCase().includes(searchLower)
      );
    }

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = a[sortField] || 0;
        const bValue = b[sortField] || 0;
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    return filtered;
  }, [formattedData, statusFilter, sortField, sortDirection, searchTerm]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedTransactions.slice(start, start + pageSize);
  }, [filteredAndSortedTransactions, currentPage]);

  const handleSort = (field: 'id' | 'balance' | 'sent' | 'received') => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
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

  if (loading) return <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#99e39e]"></div>
  </div>;
  
  if (error) return <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 text-red-400">
    Failed to load transactions.
  </div>;

  return (
    <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl">
      <div className="p-6">
        {/* Header & Filters */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Transaction Explorer</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffffff80]" />
                <input
                  type="text"
                  placeholder="Search by ID or address"
                  className="pl-10 pr-4 py-2 bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg text-white placeholder-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <select
                className="px-4 py-2 bg-[#ffffff0a] border border-[#ffffff1a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#99e39e] focus:border-transparent transition-all duration-200"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="Legitimate">Legitimate</option>
                <option value="Fraudulent">Fraudulent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-[#ffffff1a]">
            <thead className="bg-[#ffffff08]">
              <tr>
                {['id'].map((field) => (
                  <th key={field} className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                      onClick={() => handleSort(field as any)}
                    >
                      <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                      {sortField === field && sortDirection === 'asc' && (
                        <SortAsc className="h-4 w-4 text-[#99e39e]" />
                      )}
                      {sortField === field && sortDirection === 'desc' && (
                        <SortDesc className="h-4 w-4 text-[#99e39e]" />
                      )}
                    </button>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">Address</th>
                {['balance', 'sent', 'received'].map((field) => (
                  <th key={field} className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                      onClick={() => handleSort(field as any)}
                    >
                      <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                      {sortField === field && sortDirection === 'asc' && (
                        <SortAsc className="h-4 w-4 text-[#99e39e]" />
                      )}
                      {sortField === field && sortDirection === 'desc' && (
                        <SortDesc className="h-4 w-4 text-[#99e39e]" />
                      )}
                    </button>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-[#ffffff99] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ffffff1a]">
              {paginatedData.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-[#ffffff08] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">
                    {transaction.address !== 'N/A' ? (
                      <span title={transaction.address}>
                        {`${transaction.address.slice(0, 5)}...${transaction.address.slice(-3)}`}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">{transaction.balance} ETH</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">{transaction.sent} ETH</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff99]">{transaction.received} ETH</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'Legitimate'
                          ? 'bg-[#99e39e20] text-[#99e39e]'
                          : 'bg-red-900/20 text-red-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-[#ffffff99]">
            Showing {paginatedData.length} of {filteredAndSortedTransactions.length} transactions
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
  );
}
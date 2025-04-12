export interface Transaction {
  index: number;
  address: string;
  flag: boolean;
  sentTx: number;
  receivedTx: number;
  totalTransactions: number;
  totalEtherSent: number;
  totalEtherReceived: number;
  totalERC20Transactions: number;
}

export interface DashboardStats {
  totalTransactions: number;
  fraudulentTransactions: number;
  fraudPercentage: number;
}
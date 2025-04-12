import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Transaction Distribution',
      color: '#ffffff',
      font: {
        size: 16,
        family: 'DM Sans',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 5, 16, 0.9)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#99e39e',
      borderWidth: 1,
      padding: 12,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#ffffff99',
      },
      title: {
        display: true,
        text: 'Number of Transactions',
        color: '#ffffff99',
      },
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#ffffff99',
      },
      title: {
        display: true,
        text: 'Transaction Status',
        color: '#ffffff99',
      },
    },
  },
};

interface TransactionHistogramProps {
  legitimateCount: number;
  fraudulentCount: number;
}

export default function TransactionHistogram({ legitimateCount, fraudulentCount }: TransactionHistogramProps) {
  const data = {
    labels: ['Legitimate', 'Fraudulent'],
    datasets: [
      {
        label: 'Transactions',
        data: [legitimateCount, fraudulentCount],
        backgroundColor: [
          '#99e39e80',  // Green with opacity for legitimate
          'rgba(239, 68, 68, 0.5)',  // Red with opacity for fraudulent
        ],
        borderColor: [
          '#99e39e',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-[#ffffff05] backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-6">
      <div className="h-[400px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
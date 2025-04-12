import { CheckIcon } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Stats = (): JSX.Element => {
  const featureList = [
    { id: 1, text: "100% Accurate" },
    { id: 2, text: "Real-Time Fraud Detection" },
    { id: 3, text: "Instant Transaction Monitoring" },
    { id: 4, text: "Self-Learning Algorithm" },
    { id: 5, text: "Adaptable to New Fraud Techniques" },
    { id: 6, text: "High-Speed Processing" },
    { id: 7, text: "Seamless Integration" },
    { id: 8, text: "Constantly Updated Model" },
  ];

  const prCurveData = {
    labels: ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0'],
    datasets: [
      {
        label: 'Precision-Recall Curve',
        data: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0],
        borderColor: '#99e39e',
        backgroundColor: 'rgba(153, 227, 158, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'AI Model Performance',
        color: '#ffffff',
        font: {
          size: 16,
          family: 'DM Sans',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 5, 16, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#99e39e',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Recall',
          color: '#ffffff99',
        },
        grid: {
          color: '#ffffff1a',
        },
        ticks: {
          color: '#ffffff99',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Precision',
          color: '#ffffff99',
        },
        grid: {
          color: '#ffffff1a',
        },
        ticks: {
          color: '#ffffff99',
        },
      },
    },
  };

  return (
    <section id="benefits" className="flex flex-col md:flex-row items-start justify-between py-16 w-full gap-12">
      <div className="flex flex-col w-full md:w-1/2 items-start gap-10">
        <div className="flex flex-col items-start gap-3 w-full">
          <div className="font-normal text-lg tracking-[-0.60px] leading-[21.6px]">
            <span className="text-white tracking-[-0.11px]">AI Fraud </span>
            <span className="text-main-colour tracking-[-0.11px]">Detection</span>
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            <h2 className="font-semibold text-white text-[40px] tracking-[-0.60px] leading-[48.0px]">
              The most precise fraud<br className="hidden md:block" /> detection AI
            </h2>
            <p className="text-[#ffffff99] text-base leading-[22.4px] max-w-[90%]">
              Our AI system ensures 100% accuracy with real-time fraud detection, adapting to new fraud techniques.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 w-full">
          {featureList.map((feature) => (
            <div key={feature.id} className="flex items-center gap-3 bg-[#ffffff0a] p-4 rounded-xl hover:bg-[#ffffff1a] transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-main-colour" />
              </div>
              <span className="font-medium text-white text-base tracking-[-0.10px] leading-[19.2px]">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[400px] bg-[#ffffff0a] rounded-xl p-6">
        <Line data={prCurveData} options={options} />
      </div>
    </section>
  );
};
import { ShieldCheckIcon, BrainIcon, RadarIcon } from "lucide-react";

export const About = (): JSX.Element => {
  const features = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-[#99e39e]" />,
      text: "Real-time AI fraud detection\nto prevent financial losses",
    },
    {
      icon: <BrainIcon className="w-6 h-6 text-[#99e39e]" />,
      text: "Machine learning models\ntrained on millions of transactions",
    },
    {
      icon: <RadarIcon className="w-6 h-6 text-[#99e39e]" />,
      text: "Smart anomaly detection\nwith actionable insights",
    },
  ];

  return (
    <section id="about" className="flex flex-col items-center gap-12 py-16 sm:py-24 w-full px-4 lg:px-0">
      <div className="flex flex-col gap-6 w-full text-center max-w-3xl mx-auto">
        <p className="text-lg tracking-tight text-white font-normal">
          Why choose <span className="text-[#99e39e]">BlockFraud AI</span>
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.2]">
          Powerful AI to safeguard every transaction
        </h2>
        <p className="text-[#ffffff99] text-base sm:text-lg leading-[1.6] max-w-[90%] mx-auto">
          Our advanced AI system provides real-time protection against fraud, 
          ensuring your transactions are secure and legitimate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#ffffff0a] rounded-2xl hover:bg-[#ffffff1a] transition-all duration-300 group"
          >
            <div className="p-4 bg-[#ffffff1a] rounded-xl flex items-center justify-center group-hover:bg-[#99e39e1a] transition-all duration-300">
              {feature.icon}
            </div>
            <p className="text-white text-base font-medium whitespace-pre-line leading-snug text-center sm:text-left">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
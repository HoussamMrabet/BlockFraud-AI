import React from "react";
import { Separator } from "../ui/separator";
import { ShieldAlert, Upload, BarChart } from "lucide-react";

export const Features = (): JSX.Element => {
  const features = [
    {
      id: 1,
      title: "AI Fraud Prediction",
      icon: <ShieldAlert className="w-6 h-6 text-white" />,
    },
    {
      id: 2,
      title: "CSV Data Upload",
      icon: <Upload className="w-6 h-6 text-white" />,
    },
    {
      id: 3,
      title: "Batch Analysis",
      icon: <BarChart className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div id="features" className="flex flex-wrap items-center justify-between py-16 sm:py-24 w-full px-4 lg:px-0">
      <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] mb-12 lg:mb-0 order-2 lg:order-1">
        <img
          src="/features.png"
          alt="AI Fraud Detection"
          className="w-full h-full object-contain transform hover:scale-105 transition-all duration-500"
        />
      </div>

      <div className="flex flex-col w-full lg:w-1/2 items-start pl-0 lg:pl-12 order-1 lg:order-2">
        <div className="flex flex-col items-start gap-6 relative self-stretch w-full mb-8 sm:mb-12">
          <div className="text-lg font-normal tracking-[-0.60px] leading-[21.6px] text-white">
            AI-Powered Fraud Detection{" "}
            <span className="text-[#99e39e] tracking-[-0.11px]">Service</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-white leading-[1.2] tracking-[-0.60px]">
            Detect fraudulent transactions <br className="hidden sm:block" />
            with intelligent accuracy
          </h2>

          <p className="text-base font-normal text-[#ffffff99] leading-[1.6] max-w-[90%]">
            Our system uses advanced AI models to analyze financial transactions,
            predict fraudulent behavior, and help protect your platform from risk.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
          {features.map((feature, index) => (
            <React.Fragment key={feature.id}>
              <div className="flex items-center gap-4 w-full group">
                <div className="p-3 inline-flex items-center justify-center bg-[#ffffff1a] rounded-full backdrop-blur-[10px] backdrop-brightness-[100%] group-hover:bg-[#99e39e1a] transition-all duration-300">
                  {feature.icon}
                </div>

                <div className="text-xl font-medium text-white tracking-[-0.12px] group-hover:text-main-colour transition-colors duration-300">
                  {feature.title}
                </div>
              </div>

              {index < features.length - 1 && (
                <Separator
                  className="bg-[#ffffff1a] h-px w-full opacity-50"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
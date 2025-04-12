import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-wrap items-center lg:items-start justify-between pt-[72px] pb-0 px-4 lg:px-0 relative w-full text-center lg:text-left">
      <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start gap-10 relative">
        <div className="flex flex-col items-center lg:items-start gap-6 relative self-stretch w-full">
          <Badge className="bg-[#99e39e1a] text-main-colour border border-solid border-[#ffffff1a] px-4 py-1.5 rounded-[999px]">
            <span className="font-medium text-base tracking-[-0.60px] leading-[19.2px]">
              AI-Powered Fraud Prevention
            </span>
          </Badge>  

          <h1 className="self-stretch font-medium text-[#ffffff] text-4xl sm:text-5xl xl:text-7xl tracking-[-0.60px] leading-[1.2] xl:leading-[1.2]">
            Smarter, Faster{" "}
            <span className="text-main-colour">Fraud Detection</span>{" "}
            with AI
          </h1>

          <p className="self-stretch font-normal text-[#ffffffcc] text-base sm:text-lg tracking-[0] leading-[1.6] max-w-[90%] mx-auto lg:mx-0">
            Detect suspicious transactions in real-time with our
            intelligent and adaptive AI fraud detection system.
          </p>
        </div>

        <Button 
          onClick={() => navigate('/dashboard')}
          className="bg-main-colour hover:bg-[#70bf76] text-bg rounded-xl px-6 py-[13px] h-auto mb-10 lg:mb-0 flex items-center gap-2.5 transform hover:scale-105 transition-all duration-300"
        >
          <span className="font-semibold text-base tracking-[-0.60px] leading-[22.4px]">
            Get Started
          </span>
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="relative w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[582px]">
        <img 
          src="/Hero.png" 
          alt="Hero" 
          className="w-full h-full object-contain transform hover:scale-105 transition-all duration-500" 
        />
      </div>
    </section>
  );
};
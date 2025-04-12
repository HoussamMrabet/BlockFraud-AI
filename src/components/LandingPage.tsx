import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer } from "../lib/utils";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Stats } from "./sections/Stats";
import { Features } from "./sections/Features";

export const LandingPage = (): JSX.Element => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="bg-bg min-h-screen flex flex-col items-center overflow-x-hidden"
    >
      <div className="container-custom">
        <Header />
        <Hero />
        <About />
        <Features />
        <Stats />
      </div>
      <Footer />
    </motion.div>
  );
};
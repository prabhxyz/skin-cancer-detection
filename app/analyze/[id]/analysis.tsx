"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AnalysisType } from "./sections";

interface AnalysisProps {
  image: string;
  id: string;
  analysis: AnalysisType;
  setAnalysis: (analysis: AnalysisType) => void;
}

const Analysis = ({ image, id, setAnalysis, analysis }: AnalysisProps) => {
  // loading state
  const [loading, setLoading] = useState(false);
  const handleAnalysis = async () => {
    setLoading(true);
    const response = await fetch("/api/analyze?img=" + id);
    const data = await response.json();
    setLoading(false);
    setAnalysis(data);
  };
  return (
    <div className="h-ful fc gap-10 justify-start">
      <Image
        src={image}
        alt="analysis"
        width={1000}
        height={500}
        className="h-[50%] w-auto"
      />
      <AnimatePresence>
        {!analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="analysis"
          >
            <Button
              onClick={handleAnalysis}
              disabled={loading}
              className="mt-4"
            >
              Start Analysis
            </Button>
            <Button
              onClick={() => {
                if (analysis) {
                  setAnalysis(null);
                } else {
                  setAnalysis({ type: "Melanoma", probability: "0.8" });
                }
              }}
            >
              {analysis ? "Clear" : "Fake Analysis"}
            </Button>
          </motion.div>
        )}
        {loading && <p>loading...</p>}
        {analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2>Analysis</h2>
            <p className="text-2xl">{analysis.type}</p>
            {/* convert probability to percent from decimal */}
            <p className="text-2xl">
              Probability: {Number(analysis.probability) * 100}%
            </p>
            <Button
              onClick={() => {
                if (analysis) {
                  setAnalysis(null);
                } else {
                  setAnalysis({ type: "Melanoma", probability: "0.8" });
                }
              }}
            >
              {analysis ? "Clear" : "Fake Analysis"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analysis;

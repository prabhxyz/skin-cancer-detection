"use client";

import { useState } from "react";
import Analysis from "./analysis";
import Chat from "./chat";
import { Button } from "@/components/ui/button";

export type AnalysisType = {
  type: string;
  probability: string;
} | null;

const Sections = ({
  id,
  url,
  initialMessages,
}: {
  id: string;
  url: string;
  initialMessages: any[];
}) => {
  const [analysis, setAnalysis] = useState<AnalysisType>(null);

  return (
    <>
      <div className="h-full w-full bg-zinc-900 rounded-2xl p-4 fc gap-2">
        <div className="text-xl font-bold w-full text-left">Analysis</div>
        <Analysis
          image={url}
          id={id}
          setAnalysis={(a: AnalysisType) => setAnalysis(a)}
          analysis={analysis}
        />
      </div>
      <div className="h-full w-full bg-black rounded-2xl p-4 fc gap-2">
        <div className="text-xl font-bold w-full text-left">
          SkinVis.ai Chat
        </div>
        <Chat
          complete={!!analysis}
          id={id}
          initialMessages={initialMessages[0]?.messages || []}
        />
      </div>
    </>
  );
};

export default Sections;

"use client";

import { useState, useCallback, useRef } from "react";
import type { AIStep } from "@/components/ai/AIProgressCard";

const DEFAULT_STEPS = [
  "Analyzing your prompt and extracting intent",
  "Designing PostgreSQL schema and data model",
  "Generating page layout and components",
  "Setting up authentication and Cloudflare Workers",
  "Deploying to 49 edge regions worldwide",
];

export function useAIProgress(stepLabels = DEFAULT_STEPS) {
  const [steps, setSteps] = useState<AIStep[]>(
    stepLabels.map((label) => ({ label, status: "waiting" as const }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsComplete(false);
    setIsRunning(true);
    setSteps(stepLabels.map((label) => ({ label, status: "waiting" as const })));

    let i = 0;
    intervalRef.current = setInterval(() => {
      setSteps((prev) =>
        prev.map((step, idx) => {
          if (idx < i)  return { ...step, status: "done" };
          if (idx === i) return { ...step, status: "active" };
          return { ...step, status: "waiting" };
        })
      );
      i++;
      if (i > stepLabels.length) {
        clearInterval(intervalRef.current!);
        setSteps(stepLabels.map((label) => ({ label, status: "done" as const })));
        setIsRunning(false);
        setIsComplete(true);
      }
    }, 900);
  }, [stepLabels]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSteps(stepLabels.map((label) => ({ label, status: "waiting" as const })));
    setIsRunning(false);
    setIsComplete(false);
  }, [stepLabels]);

  return { steps, isRunning, isComplete, start, reset };
}

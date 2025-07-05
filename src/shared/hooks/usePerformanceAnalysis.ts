import { useState, useCallback } from "react";
import type {
  PerformanceMetrics,
  PerformanceLevel,
} from "../types/performance";
import { performanceAnalyzer } from "../utils/performanceAnalyzer";

interface UsePerformanceAnalysisReturn {
  metrics: PerformanceMetrics | null;
  loading: boolean;
  error: string | null;
  analyzeWebsite: (url: string) => Promise<void>;
  analyzeApi: (url: string) => Promise<void>;
  reset: () => void;
  performanceLevel: PerformanceLevel;
}

export const usePerformanceAnalysis = (): UsePerformanceAnalysisReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzer = performanceAnalyzer;

  const analyzeWebsite = useCallback(
    async (url: string) => {
      setLoading(true);
      setError(null);
      setMetrics(null);

      try {
        // Validate URL
        new URL(url);

        const result = await analyzer.analyzeWebsite(url);
        setMetrics(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [analyzer]
  );

  const analyzeApi = useCallback(
    async (url: string) => {
      setLoading(true);
      setError(null);
      setMetrics(null);

      try {
        // Validate URL
        new URL(url);

        const result = await analyzer.analyzeApi(url);
        setMetrics(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [analyzer]
  );

  const reset = useCallback(() => {
    setMetrics(null);
    setError(null);
    setLoading(false);
  }, []);

  const performanceLevel = metrics
    ? analyzer.getPerformanceLevel(metrics)
    : "unknown";

  return {
    metrics,
    loading,
    error,
    analyzeWebsite,
    analyzeApi,
    reset,
    performanceLevel,
  };
};

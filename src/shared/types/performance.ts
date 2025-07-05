export interface ResourceTiming {
  name: string;
  size: number;
  duration: number;
  type: string;
}

export interface PerformanceMetrics {
  loadTime: number;
  pageSize: number;
  requestCount: number;
  resources: ResourceTiming[];
  navigationTiming: PerformanceTiming | null;
  url?: string;
  timestamp?: number;
}

export interface AnalysisResult {
  metrics: PerformanceMetrics | null;
  loading: boolean;
  error: string | null;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export interface PerformanceThresholds {
  loadTime: {
    good: number;
    poor: number;
  };
  pageSize: {
    good: number;
    poor: number;
  };
  requestCount: {
    good: number;
    poor: number;
  };
}

export type PerformanceLevel =
  | "excellent"
  | "good"
  | "needs-improvement"
  | "poor"
  | "unknown";

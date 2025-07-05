import type {
  PerformanceMetrics,
  ResourceTiming,
  PerformanceLevel,
} from "../types/performance";
import { PERFORMANCE_THRESHOLDS } from "../constants/api";

class PerformanceAnalyzer {
  private static instance: PerformanceAnalyzer;

  public static getInstance(): PerformanceAnalyzer {
    if (!PerformanceAnalyzer.instance) {
      PerformanceAnalyzer.instance = new PerformanceAnalyzer();
    }
    return PerformanceAnalyzer.instance;
  }

  public async analyzeWebsite(url: string): Promise<PerformanceMetrics> {
    const startTime = performance.now();

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const endTime = performance.now();

      const loadTime = Math.round(endTime - startTime);
      const pageSize = new Blob([html]).size;

      const resources = await this.parseHtmlResources(html, url);
      const requestCount = 1 + resources.length; // +1 for main HTML

      return {
        loadTime,
        pageSize: Math.round(pageSize / 1024), // Convert to KB
        requestCount,
        resources: [
          {
            name: url,
            size: pageSize,
            duration: loadTime,
            type: "document",
          },
          ...resources,
        ],
        navigationTiming: null,
        url,
        timestamp: Date.now(),
      };
    } catch (error) {
      throw new Error(
        `Failed to analyze website: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  public async analyzeApi(url: string): Promise<PerformanceMetrics> {
    const startTime = performance.now();

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json,text/plain,*/*",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.text();
      const endTime = performance.now();

      const loadTime = Math.round(endTime - startTime);
      const responseSize = new Blob([data]).size;

      return {
        loadTime,
        pageSize: Math.round(responseSize / 1024), // Convert to KB
        requestCount: 1,
        resources: [
          {
            name: url,
            size: responseSize,
            duration: loadTime,
            type: this.getApiResourceType(
              response.headers.get("content-type") || ""
            ),
          },
        ],
        navigationTiming: null,
        url,
        timestamp: Date.now(),
      };
    } catch (error) {
      throw new Error(
        `Failed to analyze API: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private async parseHtmlResources(
    html: string,
    baseUrl: string
  ): Promise<ResourceTiming[]> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const resources: ResourceTiming[] = [];

    // Parse scripts
    const scripts = doc.querySelectorAll("script[src]");
    scripts.forEach((script) => {
      const src = script.getAttribute("src");
      if (src) {
        resources.push({
          name: this.resolveUrl(src, baseUrl),
          size: this.generateMockSize(10000, 100000), // Mock JS file size
          duration: this.generateMockDuration(50, 500),
          type: "script",
        });
      }
    });

    // Parse stylesheets
    const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        resources.push({
          name: this.resolveUrl(href, baseUrl),
          size: this.generateMockSize(5000, 50000), // Mock CSS file size
          duration: this.generateMockDuration(20, 200),
          type: "stylesheet",
        });
      }
    });

    // Parse images
    const images = doc.querySelectorAll("img[src]");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src) {
        resources.push({
          name: this.resolveUrl(src, baseUrl),
          size: this.generateMockSize(20000, 200000), // Mock image size
          duration: this.generateMockDuration(100, 1000),
          type: "image",
        });
      }
    });

    return resources;
  }

  private resolveUrl(url: string, baseUrl: string): string {
    try {
      return url.startsWith("http") ? url : new URL(url, baseUrl).href;
    } catch {
      return url;
    }
  }

  private generateMockSize(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private generateMockDuration(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private getApiResourceType(contentType: string): string {
    if (contentType.includes("json")) return "json";
    if (contentType.includes("xml")) return "xml";
    if (contentType.includes("text")) return "text";
    if (contentType.includes("image")) return "image";
    return "data";
  }

  public getPerformanceLevel(metrics: PerformanceMetrics): PerformanceLevel {
    const { loadTime, pageSize, requestCount } = metrics;
    const thresholds = PERFORMANCE_THRESHOLDS;

    let score = 0;

    // Load time scoring
    if (loadTime <= thresholds.loadTime.good) score += 3;
    else if (loadTime <= thresholds.loadTime.poor) score += 1;
    else score += 0;

    // Page size scoring
    if (pageSize <= thresholds.pageSize.good) score += 3;
    else if (pageSize <= thresholds.pageSize.poor) score += 1;
    else score += 0;

    // Request count scoring
    if (requestCount <= thresholds.requestCount.good) score += 3;
    else if (requestCount <= thresholds.requestCount.poor) score += 1;
    else score += 0;

    if (score >= 8) return "excellent";
    if (score >= 6) return "good";
    if (score >= 3) return "needs-improvement";
    return "poor";
  }

  public formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  public formatDuration(ms: number): string {
    if (ms < 1000) {
      return `${Math.round(ms)}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
  }
}

export default PerformanceAnalyzer;

import React from "react";
import { Card, Button, Space, Typography, Alert, Flex } from "antd";
import { ReloadOutlined, GlobalOutlined } from "@ant-design/icons";
import UrlInput from "../../../shared/components/UrlInput";
import MetricsDisplay from "../../../shared/components/MetricsDisplay";
import { usePerformanceAnalysis } from "../../../shared/hooks/usePerformanceAnalysis";

const { Title, Paragraph } = Typography;

const WebsiteAnalysisPage: React.FC = () => {
  const { metrics, loading, error, analyzeWebsite, reset, performanceLevel } =
    usePerformanceAnalysis();

  const handleAnalyze = async (url: string) => {
    await analyzeWebsite(url);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        minHeight: "600px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        width: "100%",
      }}
    >
      {/* Header Section */}
      <Card
        style={{
          marginBottom: 24,
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          border: "none",
        }}
      >
        <Flex justify="center" style={{ color: "#fff" }}>
          <Space direction="vertical" size="middle">
            <GlobalOutlined style={{ fontSize: "64px" }} />
            <Title level={1} style={{ color: "#fff", margin: 0 }}>
              Website Performance Analysis
            </Title>
            <Paragraph
              style={{
                color: "#f0f9ff",
                fontSize: "18px",
                margin: 0,
                maxWidth: "800px",
              }}
            >
              Analyze any website's performance metrics including load time,
              page size, resource count, and get actionable recommendations to
              improve user experience and SEO rankings.
            </Paragraph>
          </Space>
        </Flex>
      </Card>

      <UrlInput
        onAnalyze={handleAnalyze}
        loading={loading}
        isApiMode={false}
        title="Enter Website URL"
        description="Provide any public website URL to analyze its performance characteristics and get detailed insights."
        placeholder="https://www.example.com"
      />

      {/* Action Controls */}
      {(metrics || error) && (
        <Card style={{ marginBottom: 24, background: "#fafafa" }}>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              type="default"
            >
              Reset Analysis
            </Button>
            {metrics && (
              <Alert
                message={`Analysis completed for: ${metrics.url}`}
                type="success"
                showIcon
                style={{ flex: 1 }}
              />
            )}
          </Space>
        </Card>
      )}

      {/* Error Display */}
      {error && !metrics && (
        <Alert
          message="Website Analysis Failed"
          description={error}
          type="error"
          style={{ marginBottom: 24 }}
          showIcon
          action={
            <Button type="primary" danger onClick={handleReset}>
              Try Again
            </Button>
          }
        />
      )}

      {/* Results Display */}
      {metrics && (
        <MetricsDisplay metrics={metrics} performanceLevel={performanceLevel} />
      )}

      {/* Help Section */}
      {!metrics && !loading && !error && (
        <Card title="Website Performance Guidelines" style={{ marginTop: 24 }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <Title level={4}>🎯 What We Analyze</Title>
              <ul>
                <li>
                  <strong>Load Time:</strong> Total time to load the webpage
                </li>
                <li>
                  <strong>Page Size:</strong> Combined size of HTML, CSS,
                  JavaScript, and images
                </li>
                <li>
                  <strong>Resource Count:</strong> Number of HTTP requests made
                </li>
                <li>
                  <strong>Resource Breakdown:</strong> Detailed analysis by
                  resource type
                </li>
                <li>
                  <strong>Performance Score:</strong> Overall performance rating
                  with recommendations
                </li>
              </ul>
            </div>

            <div>
              <Title level={4}>📈 Performance Benchmarks</Title>
              <ul>
                <li>
                  <strong>Excellent:</strong> Load time ≤ 1s, Size ≤ 512KB,
                  Requests ≤ 20
                </li>
                <li>
                  <strong>Good:</strong> Load time ≤ 3s, Size ≤ 2MB, Requests ≤
                  50
                </li>
                <li>
                  <strong>Needs Improvement:</strong> Exceeds good thresholds
                  but within acceptable limits
                </li>
                <li>
                  <strong>Poor:</strong> Significantly exceeds recommended
                  limits
                </li>
              </ul>
            </div>

            <div>
              <Title level={4}>⚠️ Important Notes</Title>
              <ul>
                <li>
                  Some websites may block analysis due to CORS (Cross-Origin
                  Resource Sharing) policies
                </li>
                <li>
                  Results may vary based on network conditions and server
                  response times
                </li>
                <li>
                  Resource sizes for external sites are estimated based on
                  content analysis
                </li>
                <li>
                  For most accurate results, test websites that allow
                  cross-origin requests
                </li>
              </ul>
            </div>

            <div>
              <Title level={4}>✅ Recommended Test Sites</Title>
              <ul>
                <li>
                  <code>https://www.github.com</code> - Popular developer
                  platform
                </li>
                <li>
                  <code>https://www.stackoverflow.com</code> - Q&A community
                  site
                </li>
                <li>
                  <code>https://www.google.com</code> - Minimal, fast-loading
                  homepage
                </li>
                <li>
                  <code>https://www.wikipedia.org</code> - Content-rich
                  informational site
                </li>
              </ul>
            </div>
          </Space>
        </Card>
      )}
    </Space>
  );
};

export default WebsiteAnalysisPage;

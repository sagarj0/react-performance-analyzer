import React from "react";
import { Card, Button, Space, Typography, Alert } from "antd";
import { ReloadOutlined, ApiOutlined } from "@ant-design/icons";
import UrlInput from "../../../shared/components/UrlInput";
import MetricsDisplay from "../../../shared/components/MetricsDisplay";
import { usePerformanceAnalysis } from "../../../shared/hooks/usePerformanceAnalysis";

const { Title, Paragraph } = Typography;

const DynamicApiTestPage: React.FC = () => {
  const { metrics, loading, error, analyzeApi, reset, performanceLevel } =
    usePerformanceAnalysis();

  const handleAnalyze = async (url: string) => {
    await analyzeApi(url);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        minHeight: "600px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header Section */}
      <Card
        style={{
          marginBottom: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <Space direction="vertical" size="middle">
            <ApiOutlined style={{ fontSize: "64px" }} />
            <Title level={1} style={{ color: "#fff", margin: 0 }}>
              Custom API Performance Testing
            </Title>
            <Paragraph
              style={{
                color: "#f0f9ff",
                fontSize: "18px",
                margin: 0,
                maxWidth: "800px",
              }}
            >
              Test any RESTful API endpoint to measure response time, payload
              size, and overall performance. Perfect for monitoring API
              performance during development and production.
            </Paragraph>
          </Space>
        </div>
      </Card>

      <UrlInput
        onAnalyze={handleAnalyze}
        loading={loading}
        isApiMode={true}
        title="Enter API Endpoint"
        description="Provide any public API endpoint URL to analyze its performance characteristics and response metrics."
        placeholder="https://api.example.com/endpoint"
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
          message="API Analysis Failed"
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
        <Card title="API Testing Guidelines" style={{ marginTop: 24 }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <Title level={4}>✅ Supported API Types</Title>
              <ul>
                <li>
                  <strong>REST APIs:</strong> JSON, XML, or plain text responses
                </li>
                <li>
                  <strong>Public APIs:</strong> Open endpoints without
                  authentication
                </li>
                <li>
                  <strong>CORS-enabled APIs:</strong> APIs that allow
                  cross-origin requests
                </li>
              </ul>
            </div>

            <div>
              <Title level={4}>📊 Metrics Measured</Title>
              <ul>
                <li>
                  <strong>Response Time:</strong> Total time to receive the
                  response
                </li>
                <li>
                  <strong>Payload Size:</strong> Size of the response data
                </li>
                <li>
                  <strong>HTTP Status:</strong> Success/failure status codes
                </li>
                <li>
                  <strong>Content Type:</strong> Format of the response data
                </li>
              </ul>
            </div>

            <div>
              <Title level={4}>⚠️ Limitations</Title>
              <ul>
                <li>
                  APIs requiring authentication may not work due to CORS
                  policies
                </li>
                <li>Some APIs may block requests from browsers</li>
                <li>
                  Results may vary based on network conditions and server
                  location
                </li>
              </ul>
            </div>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default DynamicApiTestPage;

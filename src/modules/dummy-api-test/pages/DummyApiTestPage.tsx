import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Typography,
  Alert,
  Select,
  Tag,
  Badge,
} from "antd";
import {
  ReloadOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import MetricsDisplay from "../../../shared/components/MetricsDisplay";
import { usePerformanceAnalysis } from "../../../shared/hooks/usePerformanceAnalysis";
import {
  DUMMY_API_ENDPOINTS,
  API_CATEGORIES,
} from "../../../shared/constants/api";
import type { ApiEndpoint } from "../../../shared/types/performance";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const DummyApiTestPage: React.FC = () => {
  const { metrics, loading, error, analyzeApi, reset, performanceLevel } =
    usePerformanceAnalysis();
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const handleAnalyze = async (api: ApiEndpoint) => {
    setSelectedApiId(api.id);
    await analyzeApi(api.url);
  };

  const handleReset = () => {
    reset();
    setSelectedApiId(null);
  };

  const filteredApis =
    categoryFilter === "All"
      ? DUMMY_API_ENDPOINTS
      : DUMMY_API_ENDPOINTS.filter(
          (api: ApiEndpoint) => api.category === categoryFilter
        );

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Testing: "blue",
      Geography: "green",
      Entertainment: "orange",
      Weather: "cyan",
    };
    return colors[category] || "default";
  };

  const getMethodColor = (method: string): string => {
    const colors: Record<string, string> = {
      GET: "green",
      POST: "blue",
      PUT: "orange",
      DELETE: "red",
    };
    return colors[method] || "default";
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
          background: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
          border: "none",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <Space direction="vertical" size="middle">
            <ExperimentOutlined style={{ fontSize: "64px" }} />
            <Title level={1} style={{ color: "#fff", margin: 0 }}>
              Demo API Performance Testing
            </Title>
            <Paragraph
              style={{
                color: "#f0f9ff",
                fontSize: "18px",
                margin: 0,
                maxWidth: "800px",
              }}
            >
              Test pre-configured public APIs to quickly evaluate performance
              characteristics. Perfect for learning and demonstrating API
              performance analysis capabilities.
            </Paragraph>
          </Space>
        </div>
      </Card>

      {/* Filter Section */}
      <Card style={{ marginBottom: 24 }}>
        <Space align="center" size="middle">
          <FilterOutlined />
          <Text strong>Filter by category:</Text>
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ minWidth: 120 }}
          >
            {API_CATEGORIES.map((category: string) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
          <Badge count={filteredApis.length} showZero>
            <Text type="secondary">APIs available</Text>
          </Badge>
        </Space>
      </Card>

      {/* API Grid */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {filteredApis.map((api: ApiEndpoint) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={api.id}>
            <Card
              size="small"
              hoverable
              style={{
                height: "220px",
                cursor: "pointer",
                border:
                  selectedApiId === api.id
                    ? "2px solid #1890ff"
                    : "1px solid #d9d9d9",
                transition: "all 0.3s",
                background: selectedApiId === api.id ? "#f6ffed" : "#fff",
              }}
              onClick={() => handleAnalyze(api)}
              actions={[
                <Button
                  key="test"
                  type={selectedApiId === api.id ? "primary" : "default"}
                  size="small"
                  loading={loading && selectedApiId === api.id}
                  icon={<ThunderboltOutlined />}
                  block
                >
                  {loading && selectedApiId === api.id
                    ? "Testing..."
                    : "Test API"}
                </Button>,
              ]}
            >
              <div
                style={{
                  height: "140px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ApiOutlined
                      style={{ fontSize: "18px", color: "#1890ff" }}
                    />
                    <Space size="small">
                      <Tag color={getCategoryColor(api.category)}>
                        {api.category}
                      </Tag>
                      <Tag color={getMethodColor(api.method || "GET")}>
                        {api.method || "GET"}
                      </Tag>
                    </Space>
                  </div>

                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.4",
                      height: "28px",
                      overflow: "hidden",
                    }}
                  >
                    {api.name}
                  </Title>

                  <Text
                    type="secondary"
                    style={{
                      fontSize: "12px",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      height: "48px",
                    }}
                  >
                    {api.description}
                  </Text>

                  <Text
                    code
                    style={{
                      fontSize: "10px",
                      wordBreak: "break-all",
                      background: "#f5f5f5",
                      padding: "2px 4px",
                      borderRadius: "3px",
                    }}
                  >
                    {api.url.length > 35
                      ? `${api.url.substring(0, 35)}...`
                      : api.url}
                  </Text>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

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
                message={`Analysis completed for: ${
                  DUMMY_API_ENDPOINTS.find(
                    (api: ApiEndpoint) => api.id === selectedApiId
                  )?.name
                }`}
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
        <Card title="About Demo APIs" style={{ marginTop: 24 }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div>
                  <Title level={4}>🎯 Purpose</Title>
                  <Text>
                    These demo APIs are carefully selected public endpoints that
                    demonstrate various performance characteristics and response
                    types. Perfect for testing the performance analysis tool
                    without needing to find your own APIs.
                  </Text>
                </div>

                <div>
                  <Title level={4}>📊 What Gets Measured</Title>
                  <ul>
                    <li>
                      <strong>Response Time:</strong> How fast the API responds
                    </li>
                    <li>
                      <strong>Payload Size:</strong> Size of the JSON/XML
                      response
                    </li>
                    <li>
                      <strong>Content Type:</strong> Format of the response data
                    </li>
                    <li>
                      <strong>Status Codes:</strong> HTTP success/error
                      indicators
                    </li>
                  </ul>
                </div>
              </Space>
            </Col>

            <Col xs={24} md={12}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div>
                  <Title level={4}>🏷️ Categories</Title>
                  <Space wrap>
                    {API_CATEGORIES.slice(1).map((category: string) => (
                      <Tag key={category} color={getCategoryColor(category)}>
                        {category}
                      </Tag>
                    ))}
                  </Space>
                  <br />
                  <br />
                  <Text type="secondary">
                    Filter APIs by category to test different types of endpoints
                    and see how they perform under various conditions.
                  </Text>
                </div>

                <div>
                  <Title level={4}>⚡ Quick Testing</Title>
                  <Text>
                    Click any API card to instantly test its performance.
                    Results include detailed metrics, performance
                    recommendations, and visual analytics to help you understand
                    API behavior.
                  </Text>
                </div>
              </Space>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default DummyApiTestPage;

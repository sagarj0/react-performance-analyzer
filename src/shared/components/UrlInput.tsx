import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Form,
  Alert,
  Space,
  Typography,
  Divider,
  Flex,
} from "antd";
import { SearchOutlined, ApiOutlined, GlobalOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface UrlInputProps {
  onAnalyze: (url: string) => Promise<void>;
  loading: boolean;
  placeholder?: string;
  title?: string;
  description?: string;
  isApiMode?: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({
  onAnalyze,
  loading,
  placeholder,
  title,
  description,
  isApiMode = false,
}) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const defaultPlaceholder = isApiMode
    ? "Enter API endpoint URL (e.g., https://api.example.com/users)"
    : "Enter website URL (e.g., https://www.example.com)";

  const defaultTitle = isApiMode
    ? "API Performance Testing"
    : "Website Performance Analysis";

  const defaultDescription = isApiMode
    ? "Enter any API endpoint to test its response time, payload size, and performance characteristics."
    : "Enter any website URL to analyze its performance metrics including load time, page size, and resource count.";

  const handleSubmit = async () => {
    setError(null);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
      await onAnalyze(url.trim());
    } catch {
      setError("Please enter a valid URL (include http:// or https://)");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  const exampleUrls = isApiMode
    ? [
        "https://jsonplaceholder.typicode.com/users",
        "https://restcountries.com/v3.1/all",
        "https://httpbin.org/get",
      ]
    : [
        "https://www.github.com",
        "https://www.stackoverflow.com",
        "https://www.google.com",
      ];

  return (
    <Card
      style={{
        marginBottom: 24,
        background: "linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%)",
        border: "1px solid #e8f4fd",
      }}
    >
      <Flex justify="center" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="small">
          <Flex
            justify="center"
            style={{
              fontSize: "48px",
              color: isApiMode ? "#1890ff" : "#52c41a",
            }}
          >
            {isApiMode ? <ApiOutlined /> : <GlobalOutlined />}
          </Flex>
          <Title level={2} style={{ margin: 0, color: "#1f2937" }}>
            {title || defaultTitle}
          </Title>
          <Text
            style={{
              fontSize: "16px",
              color: "#6b7280",
              maxWidth: "600px",
              display: "block",
            }}
          >
            {description || defaultDescription}
          </Text>
        </Space>
      </Flex>

      {error && (
        <Alert
          message={error}
          type="error"
          style={{ marginBottom: 16 }}
          closable
          onClose={() => setError(null)}
          showIcon
        />
      )}

      <Form layout="vertical">
        <Form.Item style={{ marginBottom: 16 }}>
          <Input
            size="large"
            placeholder={placeholder || defaultPlaceholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            prefix={<SearchOutlined />}
            style={{
              borderRadius: "8px",
              fontSize: "16px",
              padding: "12px 16px",
            }}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 16, textAlign: "center" }}>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleSubmit}
            style={{
              borderRadius: "8px",
              minWidth: "160px",
              height: "48px",
              fontSize: "16px",
              fontWeight: "600",
            }}
            disabled={!url.trim()}
          >
            {loading
              ? "Analyzing..."
              : `Analyze ${isApiMode ? "API" : "Website"}`}
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{ margin: "16px 0" }}>
        <Text type="secondary">Example URLs</Text>
      </Divider>

      <Flex justify="center">
        <Space wrap size="small">
          {exampleUrls.map((exampleUrl, index) => (
            <Button
              key={index}
              type="link"
              size="small"
              onClick={() => setUrl(exampleUrl)}
              disabled={loading}
              style={{ padding: "4px 8px", height: "auto" }}
            >
              {exampleUrl.replace("https://", "").replace("http://", "")}
            </Button>
          ))}
        </Space>
      </Flex>
    </Card>
  );
};

export default UrlInput;

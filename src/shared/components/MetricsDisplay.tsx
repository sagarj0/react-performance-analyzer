import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Alert,
  Typography,
  Tag,
  Progress,
  Space,
  Tooltip,
} from "antd";
import {
  ClockCircleOutlined,
  FileTextOutlined,
  GlobalOutlined,
  TrophyOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type {
  PerformanceMetrics,
  PerformanceLevel,
} from "../types/performance";
import { performanceAnalyzer } from "../utils/performanceAnalyzer";
import ResourceChart from "./ResourceChart";

const { Title, Text } = Typography;

interface TableDataRecord {
  key: number;
  name: string;
  fullName: string;
  type: string;
  size: string;
  sizeBytes: number;
  duration: string;
  durationMs: number;
}

interface MetricsDisplayProps {
  metrics: PerformanceMetrics;
  performanceLevel: PerformanceLevel;
  error?: string | null;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  metrics,
  performanceLevel,
  error,
}) => {
  const analyzer = performanceAnalyzer;

  if (error) {
    return (
      <Alert
        message="Analysis Failed"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 24 }}
        action={
          <Text type="secondary">Please check the URL and try again</Text>
        }
      />
    );
  }

  const getPerformanceColor = (level: PerformanceLevel): string => {
    switch (level) {
      case "excellent":
        return "#52c41a";
      case "good":
        return "#1890ff";
      case "needs-improvement":
        return "#faad14";
      case "poor":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  const getPerformanceIcon = (level: PerformanceLevel) => {
    switch (level) {
      case "excellent":
        return <TrophyOutlined />;
      case "good":
        return <CheckCircleOutlined />;
      case "needs-improvement":
        return <InfoCircleOutlined />;
      case "poor":
        return <WarningOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const getPerformanceProgress = (level: PerformanceLevel): number => {
    switch (level) {
      case "excellent":
        return 100;
      case "good":
        return 75;
      case "needs-improvement":
        return 50;
      case "poor":
        return 25;
      default:
        return 0;
    }
  };

  const tableData: TableDataRecord[] = metrics.resources.map(
    (resource, index) => ({
      key: index,
      name:
        resource.name.length > 60
          ? `${resource.name.substring(0, 30)}...${resource.name.slice(-27)}`
          : resource.name,
      fullName: resource.name,
      type: resource.type,
      size: analyzer.formatBytes(resource.size),
      sizeBytes: resource.size,
      duration: analyzer.formatDuration(resource.duration),
      durationMs: resource.duration,
    })
  );

  const columns = [
    {
      title: "Resource",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (text: string, record: TableDataRecord) => (
        <Tooltip title={record.fullName} placement="topLeft">
          <Text style={{ fontSize: "13px" }}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => {
        const colors: Record<string, string> = {
          document: "blue",
          script: "orange",
          stylesheet: "purple",
          image: "green",
          json: "cyan",
          xml: "magenta",
          text: "geekblue",
          data: "default",
        };
        return (
          <Tag color={colors[type] || "default"}>{type.toUpperCase()}</Tag>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 100,
      sorter: (a: TableDataRecord, b: TableDataRecord) =>
        a.sizeBytes - b.sizeBytes,
      render: (size: string) => (
        <Text style={{ fontFamily: "monospace" }}>{size}</Text>
      ),
    },
    {
      title: "Load Time",
      dataIndex: "duration",
      key: "duration",
      width: 120,
      sorter: (a: TableDataRecord, b: TableDataRecord) =>
        a.durationMs - b.durationMs,
      render: (duration: string, record: TableDataRecord) => (
        <Text
          style={{
            fontFamily: "monospace",
            color: record.durationMs > 1000 ? "#ff4d4f" : "#52c41a",
          }}
        >
          {duration}
        </Text>
      ),
    },
  ];

  const getLoadTimeStatus = () => {
    if (metrics.loadTime <= 1000)
      return { status: "success" as const, text: "Excellent" };
    if (metrics.loadTime <= 3000)
      return { status: "normal" as const, text: "Good" };
    if (metrics.loadTime <= 5000)
      return { status: "exception" as const, text: "Needs Improvement" };
    return { status: "exception" as const, text: "Poor" };
  };

  const getSizeStatus = () => {
    if (metrics.pageSize <= 512)
      return { status: "success" as const, text: "Excellent" };
    if (metrics.pageSize <= 2048)
      return { status: "normal" as const, text: "Good" };
    return { status: "exception" as const, text: "Needs Optimization" };
  };

  const getRequestStatus = () => {
    if (metrics.requestCount <= 20)
      return { status: "success" as const, text: "Excellent" };
    if (metrics.requestCount <= 50)
      return { status: "normal" as const, text: "Good" };
    return { status: "exception" as const, text: "Too Many" };
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Performance Score Card */}
      <Card
        style={{
          marginBottom: 24,
          background: "linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%)",
        }}
      >
        <Row align="middle" gutter={[24, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: getPerformanceColor(performanceLevel),
                }}
              >
                {getPerformanceIcon(performanceLevel)} Performance Score
              </Title>
              <Progress
                percent={getPerformanceProgress(performanceLevel)}
                strokeColor={getPerformanceColor(performanceLevel)}
                showInfo={false}
                size={[300, 12]}
              />
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {performanceLevel.replace("-", " ")}
              </Text>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={16}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Load Time"
                  value={metrics.loadTime}
                  suffix="ms"
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{
                    color:
                      getLoadTimeStatus().status === "success"
                        ? "#52c41a"
                        : getLoadTimeStatus().status === "normal"
                        ? "#1890ff"
                        : "#ff4d4f",
                    fontSize: "18px",
                  }}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {getLoadTimeStatus().text}
                </Text>
              </Col>
              <Col span={8}>
                <Statistic
                  title="Total Size"
                  value={analyzer.formatBytes(metrics.pageSize * 1024)}
                  prefix={<FileTextOutlined />}
                  valueStyle={{
                    color:
                      getSizeStatus().status === "success"
                        ? "#52c41a"
                        : getSizeStatus().status === "normal"
                        ? "#1890ff"
                        : "#ff4d4f",
                    fontSize: "18px",
                  }}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {getSizeStatus().text}
                </Text>
              </Col>
              <Col span={8}>
                <Statistic
                  title="Requests"
                  value={metrics.requestCount}
                  prefix={<GlobalOutlined />}
                  valueStyle={{
                    color:
                      getRequestStatus().status === "success"
                        ? "#52c41a"
                        : getRequestStatus().status === "normal"
                        ? "#1890ff"
                        : "#ff4d4f",
                    fontSize: "18px",
                  }}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {getRequestStatus().text}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Resource Analysis Charts */}
      <ResourceChart resources={metrics.resources} />

      {/* Resource Details Table */}
      <Card
        title={
          <Space>
            <FileTextOutlined />
            <Text strong>
              Resource Details ({metrics.resources.length} items)
            </Text>
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} resources`,
          }}
          scroll={{ x: "max-content" }}
          size="small"
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
        />
      </Card>

      {/* Performance Recommendations */}
      <Card
        title={
          <Space>
            <TrophyOutlined />
            <Text strong>Performance Recommendations</Text>
          </Space>
        }
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ lineHeight: "1.8", width: "100%" }}
        >
          {metrics.loadTime > 3000 && (
            <Alert
              message="Slow Load Time Detected"
              description="Page load time exceeds 3 seconds. Consider optimizing images, minifying CSS/JS files, enabling compression, and using a CDN for better performance."
              type="warning"
              showIcon
              style={{ marginBottom: 12 }}
            />
          )}
          {metrics.pageSize > 2048 && (
            <Alert
              message="Large Page Size"
              description="Total page size exceeds 2MB. Consider image optimization, code splitting, lazy loading, and removing unused dependencies."
              type="warning"
              showIcon
              style={{ marginBottom: 12 }}
            />
          )}
          {metrics.requestCount > 50 && (
            <Alert
              message="High Request Count"
              description="Page makes more than 50 HTTP requests. Consider bundling resources, using CSS sprites, and implementing resource concatenation."
              type="warning"
              showIcon
              style={{ marginBottom: 12 }}
            />
          )}
          {performanceLevel === "excellent" && (
            <Alert
              message="Excellent Performance!"
              description="Your resource shows outstanding performance metrics across all measured parameters. Keep up the great work!"
              type="success"
              showIcon
            />
          )}
          {performanceLevel === "good" && (
            <Alert
              message="Good Performance"
              description="Your resource performs well with minor areas for improvement. Consider implementing the suggestions above for optimal results."
              type="info"
              showIcon
            />
          )}
        </Space>
      </Card>
    </Space>
  );
};

export default MetricsDisplay;

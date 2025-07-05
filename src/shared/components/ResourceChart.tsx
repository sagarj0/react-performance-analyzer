import React from "react";
import { Card, Row, Col, Empty } from "antd";
import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons";
import type { ResourceTiming } from "../types/performance";

interface ResourceChartProps {
  resources: ResourceTiming[];
}

const ResourceChart: React.FC<ResourceChartProps> = ({ resources }) => {
  if (!resources.length) {
    return (
      <Card title="Resource Analysis" style={{ marginBottom: 24 }}>
        <Empty description="No resources to analyze" />
      </Card>
    );
  }

  // Prepare data for visualization
  const resourceTypeData = resources.reduce((acc, resource) => {
    const existing = acc.find((item) => item.type === resource.type);
    if (existing) {
      existing.count += 1;
      existing.size += resource.size;
    } else {
      acc.push({
        type: resource.type,
        count: 1,
        size: resource.size,
      });
    }
    return acc;
  }, [] as Array<{ type: string; count: number; size: number }>);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} lg={12}>
        <Card
          title={
            <span>
              <PieChartOutlined /> Resource Distribution
            </span>
          }
          style={{ height: "300px" }}
        >
          <div style={{ padding: "20px 0" }}>
            {resourceTypeData.map((item, index) => (
              <div
                key={item.type}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom:
                    index < resourceTypeData.length - 1
                      ? "1px solid #f0f0f0"
                      : "none",
                }}
              >
                <span style={{ fontWeight: 500, textTransform: "capitalize" }}>
                  {item.type}
                </span>
                <span style={{ color: "#666" }}>{item.count} items</span>
              </div>
            ))}
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card
          title={
            <span>
              <BarChartOutlined /> Size Analysis
            </span>
          }
          style={{ height: "300px" }}
        >
          <div style={{ padding: "20px 0" }}>
            {resourceTypeData.map((item, index) => (
              <div
                key={item.type}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom:
                    index < resourceTypeData.length - 1
                      ? "1px solid #f0f0f0"
                      : "none",
                }}
              >
                <span style={{ fontWeight: 500, textTransform: "capitalize" }}>
                  {item.type}
                </span>
                <span style={{ color: "#666", fontFamily: "monospace" }}>
                  {formatBytes(item.size)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ResourceChart;

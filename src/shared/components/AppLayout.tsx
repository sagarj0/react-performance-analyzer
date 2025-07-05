import React from "react";
import { Layout, Menu, Typography, Space, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GlobalOutlined,
  ApiOutlined,
  ExperimentOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { ROUTE_PATHS } from "../../routes/routes";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: ROUTE_PATHS.HOME,
      icon: <GlobalOutlined />,
      label: "Website Analysis",
    },
    {
      key: ROUTE_PATHS.DYNAMIC_API_TEST,
      icon: <ApiOutlined />,
      label: "Custom API Test",
    },
    {
      key: ROUTE_PATHS.DUMMY_API_TEST,
      icon: <ExperimentOutlined />,
      label: "Demo APIs",
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Header
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            maxWidth: "1024px",
            margin: "0 auto",
          }}
        >
          <Space align="center" size="middle" style={{ width: "50%" }}>
            <RocketOutlined style={{ fontSize: "24px", color: "#fff" }} />
            <Title
              level={3}
              style={{
                color: "#fff",
                margin: 0,
                fontWeight: "bold",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Performance Analyzer
            </Title>
          </Space>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => handleMenuClick(key)}
            style={{
              background: "transparent",
              width: "50%",
              color: "#fff",
              marginLeft: "auto",
              placeContent: "flex-end",
            }}
          />
        </div>
      </Header>

      <Content
        style={{
          minHeight: "calc(100vh - 64px - 70px)",
          width: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1024px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {children}
        </div>
      </Content>

      <Footer>
        <Space split={<Divider type="vertical" />} size="large">
          <Text type="secondary">Performance Analyzer &copy; 2025</Text>
          <Text type="secondary">Built with React & Ant Design</Text>
          <Text type="secondary">Measure • Analyze • Optimize</Text>
        </Space>
      </Footer>
    </Layout>
  );
};

export default AppLayout;

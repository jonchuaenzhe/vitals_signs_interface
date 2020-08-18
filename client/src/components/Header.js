import { Layout, Menu } from "antd";
import React from "react";
import { useNavigate } from "@reach/router";
import { useLocation } from "@reach/router";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Header } = Layout;

  const mappings = { "/": "1", "/chart": "2", "/test": "3" };

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={mappings[location.pathname]}
      >
        <Menu.Item key="1" onClick={() => navigate(`/`)}>
          Home
        </Menu.Item>
        <Menu.Item key="2" onClick={() => navigate(`/chart`)}>
          Chart
        </Menu.Item>
        <Menu.Item key="3" onClick={() => navigate(`/test`)}>
          Test Page
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Header;

import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Breadcrumb, Layout } from "antd";
import Header from "./components/Header";

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid item xs={3}>
            <Button variant="contained" color="primary" href="/chart">
              View Chart
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" href="/test">
              Test Page
            </Button>
          </Grid>
        </Grid>
      </Content>
    </Layout>
  );
};

export default Home;

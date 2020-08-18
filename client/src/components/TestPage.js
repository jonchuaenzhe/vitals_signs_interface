import React, { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { Breadcrumb, Layout, List } from "antd";
import Header from "./Header";

const TestPage = () => {
  const { Content } = Layout;

  const { sendRequest } = useHttpClient();
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_DEV_URL}/test/`,
          "GET",
          null,
          {}
        );

        if (responseData) {
          const sortedData = await responseData.data.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          const latestTwenty = sortedData.slice(0, 20);
          setDataSets((prev) => {
            prev = latestTwenty;
            return prev;
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (dataSets.length === 0) {
      getData();
    }
  }, [sendRequest]);

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Test Page</Breadcrumb.Item>
        </Breadcrumb>
        <p>
          This page displays the latest 20 datasets sent to the endpoint ending
          with `api/test`.
        </p>
        <List
          size="large"
          dataSource={dataSets}
          bordered
          renderItem={(item) => (
            <List.Item>
              <React.Fragment>
                {item.timestamp}
                <br />
                {item.value}
              </React.Fragment>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default TestPage;

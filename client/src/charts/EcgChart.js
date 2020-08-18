import { ResponsiveLine } from "@nivo/line";
import React, { Fragment, useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import {
  Spin,
  Button,
  Space,
  PageHeader,
  Tag,
  Layout,
  List,
  Breadcrumb,
} from "antd";
import ecg_sample_data from "../data/ecg_sample_data.json";
import Header from "../components/Header";

const { Content } = Layout;

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const EcgChart = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [dataSets, setDataSets] = useState([]);
  const [currentData, setCurrentData] = useState({
    sample_no: "",
    timestamp: "",
    ecg_data: [],
  });
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_DEV_URL}/data/`,
          "GET",
          null,
          {}
        );

        if (responseData) {
          const sortedData = await responseData.data.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          const latestData = sortedData[0];
          const latestTwenty = sortedData.slice(0, 20);

          setDataSets((prev) => {
            prev = latestTwenty;
            return prev;
          });

          setCurrentData((prev) => {
            prev = latestData;
            prev.ecg_data = latestData.ecg_data.slice(0, 2000);
            return prev;
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (currentData.ecg_data.length === 0) {
      getData();
    }
  }, [isLoading, currentData, sendRequest, setCurrentData, error]);

  useEffect(() => {
    if (currentData.ecg_data.length > 0) {
      setChartData([
        {
          id: "",
          color: "hsl(22,72%,40%)",
          data: currentData.ecg_data.map((value, index) => ({
            x: index / 200,
            y: value - 1,
          })),
        },
        {
          id: "aVF",
          color: "hsl(0,33%,55%)",
          data: currentData.ecg_data.map((value, index) => ({
            x: index / 200,
            y: value + 0.5,
          })),
        },
        {
          id: "aVL",
          color: "hsl(153,25%,59%)",
          data: currentData.ecg_data.map((value, index) => ({
            x: index / 200,
            y: value + 2,
          })),
        },
        {
          id: "aVR",
          color: "hsl(22,72%,40%)",
          data: currentData.ecg_data.map((value, index) => ({
            x: index / 200,
            y: value + 3.5,
          })),
        },
      ]);
    }
  }, [currentData, isLoading]);

  return (
    <Fragment>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Chart</Breadcrumb.Item>
          </Breadcrumb>
          {!isLoading && currentData ? (
            <PageHeader
              title={currentData.id}
              className="site-page-header"
              subTitle={"Sample No." + currentData.sample_no}
              tags={
                <Tag color="blue">
                  {new Date(currentData.timestamp).toLocaleString()}
                </Tag>
              }
            >
              <div className="site-layout-content" style={{ height: 600 }}>
                {chartData && (
                  <ResponsiveLine
                    data={chartData}
                    margin={{ top: 30, right: 30, bottom: 60, left: 0 }}
                    xScale={{ type: "linear", max: 10 }}
                    yScale={{
                      type: "linear",
                      min: chartData[0].data.reduce((min, value) => {
                        return Math.min(min, value.y);
                      }, 0),
                      max: chartData[3].data.reduce((max, value) => {
                        return Math.max(max, value.y);
                      }, 0),
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      orient: "bottom",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "time",
                      legendOffset: 36,
                      legendPosition: "middle",
                    }}
                    axisLeft={null}
                    enablePoints={false}
                    enableGridX={false}
                    enableGridY={false}
                    curve="monotoneX"
                    animate={false}
                    motionStiffness={120}
                    motionDamping={50}
                    isInteractive={false}
                    enableSlices={false}
                    useMesh={true}
                    theme={{
                      axis: { ticks: { text: { fontSize: 14 } } },
                      grid: {
                        line: { stroke: "#ddd", strokeDasharray: "1 2" },
                      },
                      legends: { text: { fontSize: 14 } },
                    }}
                    legends={[
                      {
                        data: [
                          { label: "L1" },
                          { label: "L2" },
                          { label: "L3" },
                          { label: "L2" },
                        ],
                        anchor: "left",
                        direction: "column",
                        translateY: -40,
                        itemsSpacing: 90,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 0,
                        itemTextColor: "#555",
                        translateX: 5,
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                              itemBackground: "#eee",
                            },
                          },
                        ],
                      },
                      {
                        anchor: "left",
                        direction: "column",
                        translateY: -40,
                        itemsSpacing: 90,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 0,
                        itemTextColor: "#555",
                        translateX: 400,
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                              itemBackground: "#eee",
                            },
                          },
                        ],
                      },
                      {
                        data: [
                          { label: "V1" },
                          { label: "V2" },
                          { label: "V3" },
                          { label: "" },
                        ],
                        anchor: "left",
                        direction: "column",
                        translateY: -40,
                        itemsSpacing: 90,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 0,
                        itemTextColor: "#555",
                        translateX: 750,
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                              itemBackground: "#eee",
                            },
                          },
                        ],
                      },
                      {
                        data: [
                          { label: "V4" },
                          { label: "V5" },
                          { label: "V6" },
                          { label: "" },
                        ],
                        anchor: "left",
                        direction: "column",
                        translateY: -40,
                        itemsSpacing: 90,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 0,
                        itemTextColor: "#555",
                        translateX: 1100,
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                              itemBackground: "#eee",
                            },
                          },
                        ],
                      },
                    ]}
                  />
                )}
              </div>
              <List
                grid={{ gutter: 10, column: 5 }}
                dataSource={dataSets}
                renderItem={(data) => (
                  <List.Item>
                    <Button
                      block
                      ghost
                      type="danger"
                      style={{ width: "auto" }}
                      onClick={() => setCurrentData(data)}
                    >
                      {data.sample_no} on{" "}
                      {new Date(data.timestamp).toLocaleString()}
                    </Button>
                  </List.Item>
                )}
              />
            </PageHeader>
          ) : (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          )}
        </Content>
      </Layout>
    </Fragment>
  );
};

export default EcgChart;

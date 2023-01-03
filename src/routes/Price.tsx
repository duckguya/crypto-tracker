import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { IPriceData } from "../interface";
import ApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const xLabel = ["1y", "30d", "7d", "24h", "12h", "6h", "1h", "30m", "15m"];

function Price() {
  const { coinId } = useParams();
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId)
    // { refetchInterval: 5000 }
  );

  /*
      percent_change_1h: any; // 변동
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: any;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: any;
      percent_change_30d: number;
      percent_change_30m: number;
*/

  return (
    <>
      {isLoading ? (
        "Loading price..."
      ) : (
        <>
          <Container>
            <TitleWrap>
              <Title>Price</Title>
              <Content>
                ${data?.quotes.USD.price.toFixed(1).toLocaleString()}
              </Content>
            </TitleWrap>
            <TitleWrap>
              <Title>Market Cap</Title>
              <Content>
                {(data?.quotes?.USD?.market_cap / 1000000000000).toFixed(2)}T
              </Content>
            </TitleWrap>
            <TitleWrap>
              <Title>Vol 24h</Title>
              <Content>
                {(data?.quotes.USD.volume_24h / 1000000000000).toFixed(2)}T
              </Content>
            </TitleWrap>
            <TitleWrap>
              <Title>1h</Title>
              <Content>
                {data?.quotes.USD.percent_change_1h > 0 ? (
                  <Plus> {"+" + data?.quotes.USD.percent_change_1h}%</Plus>
                ) : (
                  <Minus>{data?.quotes.USD.percent_change_1h + "%"}</Minus>
                )}
              </Content>
            </TitleWrap>
            <TitleWrap>
              <Title>24h</Title>
              <Content>
                {data?.quotes.USD.percent_change_24h > 0 ? (
                  <Plus>{"+" + data?.quotes.USD.percent_change_24h}%</Plus>
                ) : (
                  <Minus>{data?.quotes.USD.percent_change_24h}%</Minus>
                )}
              </Content>
            </TitleWrap>
            <TitleWrap>
              <Title>7d</Title>
              <Content>
                {data?.quotes.USD.percent_change_7d > 0 ? (
                  <Plus>{"+" + data?.quotes.USD.percent_change_7d}%</Plus>
                ) : (
                  <Minus>{data?.quotes.USD.percent_change_7d}%</Minus>
                )}
              </Content>
            </TitleWrap>
          </Container>

          {/* chart */}

          {/*  */}
          <ApexCharts
            type="line"
            series={[
              {
                name: "price",
                data: [
                  data?.quotes.USD.percent_change_1y,
                  data?.quotes.USD.percent_change_30d,
                  data?.quotes.USD.percent_change_7d,
                  data?.quotes.USD.percent_change_24h,
                  data?.quotes.USD.percent_change_12h,
                  data?.quotes.USD.percent_change_6h,
                  data?.quotes.USD.percent_change_1h,
                  data?.quotes.USD.percent_change_30m,
                  data?.quotes.USD.percent_change_15m,
                ],
                // data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },
            ]}
            options={{
              chart: {
                type: "area",
                height: 350,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              title: {
                text: "Percent Change",
                align: "center",
              },
              theme: {
                mode: isDark ? "dark" : "light",
              },
              grid: { show: false },

              stroke: {
                width: 2,
              },

              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: true },
                axisTicks: { show: true },
                labels: { show: true },
                type: "category",
                categories: xLabel,
              },
            }}
          />
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 20px;
  border: 1px solid #46505e;
  border-radius: 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
const Title = styled.p`
  font-weight: 600;
  padding-bottom: 5px;
  font-size: 1rem;
`;

const Content = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  text-align: center;
`;

const Plus = styled.span`
  color: #7bed9f;
`;
const Minus = styled.span`
  color: #ff4646;
`;

const Vertical = styled.div`
  width: 400px;
  height: 1px;
  background-color: rgb(170, 170, 170);
`;
export default Price;

import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistroy } from "../api";
import ApexCharts from "react-apexcharts";
import { getValue } from "@testing-library/user-event/dist/utils";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
// import { CoinId } from "../interface";

interface IChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
  error?: string;
}
function Chart() {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data, isError } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistroy(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isError && "해당 암호화폐는 차트가 지원되지 않습니다."}
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data:
                data?.map((p) => ({
                  x: p.time_close,
                  y: [p.open, p.low, p.high, p.close],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              // width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
            grid: { show: true },

            // stroke: {
            //   curve: "smooth",
            //   width: 3,
            // },
            yaxis: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: { show: true },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            // },
            // colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

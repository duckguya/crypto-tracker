import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";

interface IRouterProps {}

function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path="/react-masterclass" element={<Coins />}></Route>
        <Route path="/react-masterclass/:coinId" element={<Coin />}>
          {/* nested routes */}
          <Route path="price" element={<Price />}></Route>
          <Route path="chart" element={<Chart />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

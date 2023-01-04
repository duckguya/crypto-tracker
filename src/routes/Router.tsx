import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "../Components/Coins";
import Home from "./Home";
import Price from "./Price";

interface IRouterProps {}

function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/crypto-tracker" element={<Home />}></Route>
        <Route path="/crypto-tracker" element={<Home />}></Route>
        <Route path="/crypto-tracker/:coinId" element={<Coin />}>
          {/* nested routes */}
          <Route path="price" element={<Price />}></Route>
          <Route path="chart" element={<Chart />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

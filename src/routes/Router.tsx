import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "../Components/Coins";
import Home from "./Home";
import Price from "./Price";

interface IRouterProps {}

function Router({}: IRouterProps) {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:coinId" element={<Coin />}>
          {/* nested routes */}
          <Route path="price" element={<Price />}></Route>
          <Route path="chart" element={<Chart />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Router;

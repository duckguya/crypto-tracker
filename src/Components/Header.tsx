import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { FetchCoins, fetchCoinTickers } from "../api";
import { ICoinList, IPriceData } from "../interface";

function Header() {
  const { isLoading, data, isError, refetch } = useQuery<ICoinList[]>(
    ["allCoins"],
    () => FetchCoins("rank")
  );
  let coinId = data && data[0].totalData && data[0].totalData[0].id;

  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  console.log(tickersData);
  return (
    <Nav>
      <div>{tickersData?.symbol}</div>
      <div>{tickersData?.quotes?.USD?.price?.toFixed(3)}</div>
      <div>{tickersData?.total_supply}</div>
      <div>{tickersData?.max_supply}</div>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  padding: 20px;
  background-color: #333740;
  color: white;
  justify-content: space-around;
  position: fixed;
  width: 100vw;
`;

export default Header;

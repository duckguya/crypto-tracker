// https://api.coinpaprika.com/#tag/Tags/paths/~1tags/get
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { ICoin } from "../interface";
import { isDarkAtom } from "./atoms";
import DarkToggle from "./DarkToggle";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  /* grid-template-columns: 2fr 1fr; */
  align-items: center;
  /* justify-items: right; */
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.shadowColor};
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.accentColor};
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,700;1,700&family=Source+Sans+Pro:wght@300;400&family=Ubuntu:wght@700&display=swap");
  font-family: "Ubuntu", sans-serif;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  // useQuery(queryKey, fetch함수)
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  // const setDarkAtom = useSetRecoilState(isDarkAtom);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  // 첫 랜더 시 로딩이 보이고 그 이후부턴 로딩이 안보이는 이유(detail페이지 갔다와도) : react query가 데이터를 캐시에 저장해둔다.

  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoadin] = useState(true);

  // //   component가 처음 시작될 때 한번만 실행하기
  // useEffect(() => {
  //   //  useEffect 안에서 function 만들기
  //   (async () => {
  //     // 이곳이 먼저 실행된다.
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     //  fetch로 가져올 경우 json 문자열로 오기때문에 javscript객체로 변환을 해줘야한다.
  //     setCoins(json.slice(0, 100));
  //     setLoadin(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <div />
        <Title>Coin List</Title>
        <DarkToggle />
      </Header>
      {isLoading ? (
        <Loader> Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/react-masterclass/${coin.id}`}
                state={{ name: coin.name }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;

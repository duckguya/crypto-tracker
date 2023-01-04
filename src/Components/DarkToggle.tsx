import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkToggle() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const toggleDarkAtom = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <DarkBtn isDark={isDark} onClick={toggleDarkAtom}>
      {isDark ? (
        <FaSun
          style={{
            color: "#ffc048",
            left: "-1px",
            top: "1.5px",
            position: "relative",
          }}
        />
      ) : (
        <FaMoon
          style={{
            color: "#2c5072",
            left: "-1px",
            top: "1.5px",
            position: "relative",
          }}
        />
      )}
    </DarkBtn>
  );
}

const DarkBtn = styled.button<{ isDark: boolean }>`
  position: fixed;
  border-radius: 25px;
  width: 35px;
  height: 25px;
  margin: 15px;
  background-color: white;
  border: 1px solid #eee;
  cursor: pointer;
  outline: none;
  box-shadow: 1px 2px 0
    ${(props) =>
      props.isDark ? "rgb(255, 255, 255, 0.5)" : "rgb(0, 0, 0, 0.5)"};
  &:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    top: 2px;
  }
`;
export default DarkToggle;

import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { FaSun, FaMoon } from "react-icons/fa";
// active 효과말고 유지가 되야하는데 그 기능이 안됨
// const DarkBtn = styled.label`
//   width: 40px;
//   height: 20px;
//   position: relative;
//   display: block;
//   background-color: #ebebeb;
//   border-radius: 200px;
//   box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
//     inset 0px -5px 15px rgba(255, 255, 255, 0.4);
//   cursor: pointer;
//   &:after {
//     content: "";
//     width: 18px;
//     height: 18px;
//     position: absolute;
//     top: 1px;
//     left: 1px;
//     background: linear-gradient(180deg, #ffcc89, #d8860b);
//     background-image: ;
//     border-radius: 18px;
//     box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
//     transition: all 0.05s;
//   }
//   &:active:after {
//     left: 22px;
//   }
// `;
const DarkBtn = styled.button<{ isDark: boolean }>`
  border-radius: 25px;
  width: 25px;
  height: 25px;
  background-color: white;
  border: 1px solid #eee;
  cursor: pointer;
  outline: none;
  box-shadow: 1px 2px 0
    ${(props) =>
      props.isDark ? "rgb(255, 255, 255, 0.5)" : "rgb(0, 0, 0, 0.5)"};

  &:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;
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

export default DarkToggle;

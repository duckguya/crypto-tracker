import styled from "styled-components";

function Header() {
  return (
    <Nav>
      <div>1등 디테일</div>
      <div>1등 디테일</div>
      <div>1등 디테일</div>
      <div>1등 디테일</div>
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

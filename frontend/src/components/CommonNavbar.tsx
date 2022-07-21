import React, {useState} from "react";
import { Nav, Navbar, NavItem, NavDropdown, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from '../assets/images/logo.png';
function CommonNavbar() {
  
  const [isAuthentication, setAuthentication] = useState((localStorage.accessToken!=null)); //향후 auth의 값을 통해 ture, false여부 확인 필요. 
  const logoutFun = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  }
   
  return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/"><img className="img-fluid" src={imgLogo}/> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <Nav>
                {isAuthentication ?(
                    <NavDropdown title="회원정보" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/userprofile">회원 정보</NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutFun} href="/">로그아웃</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/products/list">등록한 상품</NavDropdown.Item>
                    </NavDropdown>
                ) : ( 
                      <>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Signup</Nav.Link>
                        </>)}
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
  )
};

export default CommonNavbar;

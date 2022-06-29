import React, {useState} from "react";
import { Nav, Navbar, NavItem, NavDropdown, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLogo from '../assets/logo.png';
function CommonNavbar() {
  
  const [isAuthentication, setAuthentication] = useState(false);
  
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
                      <NavDropdown.Item href="#action/3.1">회원 정보</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">로그아웃</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">등록한 알림 설정</NavDropdown.Item>
                    </NavDropdown>
                ) : ( 
                      <>
                        <Nav.Link href="/">Login</Nav.Link>
                        <Nav.Link href="#link">Signup</Nav.Link>
                        </>)}
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
  )
};

export default CommonNavbar;

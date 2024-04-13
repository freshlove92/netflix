import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./AppLayout.style.css"

const AppLayout = () => {

    const [keyword, setKeyword] = useState("")
    const navi = useNavigate()

    const searchByKeyword =(event)=>{
      event.preventDefault()
      //url바꿔주기
      navi(`/movies?q=${keyword}`)
      setKeyword('')
    }
    const onClick =()=>{
      navi(`/movies?q=${keyword}`)
      setKeyword('')
    }
    
    //bg="dark"
    return (

       <>
        <Navbar expand="lg" className="bg-dark-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <Link to='/'>
                    <img className='logo' src='https://cdn.mediaus.co.kr/news/photo/201909/161179_166792_2613.gif'></img>
                </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link ><Link to='/' className='Link'>Home</Link></Nav.Link>
             <Nav.Link><Link to='/movies' className='Link'>Movies</Link></Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchByKeyword} onClick={onClick}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event)=>setKeyword(event.target.value)}
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        
        
        <Outlet />
    </>

    );
};

export default AppLayout;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 <Navbar data-bs-theme="dark" className='navbar'> 
          <Container fluid>
            <Navbar.Brand >
                <Link to='/'>
                    <img className='logo' src='https://cdn.mediaus.co.kr/news/photo/201909/161179_166792_2613.gif'></img>
                </Link>
                  
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
            >
              {/* <Offcanvas.Header closeButton>
                <div className='logo' onClick={logo}>
                  <img width={150} src='https://www.google.com/imgres?q=%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4%20%EB%A1%9C%EA%B3%A0&imgurl=https%3A%2F%2Fimages.ctfassets.net%2F4cd45et68cgf%2F4nBnsuPq03diC5eHXnQYx%2Fd48a4664cdc48b6065b0be2d0c7bc388%2FNetflix-Logo.jpg&imgrefurl=https%3A%2F%2Fabout.netflix.com%2Fko%2Fnewsroom&docid=J6tEh_z7cGLutM&tbnid=Gt0B-68AOl2PeM&vet=12ahUKEwjNo_-a1q2FAxULs1YBHfpvCtwQM3oECGUQAA..i&w=732&h=440&hcb=2&ved=2ahUKEwjNo_-a1q2FAxULs1YBHfpvCtwQM3oECGUQAA'></img>
                </div>
              </Offcanvas.Header> */}

              <Offcanvas.Body className='Offcanvas'>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link ><Link to='/' className='Link'>Home</Link></Nav.Link>
                  <Nav.Link><Link to='/movies' className='Link'>Link</Link></Nav.Link>
              
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    // variant="danger"
                  />
                  <Button variant="outline-primary">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
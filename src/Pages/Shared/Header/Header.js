import { Button } from '@mui/material';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../Contexts/useAuth';

const Header = () => {
  const {user, logInOut} = useAuth();
    return (
        <>

        {/* responsive navbar */}
        <Navbar sticky="top" collapseOnSelect expand="lg" style={{backgroundColor:'#2357a6'}} variant="dark">
          <Container>

          {/* navbar logo image */}
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://i.ibb.co/P5XpRcN/5ede4cfcab1c8-thumb900.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            ACL MOTORS
            </Navbar.Brand>

            {/* navbar page links */}
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Nav.Link style={{color: 'white', fontSize: '20px'}} as={Link} to="/home">Home</Nav.Link>
            <Nav.Link style={{color: 'white', fontSize: '20px'}} as={Link} to="/allProducts">All Products</Nav.Link>
            {user?.email && <Nav.Link style={{color: 'white', fontSize: '20px'}} as={Link} to="/dashboard">Dashboard</Nav.Link>}
                {user?.email && <Navbar.Text  style={{color: 'gold', fontSize: '20px', fontWeight: 'semiBold'}}>
                    Signed in: {user?.email && user?.displayName}
                </Navbar.Text>}
                {!user?.email ? <Link style={{textDecoration:'none'}} to="/login"><Button  style={{color: 'white', fontSize: '17px'}}>Login</Button></Link> 
                :
                <Button style={{color: 'white', fontSize: '14px', backgroundColor: 'red', marginLeft:'15px'}} onClick={logInOut} variant="contained" size="small">Log Out</Button>}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
};

export default Header;
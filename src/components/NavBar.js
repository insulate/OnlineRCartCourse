import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar bg="success" expand="lg" variant='dark'>
                <Container>
                    <Link className='navbar-brand' to="/">
                        <img src={window.location.origin + '/logo192.png'} alt='logo' width='30' height='30' className='d-inline-block align-top' />
                        {' '} CodingThailand
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to='/'>Home</Link>
                            <Link className='nav-link' to='/about'>About</Link>
                            <Link className='nav-link' to='/product'>Product</Link>
                            <Link className='nav-link' to='/upload'>Upload</Link>
                            <NavDropdown title="Workshop (pagination + CRUD)" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => {
                                    navigate('/hospital')
                                }}>ข้อมูลสถานพยาบาล (pagination)</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {
                                    navigate('/category')
                                }}>หมวดหมู่ข่าว</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
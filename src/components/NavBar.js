import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UserStoreContext } from '../context/UserContext';

const NavBar = () => {
    const navigate = useNavigate();
    const userStore = React.useContext(UserStoreContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getProfile = () => {
        const profileValue = JSON.parse(localStorage.getItem('profile'));
        if (profileValue) {
            userStore.updateProfile(profileValue);
        }
    }
    React.useEffect(() => {
        getProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        navigate(0);
    }

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
                        <Nav className="mr-auto">
                            <Link className='nav-link' to='/'>Home</Link>
                            <Link className='nav-link' to='/about'>About</Link>
                            <Link className='nav-link' to='/product'>Product</Link>
                            <Link className='nav-link' to='/upload'>Upload</Link>
                            {
                                userStore.profile && (<Link className='nav-link' to='/member'>Member</Link>)
                            }

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

                        {
                            userStore.profile ? (
                                <>
                                    <span className='navbar-text text-white'>ยินดีต้อนรับคุณ {userStore.profile.name} role: {userStore.profile.role}</span>
                                    <button className='btn btn-danger ml-2' onClick={logout} >logout</button>
                                </>
                            ) : (
                                <>
                                    <Nav>
                                        <Link className='nav-link' to='/login'>Login</Link>
                                        <Link className='nav-link' to='/register'>Register</Link>
                                    </Nav>
                                </>
                            )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
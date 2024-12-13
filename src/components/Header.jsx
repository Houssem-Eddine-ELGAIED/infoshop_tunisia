import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems = [] } = useSelector(state => state.cart); // Default to an empty array
  const { userInfo } = useSelector(state => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Navbar
      bg="dark" // Set to 'dark' for the color variant
      variant="dark"
      expand="lg"
      collapseOnSelect
      className="fixed-top z-2"
      style={{
        backgroundColor: '#003366', // Blue dark color for the Navbar background
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow effect
      }}
    >
      <Container>
        {/* Left part: Logo + Company Name */}
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <span style={{ color: '#007bff' }}>INFO SHOP TUNISIA</span>
          </Navbar.Brand>
        </LinkContainer>

        {/* Navbar Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Center part: Navigation Links */}
          <Nav className="mx-auto">
            <LinkContainer to="/">
              <Nav.Link className="mx-4">Accueil</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link className="mx-4">À propos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link className="mx-4">Contact</Nav.Link>
            </LinkContainer>
          </Nav>

          {/* Right part: Cart, Search, and User Sign In/Profile */}
          <Nav className="ms-auto">
            {/* Search Box */}
            <SearchBox />

            {/* Shopping Cart */}
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart style={{ marginRight: '5px' }} />
                Cart
                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg="warning"
                    style={{ marginLeft: '5px' }}
                    className="text-dark"
                  >
                    <strong>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </strong>
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* User Dropdown */}
            {userInfo ? (
              <NavDropdown title={`Welcome👋, ${userInfo.name}`} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                
               
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser style={{ marginRight: '5px' }} />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            )}
 {/* Admin Links (only visible for admin users) */}
 {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/product-list">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/order-list">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/user-list">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Meta from '../../components/Meta';
import Footer from '../../components/Footer';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/admin/dashboard';

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password, remember }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/admin/dashboard');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
      style={{
        backgroundImage: 'url("https://makariosmarketing.com/wp-content/uploads/2024/07/ecommerece.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <main className='d-flex position-relative flex-column justify-content-center align-items-center min-vh-100'>
        <Meta title={'Admin Sign In'} />
        <Button
          variant={darkMode ? 'light' : 'dark'}
          className="position-fixed top-0 end-0 m-3 shadow"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <FormContainer>
          <Card className='p-4 p-md-5 shadow-lg rounded-lg'>
            <h1 className='mb-5 text-center'>Admin Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={e => setEmail(e.target.value)}
                  className={darkMode ? 'bg-dark text-light border-light' : 'border-dark'}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder='Enter password'
                    onChange={e => setPassword(e.target.value)}
                    className={darkMode ? 'bg-dark text-light border-light' : 'border-dark'}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                    className={darkMode ? 'bg-dark text-light' : 'border-dark'}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-3' controlId='checkbox'>
                <Form.Check
                  type='checkbox'
                  label='Keep me signed in.'
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className={darkMode ? 'text-light' : 'text-dark'}
                />
              </Form.Group>
              <Button
                className='my-3 w-100'
                variant={darkMode ? 'light' : 'warning'}
                type='submit'
                disabled={isLoading}
              >
                Sign In
              </Button>
            </Form>
          </Card>
        </FormContainer>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLoginPage;

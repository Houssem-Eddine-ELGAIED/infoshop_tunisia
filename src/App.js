import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/Admin'); // Check if the current route is an admin route

  return (
    <div className='position-relative'>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />} {/* Footer is not rendered on admin pages */}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default App;

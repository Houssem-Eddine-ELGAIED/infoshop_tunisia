import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false); // Flag pour savoir si l'enregistrement est réussi
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Flag pour contrôler la redirection

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';  // Si aucun paramètre 'redirect' n'est passé, rediriger vers la page d'accueil

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fonction pour basculer la visibilité du mot de passe de confirmation
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Vérification si les mots de passe correspondent
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    } else {
      try {
        // Appel API pour l'enregistrement de l'utilisateur
        await register({ name, email, password }).unwrap();

        // Marquer l'enregistrement comme réussi et afficher un message
        setSuccess(true);
        toast.success('Registration successful. You will be redirected to the login page shortly.');

        // Déclencher la redirection vers la page de connexion après un délai
        setRedirectToLogin(true);

        // Vous pouvez ici réinitialiser le formulaire si vous le souhaitez
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        toast.error(error?.data?.message || error.error);  // Gestion des erreurs
      }
    }
  };

  // Utilisation de useEffect pour gérer la redirection après un délai de 3 secondes
  useEffect(() => {
    if (redirectToLogin) {
      // Utiliser setTimeout pour rediriger vers la page de connexion après 3 secondes
      const timeoutId = setTimeout(() => {
        navigate('/login');  // Redirection vers la page de connexion
      }, 3000); // Attendre 3 secondes avant la redirection

      // Nettoyage de timeout pour éviter de potentiels effets secondaires
      return () => clearTimeout(timeoutId);
    }
  }, [redirectToLogin, navigate]);

  return (
    <FormContainer>
      <Meta title={'Register'} />
      <h1>Register</h1>
      {/* Afficher un message de succès si l'enregistrement est réussi */}
      {success && <div className="alert alert-success">Registration successful. You will be redirected to the login page shortly.</div>}

      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            type='text'
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            type='email'
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id='togglePasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={toggleConfirmPasswordVisibility}
              id='toggleConfirmPasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button
          className='mb-3 w-100'
          variant='warning'
          type='submit'
          disabled={isLoading}
        >
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Already have an account?
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className='mx-2'
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  // State pour gérer le formulaire de contact
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation simple du formulaire
    if (!name || !email || !message) {
      setErrorMessage('Tous les champs sont obligatoires.');
      return;
    }

    // Vérification de la validité de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('L\'email est invalide.');
      return;
    }

    // Réinitialiser l'erreur et envoyer le message
    setErrorMessage('');
    setAlertMessage('Votre message a été envoyé avec succès !');

    // Réinitialiser les champs du formulaire
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-background">
      <style>{`
        /* Applique un fond d'image sur toute la page de contact */
        .contact-background {
          background-image: url('https://carcom.be/wp-content/uploads/2022/06/contact-us_36325-2135.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100vh; /* Assurez-vous que l'image couvre toute la hauteur de la page */
          padding: 40px 0;
          color: #fff; /* Texte en blanc pour plus de lisibilité */
        }

        /* Ajuste le style du Container pour plus de clarté */
        .container {
          background-color: rgba(0, 0, 0, 0.6); /* Légère transparence pour mieux lire le texte sur l'image */
          padding: 30px;
          border-radius: 8px;
        }

        /* Pour les titres et les textes */
        h2 {
          color: #fff; /* Couleur des titres */
          font-size: 2rem;
          margin-bottom: 20px;
        }

        p {
          color: #fff; /* Couleur des paragraphes */
          font-size: 1.1rem;
        }

        button {
          background-color: #4CAF50; /* Couleur du bouton */
          color: white;
        }

        button:hover {
          background-color: #45a049; /* Effet hover pour le bouton */
        }

        /* Styles spécifiques aux alertes */
        .alert {
          font-weight: bold;
        }
      `}</style>

      <Container>
        <Row className="my-5">
          <Col md={6}>
            <h2>Contactez-Nous</h2>

            {alertMessage && <Alert variant="success">{alertMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Entrez votre message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Envoyer
              </Button>
            </Form>
          </Col>

          <Col md={6}>
            <h2>Nos Coordonnées</h2>
            <p>
              <strong>Adresse :</strong>  Sousse, Tunisie
            </p>
            <p>
              <strong>Email :</strong> contact@infoshooptunisia.com
            </p>
            <p>
              <strong>Téléphone :</strong> +216 93 609 704
            </p>

            {/* Suppression de la carte Google Map */}
            <p>Vous pouvez nous rendre visite à l'adresse ci-dessus.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;

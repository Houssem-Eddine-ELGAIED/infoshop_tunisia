import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0' }}>
      <Container>
        <Row>
          {/* Colonne avec informations sur l'entreprise */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-3">INFO SHOP TUNISIA</h5>
            <p>
              Nous sommes votre destination de choix pour des produits technologiques
              de haute qualité. Trouvez les dernières tendances en matière d'électronique,
              de gadgets et bien plus encore.
            </p>
          </Col>

          {/* Colonne avec liens vers des pages importantes */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-3">Liens utiles</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><strong>Adresse :</strong>  Sousse, Tunisie</li>
              <li><strong>Téléphone :</strong> +216 93609704</li>
              <li><strong>Email :</strong> contact@houssemtech.com</li>
            </ul>
          </Col>

          {/* Colonne avec les réseaux sociaux */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-3">Suivez-nous</h5>
            <div>
              {/* Affichage des icônes sans liens */}
              <FaFacebookF size={24} style={{ color: '#fff', margin: '0 10px' }} />
              <FaTwitter size={24} style={{ color: '#fff', margin: '0 10px' }} />
              <FaInstagram size={24} style={{ color: '#fff', margin: '0 10px' }} />
              <FaLinkedin size={24} style={{ color: '#fff', margin: '0 10px' }} />
            </div>
          </Col>
        </Row>

        {/* Copyright section */}
        <Row className="text-center pt-3" style={{ borderTop: '1px solid #fff' }}>
          <Col>
            <p>&copy;Designed by Houssem Elgaied @{currentYear}   . Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

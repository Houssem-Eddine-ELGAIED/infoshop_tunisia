// src/pages/About.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// URL de l'image d'arrière-plan
const backgroundImage = "https://img.freepik.com/photos-premium/concept-centre-donnees-reseau-informatique-futur-3d-illustration-3d_441797-1838.jpg?semt=ais_hybrid";

const About = () => {
  return (
    <div 
      style={{
        backgroundImage: `url(${backgroundImage})`,    // Image de fond
        backgroundSize: 'cover',                        // L'image couvre toute la zone
        backgroundPosition: 'center',                   // Centrer l'image
        backgroundAttachment: 'fixed',                  // L'image reste fixe lors du défilement
        minHeight: '100vh',                              // Page pleine hauteur
        display: 'flex',                                // Utiliser flexbox pour centrer le contenu
        justifyContent: 'center',                       // Centrer horizontalement
        alignItems: 'center',                           // Centrer verticalement
        color: '#fff',                                  // Texte blanc pour contraster avec l'image
        paddingTop: '80px',                             // Pour ne pas cacher sous la navbar fixe
        textAlign: 'center',                            // Centrer le texte
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',        // Superposition sombre pour améliorer le contraste
          padding: '40px 20px',                          // Padding pour espacer le contenu
          borderRadius: '10px',                          // Bords arrondis
          maxWidth: '800px',                             // Limiter la largeur du contenu
          width: '100%',                                 // S'assurer que le contenu prend toute la largeur possible
        }}
      >
        <h1>À propos d' INFO SHOP TUNISIA</h1>
        <p style={{ fontSize: '1.2rem' }}>
          Chez **INFO SHOP TUNISIA**, nous nous spécialisons dans la vente de matériels informatiques,
          notamment des **PC portables haut de gamme** pour professionnels et particuliers.
        </p>
        <p style={{ fontSize: '1.2rem' }}>
          Nous offrons une large gamme de produits de qualité, allant des ordinateurs portables aux
          accessoires informatiques, tout en garantissant des conseils personnalisés et un service
          après-vente de qualité.
        </p>
        <p style={{ fontSize: '1.2rem' }}>
          Notre engagement est de vous fournir des produits fiables, performants et à des prix compétitifs.
          Explorez notre catalogue en ligne et profitez de nos offres exceptionnelles.
        </p>
      </div>
    </div>
  );
};

export default About;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { usePayOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PaymentPage = () => {
  const { orderId } = useParams();  // Récupérer l'ID de la commande depuis l'URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payOrder, { isLoading, error }] = usePayOrderMutation();

  // Fonction de gestion du paiement
  const handlePayment = async () => {
    try {
      const paymentDetails = {
        paymentMethod: 'manual', // Utilisation d'un paiement manuel
        paymentStatus: 'completed',
        // Vous pouvez inclure d'autres détails comme la date de paiement, si nécessaire
      };

      // Effectuer le paiement en utilisant la mutation API
      const response = await payOrder({ orderId, paymentDetails }).unwrap();

      // Si le paiement est réussi, vider le panier et afficher un message de succès
      dispatch(clearCartItems());
      toast.success('Payment successful and order updated');

      // Rediriger l'utilisateur vers la page des détails de la commande
      navigate(`/order/${orderId}`);
    } catch (err) {
      toast.error('Payment failed: ' + (error?.message || err.message));  // Afficher un message d'erreur si le paiement échoue
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      {/* Affichage d'un message d'attente pendant le processus de paiement */}
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Button 
            onClick={handlePayment} 
            disabled={isLoading} 
            className="w-100" 
            variant="success"
          >
            {isLoading ? 'Processing...' : 'Confirm Payment'}
          </Button>

          {/* Affichage des erreurs si elles existent */}
          {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
        </>
      )}
    </div>
  );
};

export default PaymentPage;

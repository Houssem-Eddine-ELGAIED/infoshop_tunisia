import React from 'react';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaIndianRupeeSign, FaXmark } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { useGetOrdersQuery, useDeleteOrderMutation } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import { useSelector } from 'react-redux';
import { addCurrency } from '../../utils/addCurrency';
import { useNavigate } from 'react-router-dom';  // Utilisation de useNavigate

const OrderListsPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();  // Remplacer useHistory par useNavigate

  const handleRemoveOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to remove this order?')) {
      try {
        await deleteOrder(orderId);
        alert('Order removed successfully');
      } catch (error) {
        alert('Failed to remove order');
      }
    }
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');  // Utilisation de navigate pour rediriger
  };

  return (
    <Container>
      <Meta title={'Order List'} />
      <Row className="my-4">
        <Col>
          <h2 className="text-center">Orders List</h2>
        </Col>
      </Row>

      {/* Affichage de la gestion des erreurs */}
      {error && (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      )}

      {/* Affichage du Loader pendant le chargement */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Row className="mb-3">
            <Col>
              <Button variant="secondary" onClick={handleGoBack}>
                Go Back to Dashboard
              </Button>
            </Col>
          </Row>

          <Table striped hover bordered responsive size="sm" className="text-center">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map(order => (
                <tr key={order._id}>
                  {/* Assurez-vous que order.user et order.user._id sont définis avant d'y accéder */}
                  <td>{order?.user?._id || 'N/A'}</td>
                  <td>{order?.user?.name || 'N/A'}</td>
                  <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                  <td>{addCurrency(order?.totalPrice)}</td>
                  <td>
                    {order?.isPaid ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaXmark style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order?.isDelivered ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <span>Pending</span>
                    )}
                  </td>
                  <td>
                    {order?.isDelivered ? (
                      <span>Delivered on {new Date(order?.deliveredAt).toLocaleString()}</span>
                    ) : (
                      <span>Waiting for delivery</span>
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      to={userInfo?.isAdmin ? `/admin/order/${order?._id}` : `/order/${order?._id}`}
                    >
                      <Button className="btn-sm" variant="info">
                        Details
                      </Button>
                    </LinkContainer>
                    {userInfo?.isAdmin && (
                      <Button
                        className="btn-sm ml-2"
                        variant="danger"
                        onClick={() => handleRemoveOrder(order?._id)}
                      >
                        Remove
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default OrderListsPage;

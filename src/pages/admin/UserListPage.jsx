import React, { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { FaCheck, FaTrash, FaXmark } from 'react-icons/fa6';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Utilisation de useNavigate pour le "Go Back"
import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const UserListPage = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();
  const navigate = useNavigate();  // pour la navigation

  const deleteHandler = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const { data } = await deleteUser(userId);
        toast.success(data.message);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');  // Redirection vers le tableau de bord
  };

  return (
    <>
      <Meta title={'User List'} />
      <h2>Users</h2>

      {/* Button Go Back */}
      <Row className='mb-3'>
        <Col>
          <Button variant='secondary' onClick={handleGoBack}>
            Go Back to Dashboard
          </Button>
        </Col>
      </Row>

      {/* Afficher Loader si suppression d'utilisateur ou récupération des utilisateurs en cours */}
      {isDeleteUserLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover bordered responsive size='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <LinkContainer to={`/admin/user/update/${user._id}`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    className='btn-sm'
                    variant='light'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'red' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;

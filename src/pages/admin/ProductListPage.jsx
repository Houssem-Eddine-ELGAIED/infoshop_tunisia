import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { FaRupeeSign, FaTrash, FaEdit } from 'react-icons/fa';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useDeleteProductMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import { addCurrency } from '../../utils/addCurrency';
import { useNavigate } from 'react-router-dom';  // Utilisation de useNavigate

const ProductListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip
  });

  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();

  const navigate = useNavigate();  // Remplacer useHistory par useNavigate

  useEffect(() => {
    if (data) {
      setLimit(8);
      setSkip((currentPage - 1) * limit);
      setTotal(data.total);
      setTotalPage(Math.ceil(total / limit));
    }
  }, [currentPage, data, limit, total]);

  const deleteHandler = async (productId) => {
    try {
      const { data } = await deleteProduct(productId);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const pageHandler = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');  // Utilisation de navigate pour rediriger
  };

  return (
    <Container>
      <Meta title={'Product List'} />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <LinkContainer to={'/admin/product/create'}>
            <Button className='my-3' variant='warning'>
              Add Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {/* Bouton Go Back */}
      <Row className='mb-3'>
        <Col>
          <Button variant='secondary' onClick={handleGoBack}>
            Go Back to Dashboard
          </Button>
        </Col>
      </Row>

      {/* Loader pendant le chargement des produits */}
      {isDeleteProductLoading && <Loader />}
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{addCurrency(product.price)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/update/${product._id}`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    className='btn-sm'
                    variant='light'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'red' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Pagination */}
      {totalPage > 1 && (
        <Paginate
          currentPage={currentPage}
          totalPage={totalPage}
          pageHandler={pageHandler}
        />
      )}
    </Container>
  );
};

export default ProductListPage;

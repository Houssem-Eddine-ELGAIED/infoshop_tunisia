import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import {  FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { searchProduct, clearSearch } from '../slices/searchProductSlice';
import _debounce from 'lodash.debounce';  // Import lodash.debounce

function SearchBox() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  // Déclencher la recherche avec debounce
  const debouncedSearch = _debounce((query) => {
    dispatch(searchProduct(query));
  }, 500); // 500ms de délai avant de déclencher la recherche

  // Gérer la modification de l'input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Si l'input est vide, effacer la recherche dans Redux
    if (value === '') {
      dispatch(clearSearch());
    } else {
      // Sinon, appeler la recherche après le délai de debounce
      debouncedSearch(value);
    }
  };

  // Clear search handler
  const clearSearchHandler = () => {
    dispatch(clearSearch());
    setInput('');
  };

  return (
    <Form className='d-flex'>
      <InputGroup>
        <Form.Control
          size='sm'
          type='text'
          value={input}
          onChange={handleInputChange}
          placeholder='Search Products...'
        />
        {input === '' ? (
          ''
        ) : (
          <Button type='button' variant='light' onClick={clearSearchHandler}>
            <FaTimes />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
}

export default SearchBox;

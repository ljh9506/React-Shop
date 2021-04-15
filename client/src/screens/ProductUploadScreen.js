import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductUploadScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productUpload = useSelector((state) => state.productUpload);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpload,
  } = productUpload;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        _id: productId,
        name,
        price,
        image,
        imageName,
        brand,
        category,
        countInStock,
        description,
      }),
    );
  };

  useEffect(() => {
    if (successUpload) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push('/');
    }
  }, [dispatch, history, successUpload]);

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
    setImageName(file.name);
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Upload Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>

              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
              {imageUrl ? (
                <div id='preview'>
                  <img
                    src={`${imageUrl}`}
                    alt='preview'
                    style={{
                      marginTop: '20px',
                      width: '200px',
                      height: 'auto',
                    }}
                  />
                </div>
              ) : null}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Upload
            </Button>
          </Form>
        }
      </FormContainer>
    </>
  );
};

export default ProductUploadScreen;

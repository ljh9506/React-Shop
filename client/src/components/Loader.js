import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '100px',
          height: '100px',
        }}>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;

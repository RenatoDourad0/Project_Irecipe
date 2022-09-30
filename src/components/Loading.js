import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <ReactLoading
      type="spin"
      className="loader"
      color="#76949f"
    />
  );
}

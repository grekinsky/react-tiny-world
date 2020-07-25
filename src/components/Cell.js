import React from 'react';
import './Cell.css';

function Cell({ filled, onClick }) {
  return (
    <div
      className={`grid-cell${filled ? ' grid-cell--filled' : ''}`}
      onClick={onClick}
    />
  );
}

export default Cell;

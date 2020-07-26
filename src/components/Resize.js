import React from 'react';
import Modal from './Modal';

import './Resize.css';

function Resize({ onResize, hide, isVisible, initialWidth, initialHeight }) {
  const [width, setWidth] = React.useState(initialWidth);
  const [height, setHeight] = React.useState(initialHeight);
  const [error, setError] = React.useState('');

  return (
    isVisible && (
      <Modal
        title={'Resize Grid'}
        onAccept={() => {
          if (width < 1 || height < 1) {
            setError('Invalid dimensions');
            return;
          }
          onResize(width, height);
          hide();
        }}
        onCancel={() => {
          hide();
        }}
      >
        <div className="">
          <label htmlFor="widthField" className="App-label">
            Width
          </label>
          <input
            type="number"
            id="widthField"
            min={1}
            value={width}
            className="App-input"
            onChange={(e) => {
              setError('');
              setWidth(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="heightField" className="App-label">
            Height
          </label>
          <input
            type="number"
            id="heightField"
            min={1}
            value={height}
            className="App-input"
            onChange={(e) => {
              setError('');
              setHeight(e.target.value);
            }}
          />
        </div>
        <div className="resize-error">{error}</div>
      </Modal>
    )
  );
}

export default Resize;

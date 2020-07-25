import React from 'react';
import { createPortal } from 'react-dom';

import './Modal.css';

function Modal({ onAccept, onCancel, title, children }) {
  const [container, setContainer] = React.useState(null);

  React.useEffect(() => {
    // create and mount div container
    const el = window.document.createElement('div');
    document.body.appendChild(el);
    setContainer(el);

    return () => {
      // unmount and destroy div container
      document.body.removeChild(el);
      setContainer(null);
    };
  }, []);

  return container
    ? createPortal(
        <div
          role="dialog"
          aria-labelledby="modal_label"
          aria-modal="true"
          className="modal"
        >
          <h2 id="modal_label" className="modal-label">
            {title}
          </h2>
          <div className="modal-form">{children}</div>
          <div className="modal-form-actions">
            <button className="App-button" onClick={onCancel}>
              Cancel
            </button>
            <button className="App-button" onClick={onAccept}>
              OK
            </button>
          </div>
        </div>,
        container,
      )
    : '';
}

export default Modal;

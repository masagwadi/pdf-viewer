// PdfViewerModal.js

import React from 'react';

function PdfViewerModal(props) {
  return (
    <div className={`modal ${props.isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay"></div>
      <div className="modal-content">
        {props.children}
      </div>
    </div>
  );
}

export default PdfViewerModal;

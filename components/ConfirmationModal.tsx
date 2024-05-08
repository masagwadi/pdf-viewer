import React, { useState } from 'react';

interface ConfirmationModalProps {
    documentId: string[];
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ documentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsConfirmed(false); // Reset confirmation status when closing modal
    console.log("Status NOT changed");
  };

  const handleConfirm = () => {
    setIsLoading(true); // Set loading state when confirming
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsConfirmed(true);
      setIsLoading(false);
      console.log("Status changed to Accepted");
    }, 3000);
  };

  return (
    <>
      <button disabled={isLoading || isConfirmed} onClick={openModal} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Accept</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
          <h2>Confirmation</h2>
            {isConfirmed ? (
              <p className="confirmation-message">This document has been accepted</p>
            ) : (<p>Are you sure you want to accept this document/item?</p>)}
              
                
                <button disabled={isLoading || isConfirmed} onClick={handleConfirm} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Confirm</button>
                <button onClick={closeModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Close</button>
            
            
          </div>
        </div>
      )}
      {/* Show loading state */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}
      <style jsx>{`
        /* Styles for modal */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          width: 300px;
        }

        /* Loading overlay styles */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001; /* Above modal */
        }

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #ffffff;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Confirmation message styles */
        .confirmation-message {
          color: green;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default ConfirmationModal;

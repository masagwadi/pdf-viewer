import React, { useState, useEffect } from 'react';

interface ItemSelectionModalProps {
  items: string[];
  documentId: string;
}

const ItemSelectionModalMFR: React.FC<ItemSelectionModalProps> = ({ items, documentId }) => {
  const [isModalOpenMR, setIsModalOpenMR] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [tempSelectedItems, setTempSelectedItems] = useState<string[]>([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // Load saved reasons from local storage when the component mounts
  useEffect(() => {
    const savedReasons = localStorage.getItem(`selectedItems_${documentId}`);
    if (savedReasons) {
      setSelectedItems(JSON.parse(savedReasons));
      setTempSelectedItems(JSON.parse(savedReasons));
    }
  }, [documentId]);

  const toggleModal = () => {
    setIsModalOpenMR(!isModalOpenMR);
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setTempSelectedItems(prevItems => {
      const newItems = checked
        ? [...prevItems, value]
        : prevItems.filter(item => item !== value);
      return newItems;
    });
  };

  const handleModalClose = () => {
    if (JSON.stringify(tempSelectedItems) !== JSON.stringify(selectedItems)) {
      setShowDiscardModal(true);
    } else {
      setIsModalOpenMR(false);
    }
  };

  const handleSave = () => {
    setSelectedItems(tempSelectedItems);
    localStorage.setItem(`selectedItems_${documentId}`, JSON.stringify(tempSelectedItems));
    setIsModalOpenMR(false);
    setShowDiscardModal(false);
  };

  const handleDiscard = () => {
    setTempSelectedItems(selectedItems);
    setShowDiscardModal(false);
    setIsModalOpenMR(false);
  };

  return (
    <div className='inline-block'>
      <button onClick={toggleModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">
        Reject
      </button>
      {isModalOpenMR && (
        <div className="modal">
          <div className="modal-content modal-rejection-reasons">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Moderation Failed Reasons</h2>
            <form>
              {items.map(item => (
                <label key={item}>
                  <input 
                    type="checkbox" 
                    value={item} 
                    onChange={handleItemChange}
                    checked={tempSelectedItems.includes(item)}
                  />
                  {item}
                </label>
              ))}
            </form>
            <div>
              <button onClick={handleSave} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Save</button>
            </div>
          </div>
        </div>
      )}
      {showDiscardModal && (
        <div className="discard-modal">
          <div className="discard-modal-content">
            <h2>Discard Changes?</h2>
            <p>You have unsaved changes. Do you want to discard them?</p>
            <div>
              <button onClick={handleDiscard} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Discard</button>
              <button onClick={handleSave} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Save Changes</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        /* Styles for modal toggle button */
        .modal-toggle-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }

        /* Styles for modal */
        .modal {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          width: 300px;
        }

        .modal-content label {
          display: block;
          margin: 5px 0;
        }

        .close {
          float: right;
          cursor: pointer;
        }

        /* Styles for discard modal */
        .discard-modal {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .discard-modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          width: 300px;
        }
      `}</style>
    </div>
  );
};

export default ItemSelectionModalMFR;

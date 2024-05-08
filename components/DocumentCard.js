import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function DocumentCard({ onClick, name, index, status, type="ID" }) {

  const getIconUrl = (type) => {
    switch (type) {
      case 'ML':
        return '/icons/proof-of-disability.png';
      case 'FS':
        return '/icons/fee-statement.png';
      case 'ID':
        return '/icons/ID-document.png';
      case 'POR':
        return '/icons/proof-or-registration.png';
      // Add more cases for other document types as needed
      default:
        return '/icons/default.png'; // Default icon if type is unknown
    }
  };

  return (
    <div className="documentcard" onClick={onClick}>
        <div className="documentcardIcon">
        <img src={getIconUrl(type)} alt={type} className=" w-100 mr-1 object-cover" />
        </div>
        <div className="documentcardContent">
            <h3>{name}</h3>
            <span
            className={`${status} pill`}
            onClick={onClick}
            >
            <FontAwesomeIcon icon={faThumbsUp} /> {status} 
            </span>
        </div>
    </div>
  );
}

export default DocumentCard;
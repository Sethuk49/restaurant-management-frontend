import React from 'react';

const FlashMessage = ({ message, type, onClose }) => {
  return (
    <div
      className={`p-4 mb-2 rounded shadow-md ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
    >
      {message}
      <button className="ml-4 text-white" onClick={onClose}>X</button>
    </div>
  );
};

export default FlashMessage;

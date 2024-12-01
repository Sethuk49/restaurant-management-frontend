import React, { createContext, useContext, useState, useEffect } from 'react';
import FlashMessage from './FlashMessage'; // Ensure this path is correct

const FlashMessageContext = createContext();

export const useFlashMessage = () => {
  return useContext(FlashMessageContext);
};

export const FlashMessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, type) => {
    setMessages((prev) => [...prev, { message, type }]);
  };

  const removeMessage = (index) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length > 0) {
        removeMessage(0); // Remove the first message after a duration
      }
    }, 3000); // Adjust duration as needed

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <FlashMessageContext.Provider value={{ addMessage }}>
      {children}
      <div className="fixed top-4 right-4">
        {messages.map((msg, index) => (
          <FlashMessage
            key={index}
            message={msg.message}
            type={msg.type}
            onClose={() => removeMessage(index)}
          />
        ))}
      </div>
    </FlashMessageContext.Provider>
  );
};

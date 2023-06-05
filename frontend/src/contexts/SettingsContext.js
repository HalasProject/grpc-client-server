// MyContext.js
import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState(false);

  const closeModal = () => {
    setBookToUpdate(false);
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const isModalOpen = showModal;

  return (
    <SettingsContext.Provider
      value={{
        closeModal,
        openModal,
        bookToUpdate,
        setBookToUpdate,
        isModalOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

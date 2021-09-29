import { createContext, useContext, useState } from "react";

export const ModalOverlayContext = createContext();

export const useModalOverlay = () => useContext(ModalOverlayContext);

export const ModalOverlayProvider = (props) => {
  const [modalOverlay, setModalOverlay] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const value = {
    modalOverlay,
    setModalOverlay,
    editMode,
    setEditMode,
  };

  return (
    <ModalOverlayContext.Provider value={value}>
      {props.children}
    </ModalOverlayContext.Provider>
  );
};

import { useState } from "react";

export function useModals() {
  const initialState = {
    isOpen: false,
    plantId: "",
    plantName: "",
  };

  const [Modal, setModal] = useState(initialState);

  function openModal(id: string, name: string) {
    setModal({
      isOpen: true,
      plantId: id,
      plantName: name,
    });
  }

  function closeModal() {
    setModal({
      isOpen: false,
      plantId: "",
      plantName: "",
    });
  }

  return { closeModal, openModal, Modal };
}

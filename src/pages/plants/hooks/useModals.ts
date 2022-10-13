import { useState } from "react";

interface ModalConfig<ModalData extends object> {
  data: ModalData;
}

export function useModals<ModalData extends object>(config: ModalConfig<ModalData>) {
  const initialState = {
    isOpen: false,
    ...config,
  };

  const [modal, setModal] = useState(initialState);

  function openModal(data?: ModalData) {
    setModal({
      ...initialState,
      isOpen: true,
      ...data,
    });
  }

  function closeModal() {
    setModal({
      ...initialState,
    });
  }

  return { closeModal, openModal, modal };
}

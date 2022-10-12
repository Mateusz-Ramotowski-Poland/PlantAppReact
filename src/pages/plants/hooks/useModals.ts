import { useState } from "react";

interface ModalConfig<ModalData extends object> {
  data?: ModalData;
}

export function useModals<ModalData extends object>(config?: ModalConfig<ModalData>) {
  const initialState = {
    isOpen: false,
    plantId: "",
    ...(config?.data ?? config?.data),
  };

  const [modal, setModal] = useState(initialState);

  function openModal(id: string, data?: ModalData) {
    setModal({
      ...initialState,
      isOpen: true,
      plantId: id,
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

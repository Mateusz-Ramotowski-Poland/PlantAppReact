import React from "react";
import Modal from "react-modal";
import { useAppDispatch } from "../../store/hooks";
import { deletePlant } from "../../store/plantsSlice";
import classes from "./ModalWindow.module.css";

interface Props {
  id: string;
  closeModal: () => void;
  modalIsOpen: boolean;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ModalWindow = (props: Props) => {
  const dispatch = useAppDispatch();

  async function deleteHandler(event: React.MouseEvent) {
    const path = `/plants/${props.id}/`;
    await dispatch(deletePlant(path, props.id));
    props.closeModal();
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="delete plant modal"
    >
      <form className={classes.form}>
        <p>Are you sure to delete plant with id={props.id}?</p>
        <button type="button" onClick={deleteHandler}>
          Delete
        </button>
        <button type="button" onClick={props.closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

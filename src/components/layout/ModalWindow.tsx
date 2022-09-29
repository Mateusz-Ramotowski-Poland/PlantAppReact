import { AnyAction } from "@reduxjs/toolkit";
import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
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

Modal.setAppElement("#root");

export const ModalWindow = (props: Props) => {
  const dispatch = useDispatch();

  function deleteHandler(event: React.MouseEvent) {
    event.preventDefault();
    const path = `/plants/${props.id}/`;
    dispatch(deletePlant(path, props.id, props.closeModal) as unknown as AnyAction);
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
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={props.closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};

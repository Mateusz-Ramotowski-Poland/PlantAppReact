import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { api } from "../../shared";
import { plantsActions } from "../../store/plantsSlice";
import classes from "./../../assets/FormCard.module.css";

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
    api.delete(path);
    dispatch(plantsActions.delete({ id: props.id }));
    props.closeModal();
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="delete plant modal"
    >
      <form>
        <p>Are you sure to delete plant with id={props.id}?</p>
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={props.closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};

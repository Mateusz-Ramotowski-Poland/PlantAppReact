import Modal from "react-modal";
import { useAppDispatch } from "../../../store/hooks";
import { UpdateDeleteWindow } from "../interfaces/interfaces";
import { deletePlant } from "../store/plantsSlice";
import classes from "./ModalWindowDelete.module.css";

interface Props {
  deleteModal: {
    data: UpdateDeleteWindow;
    isOpen: boolean;
  };

  closeModalDelete: () => void;
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

export const ModalWindowDelete = (props: Props) => {
  const dispatch = useAppDispatch();

  async function deleteHandler() {
    await dispatch(deletePlant(props.deleteModal.data.id));
    props.closeModalDelete();
  }

  return (
    <Modal isOpen={props.deleteModal.isOpen} onRequestClose={props.closeModalDelete} style={customStyles} contentLabel="delete plant modal">
      <form className={classes.form}>
        <p>Are you sure to delete plant{props.deleteModal.data.name ? `with name=${props.deleteModal.data.name}` : ""}?</p>
        <button type="button" onClick={deleteHandler}>
          Delete plant
        </button>
        <button type="button" onClick={props.closeModalDelete}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

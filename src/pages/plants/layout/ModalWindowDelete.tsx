import Modal from "react-modal";
import { useAppDispatch } from "../../../store/hooks";
import { deletePlant } from "../store/plantsSlice";
import classes from "./ModalWindowDelete.module.css";

interface Props {
  deleteModal: {
    plantId: string;
    isOpen: boolean;
    plantName?: string;
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
    await dispatch(deletePlant(props.deleteModal.plantId));
    props.closeModalDelete();
  }

  return (
    <Modal isOpen={props.deleteModal.isOpen} onRequestClose={props.closeModalDelete} style={customStyles} contentLabel="delete plant modal">
      <form className={classes.form}>
        <p>Are you sure to delete plant{props.deleteModal.plantName ? `with name=${props.deleteModal.plantName}` : ""}?</p>
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

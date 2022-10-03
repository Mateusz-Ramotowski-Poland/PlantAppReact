import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import classes from "../../assets/FormCard.module.css";
import React from "react";

interface Props {
  id: string;
  closeModalUpdate: () => void;
  updateModalIsOpen: boolean;
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

export const ModalWindowUpdate = (props: Props) => {
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Hello submit handler");
  };

  return (
    <Modal
      isOpen={props.updateModalIsOpen}
      onRequestClose={props.closeModalUpdate}
      style={customStyles}
      contentLabel="delete plant modal"
    >
      <section className={classes.form}>
        <h1>Update plant</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label>
              Name
              <input data-testid="name" type="text" required maxLength={50} />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Species
              <input data-testid="species" type="text" required maxLength={50} />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Watering interval <input data-testid="wateringInterval" type="number" required min={1} max={2147483647} />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Sun exposure
              <input data-testid="sunExposure" type="number" required min={1} max={24} />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Temperature
              <input data-testid="temperature" type="number" required min={-100} max={100} />
            </label>
          </div>

          <div className={classes.actions}>
            <button type="submit">Update plant with id={props.id}</button>
            <button type="button" onClick={props.closeModalUpdate}>
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </section>
    </Modal>
  );
};

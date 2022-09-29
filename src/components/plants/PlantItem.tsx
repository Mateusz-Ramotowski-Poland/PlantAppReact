import classes from "./PlantItem.module.css";
import React from "react";
import Modal from "react-modal";
import { api } from "../../shared";

interface Props {
  id: string;
  created_at: string;
  name: string;
  species: string;
  watering_interval: number;
  last_watering: string;
  next_watering: string;
  watering_count: string;
  sun_exposure: number;
  temperature: number;
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

export const PlantItem = (props: Props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteHandler(event: React.MouseEvent) {
    event.preventDefault();
    const path = `/plants/${props.id}/`;

    api.delete(path);
    closeModal();
  }

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.box}>{props.id}</td>
        <td className={classes.box}>{props.created_at}</td>
        <td className={classes.box}>{props.name}</td>
        <td className={classes.box}>{props.species}</td>
        <td className={classes.box}>{props.watering_interval}</td>
        <td className={classes.box}>{props.last_watering}</td>
        <td className={classes.box}>{props.next_watering}</td>
        <td className={classes.box}>{props.watering_count}</td>
        <td className={classes.box}>{props.sun_exposure}</td>
        <td className={classes.box}>{props.temperature}</td>
        <td className={classes.box}>
          <button className={classes.button} onClick={openModal}>
            Delete
          </button>
        </td>
        <td className={classes.box}>
          <button className={classes.button}>Update</button>
        </td>
      </tr>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="delete plant modal">
        <div>Are you sure to delete plant with id={props.id}?</div>
        <form>
          <button onClick={deleteHandler}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </>
  );
};

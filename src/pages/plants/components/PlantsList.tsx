import { useState } from "react";
import { Plant, PlantAllInfo } from "../../../interfaces";

import { ModalWindowDelete } from "../layout/ModalWindowDelete";
import { ModalWindowUpdate } from "../layout/ModalWindowUpdate";

import { PlantItem } from "./PlantItem";
import classes from "./PlantsList.module.css";

interface Props {
  plants: PlantAllInfo[];
  wateringStatuses: string[];
  setWateringCounter: React.Dispatch<React.SetStateAction<number>>;
}

export const PlantsList = (props: Props) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [PlantId, setPlantId] = useState("");
  const [PlantName, setPlantName] = useState("");

  if (!props.plants || props.plants.length === 0) {
    return (
      <section>
        <p>The user don't have any plants</p>
      </section>
    );
  }

  function openModalDelete(id: string, name: string) {
    setDeleteModalIsOpen(true);
    setPlantId(id);
    setPlantName(name);
  }

  function closeModalDelete() {
    setDeleteModalIsOpen(false);
  }

  function openModalUpdate(id: string, name: string) {
    setUpdateModalIsOpen(true);
    setPlantId(id);
    setPlantName(name);
  }

  function closeModalUpdate() {
    setUpdateModalIsOpen(false);
  }

  const plantsList = props.plants.map((plant: Plant, index) => {
    return (
      <PlantItem
        key={plant.id}
        openModalDelete={openModalDelete}
        openModalUpdate={openModalUpdate}
        plant={{ ...plant, wateringStatus: props.wateringStatuses[index] }}
        setWateringCounter={props.setWateringCounter}
      ></PlantItem>
    );
  });

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr className={classes.row}>
            <th className={classes.box}>Id</th>
            <th className={classes.box}>Created at</th>
            <th className={classes.box}>Name</th>
            <th className={classes.box}>species</th>
            <th className={classes.box}>Watering interval</th>
            <th className={classes.box}>Last watering</th>
            <th className={classes.box}>Next watering</th>
            <th className={classes.box}>Watering count</th>
            <th className={classes.box}>Sun exposure</th>
            <th className={classes.box}>Temperature</th>
          </tr>
        </thead>
        <tbody>{plantsList}</tbody>
      </table>
      <ModalWindowDelete closeModalDelete={closeModalDelete} deleteModalIsOpen={deleteModalIsOpen} id={PlantId} name={PlantName} />
      <ModalWindowUpdate closeModalUpdate={closeModalUpdate} updateModalIsOpen={updateModalIsOpen} id={PlantId} name={PlantName} />
    </>
  );
};

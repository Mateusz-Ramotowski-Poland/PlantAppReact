import { useEffect, useState } from "react";
import { Plant, PlantsState } from "../../../interafces";
import { useAppSelector } from "../../../store/hooks";
import { useGetPlants } from "../hooks/useGetPlants";
import { ModalWindowDelete } from "../layout/ModalWindowDelete";
import { ModalWindowUpdate } from "../layout/ModalWindowUpdate";
import { PlantItem } from "./PlantItem";
import classes from "./PlantsList.module.css";

interface State {
  plants: PlantsState;
}

function formatData(str: string) {
  return str.slice(0, 10) + " " + str.slice(11, 19);
}

export const PlantsList = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [PlantId, setPlantId] = useState("");
  const [PlantName, setPlantName] = useState("");

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

  let { getPlants } = useGetPlants();
  const plants = useAppSelector((state: State) => state.plants.plants);

  useEffect(() => {
    if (plants.length === 0) {
      getPlants();
    }
  }, []);

  if (!plants || plants.length === 0) {
    return (
      <section>
        <p>The user don't have any plants</p>
      </section>
    );
  }
  const plantsList = plants.map((plant: Plant) => {
    const dataCreated = formatData(plant.created_at);
    const dataNextWatering = formatData(plant.next_watering);

    return (
      <PlantItem
        key={plant.id}
        id={plant.id}
        created_at={dataCreated}
        name={plant.name}
        species={plant.species}
        watering_interval={plant.watering_interval}
        last_watering={plant.last_watering}
        next_watering={dataNextWatering}
        watering_count={plant.watering_count}
        sun_exposure={plant.sun_exposure}
        temperature={plant.temperature}
        openModalDelete={openModalDelete}
        openModalUpdate={openModalUpdate}
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
      <ModalWindowDelete
        closeModalDelete={closeModalDelete}
        deleteModalIsOpen={deleteModalIsOpen}
        id={PlantId}
        name={PlantName}
      />
      <ModalWindowUpdate
        closeModalUpdate={closeModalUpdate}
        updateModalIsOpen={updateModalIsOpen}
        id={PlantId}
        name={PlantName}
      />
    </>
  );
};

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPlants } from "../../hooks/useGetPlants";
import { Plant } from "../../interafces";
import { PlantItem } from "./PlantItem";
import { PlantsState } from "../../interafces";
import { ModalWindow } from "../layout/ModalWindow";
import classes from "./PlantsList.module.css";

interface State {
  plants: PlantsState;
}

function formatData(str: string) {
  return str.slice(0, 10) + " " + str.slice(11, 19);
}

export const PlantsList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deletePlantId, setDeletePlantId] = useState("");

  function openModal(id: string) {
    setIsOpen(true);
    setDeletePlantId(id);
  }
  function closeModal() {
    setIsOpen(false);
  }

  let { getPlants } = useGetPlants();
  const plants = useSelector((state: State) => state.plants.plants); //empty redux will return undefined

  useEffect(() => {
    console.log(plants);
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
        openModal={openModal}
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
      <ModalWindow closeModal={closeModal} modalIsOpen={modalIsOpen} id={deletePlantId} />
    </>
  );
};

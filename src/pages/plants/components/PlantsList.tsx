import { useEffect, useMemo, useState } from "react";
import { Plant, PlantsState } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useGetPlants } from "../hooks/useGetPlants";
import { ModalWindowDelete } from "../layout/ModalWindowDelete";
import { ModalWindowUpdate } from "../layout/ModalWindowUpdate";
import { plantsActions } from "../store/plantsSlice";
import { getWateringStatus, sortPlantArray } from "./helpers";
import { PlantItem } from "./PlantItem";
import classes from "./PlantsList.module.css";

interface State {
  plants: PlantsState;
}

export const PlantsList = () => {
  const dispatch = useAppDispatch();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [PlantId, setPlantId] = useState("");
  const [PlantName, setPlantName] = useState("");
  const [wateringCounter, setWateringCounter] = useState(0);

  let { getPlants } = useGetPlants();
  const plants = useAppSelector((state: State) => state.plants.plants);

  const wateringStatuses: string[] = useMemo(() => {
    return plants.map((plant) => getWateringStatus(plant.next_watering));
  }, [wateringCounter]);

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

  const plantsList = plants.map((plant: Plant, index) => {
    return (
      <PlantItem
        key={plant.id}
        openModalDelete={openModalDelete}
        openModalUpdate={openModalUpdate}
        plant={{ ...plant, wateringStatus: wateringStatuses[index] }}
        setWateringCounter={setWateringCounter}
      ></PlantItem>
    );
  });

  function sortPlants(sortOrder: "descending" | "ascending", byPropertyName: "name" | "watering_interval" | "next_watering") {
    const sortedArray = sortPlantArray(plants, sortOrder, byPropertyName);
    dispatch(plantsActions.insertMany({ plants: sortedArray }));
  }

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr>
            <td>
              <button type="button" onClick={sortPlants.bind(null, "ascending", "name")}>
                Sort by name: ascending
              </button>
            </td>
            <td>
              <button type="button" onClick={sortPlants.bind(null, "descending", "name")}>
                Sort by name: descending
              </button>
            </td>
            <td>
              <button type="button" onClick={sortPlants.bind(null, "ascending", "watering_interval")}>
                Sort by watering interval: ascending
              </button>
            </td>
            <td>
              <button type="button" onClick={sortPlants.bind(null, "descending", "watering_interval")}>
                Sort by watering interval: descending
              </button>
            </td>
            <td>
              <button type="button" onClick={sortPlants.bind(null, "ascending", "next_watering")}>
                Sort by next watering: ascending
              </button>
            </td>
            <td>
              <button type="button" onClick={sortPlants.bind(null, "descending", "next_watering")}>
                Sort by next watering: descending
              </button>
            </td>
          </tr>
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

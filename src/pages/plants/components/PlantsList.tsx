import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PlantsState, RenderPlant } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useGetPlants } from "../hooks/useGetPlants";
import { ModalWindowDelete } from "../layout/ModalWindowDelete";
import { ModalWindowUpdate } from "../layout/ModalWindowUpdate";
import { plantsActions } from "../store/plantsSlice";
import { SortBy, SortOrder } from "./enums/enums";
import { sortPlantArray } from "./helpers";
import { PlantItem } from "./PlantItem";
import classes from "./PlantsList.module.css";

interface State {
  plants: PlantsState;
}

interface Props {
  plants: RenderPlant[];
  wateringStatuses: string[];
}

export const PlantsList = (props: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  let sortBy: SortBy, sortOrder: SortOrder;
  const urlSortBy = searchParams.get("sortBy");
  if (Object.values(SortBy).includes(urlSortBy as SortBy)) {
    sortBy = urlSortBy as SortBy;
  } else {
    sortBy = SortBy.name;
  }
  const urlSortOrder = searchParams.get("sortOrder");
  if (Object.values(SortOrder).includes(urlSortOrder as SortOrder)) {
    sortOrder = urlSortOrder as SortOrder;
  } else {
    sortOrder = SortOrder.ascending;
  }

  console.log(sortOrder, sortBy);

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

  const plantsList = plants.map((plant: RenderPlant) => {
    return <PlantItem key={plant.id} openModalDelete={openModalDelete} openModalUpdate={openModalUpdate} plant={plant}></PlantItem>;
  });

  function sortPlants(sortOrder: SortOrder, byPropertyName: SortBy) {
    const sortedArray = sortPlantArray(plants, sortOrder, byPropertyName);
    dispatch(plantsActions.insertMany({ plants: sortedArray }));
  }

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr className={classes.row}>
            <th className={classes.box}>Id</th>
            <th className={classes.box}>Created at</th>
            <th className={classes.box} onClick={sortPlants.bind(null, sortOrder, SortBy.name)}>
              Name⇅
            </th>
            <th className={classes.box}>species</th>
            <th className={classes.box} onClick={sortPlants.bind(null, sortOrder, SortBy.watering_interval)}>
              Watering interval⇅
            </th>
            <th className={classes.box}>Last watering</th>
            <th className={classes.box} onClick={sortPlants.bind(null, sortOrder, SortBy.next_watering)}>
              Next watering⇅
            </th>
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

// ⇈ ⇊

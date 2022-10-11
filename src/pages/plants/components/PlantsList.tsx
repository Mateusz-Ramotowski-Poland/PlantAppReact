import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RenderPlant } from "../../../interfaces";
import { useAppSelector } from "../../../store/hooks";
import { useGetPlants } from "../hooks/useGetPlants";
import { ModalWindowDelete } from "../layout/ModalWindowDelete";
import { ModalWindowUpdate } from "../layout/ModalWindowUpdate";
import { Arrow } from "./Arrow";
import { SortBy, SortOrder } from "./enums/enums";
import { sortPlantArray } from "./helpers";
import { PlantItem } from "./PlantItem";
import classes from "./PlantsList.module.css";

interface Props {}

export const PlantsList = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let sortBy: SortBy, sortOrder: SortOrder;
  Object.values(SortBy).includes(searchParams.get("sortBy") as SortBy)
    ? (sortBy = searchParams.get("sortBy") as SortBy)
    : (sortBy = SortBy.name);

  Object.values(SortOrder).includes(searchParams.get("sortOrder") as SortOrder)
    ? (sortOrder = searchParams.get("sortOrder") as SortOrder)
    : (sortOrder = SortOrder.ascending);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [PlantId, setPlantId] = useState("");
  const [plantName, setPlantName] = useState("");

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
  const plants = useAppSelector((state) => state.plants.plants);

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

  const sortedPlants = sortPlantArray(plants, sortOrder, sortBy);
  const plantsList = sortedPlants.map((plant: RenderPlant) => {
    return <PlantItem key={plant.id} openModalDelete={openModalDelete} openModalUpdate={openModalUpdate} plant={plant}></PlantItem>;
  });

  function changeSearchParams(sortBy: SortBy, event: React.MouseEvent) {
    const textContent = (event.target as HTMLTableElement).textContent as string;
    const arrowSign = textContent[0];
    let sortOrder;
    if (arrowSign === "⇈") {
      sortOrder = SortOrder.descending;
    } else {
      sortOrder = SortOrder.ascending;
    }
    setSearchParams({
      sortBy: sortBy,
      sortOrder: sortOrder,
    });

    console.log(sortBy, sortOrder);
  }

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr className={classes.row}>
            <th className={classes.box}>Id</th>
            <th className={classes.box}>Created at</th>
            <th className={classes.box} onClick={changeSearchParams.bind(null, SortBy.name)}>
              <Arrow sortBy={sortBy} sortOrder={sortOrder} header={SortBy.name} />
              Name
            </th>
            <th className={classes.box}>species</th>
            <th className={classes.box} onClick={changeSearchParams.bind(null, SortBy.watering_interval)}>
              <Arrow sortBy={sortBy} sortOrder={sortOrder} header={SortBy.watering_interval} />
              Watering interval
            </th>
            <th className={classes.box}>Last watering</th>
            <th className={classes.box} onClick={changeSearchParams.bind(null, SortBy.next_watering)}>
              <Arrow sortBy={sortBy} sortOrder={sortOrder} header={SortBy.next_watering} />
              Next watering
            </th>
            <th className={classes.box}>Watering count</th>
            <th className={classes.box}>Sun exposure</th>
            <th className={classes.box}>Temperature</th>
          </tr>
        </thead>
        <tbody>{plantsList}</tbody>
      </table>
      <ModalWindowDelete closeModalDelete={closeModalDelete} deleteModalIsOpen={deleteModalIsOpen} id={PlantId} name={plantName} />
      <ModalWindowUpdate closeModalUpdate={closeModalUpdate} updateModalIsOpen={updateModalIsOpen} id={PlantId} name={plantName} />
    </>
  );
};

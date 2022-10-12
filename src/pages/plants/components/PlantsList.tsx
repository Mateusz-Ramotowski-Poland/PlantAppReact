import { useEffect } from "react";
import { RenderPlant } from "../../../interfaces";
import { useAppSelector } from "../../../store/hooks";
import { useGetPlants, useModals, useChangeGetSearchParams } from "../hooks";
import { ModalWindowDelete } from "../layout/ModalWindowDelete";
import { ModalWindowUpdate } from "../layout/ModalWindowUpdate";
import { Arrow } from "./Arrow";
import { SortBy } from "./enums/enums";
import { sortPlantArray } from "./helpers";
import { PlantItem } from "./PlantItem";
import classes from "./PlantsList.module.css";

interface Props {}

export const PlantsList = (props: Props) => {
  const { closeModal: closeDeleteModal, openModal: openDeleteModal, modal: deleteModal } = useModals();
  const { closeModal: closeUpdateModal, openModal: openUpdateModal, modal: updateModal } = useModals();
  const { changeSearchParams, getSearchParams } = useChangeGetSearchParams();
  const { sortBy, sortOrder } = getSearchParams();
  let { getPlants } = useGetPlants();
  const plants = useAppSelector((state) => state.plants.plants);

  useEffect(() => {
    if (plants.length === 0) getPlants();
  }, []);

  if (!plants || plants.length === 0) return <p>The user don't have any plants</p>;

  const sortedPlants = sortPlantArray(plants, sortOrder, sortBy);
  const plantsList = sortedPlants.map((plant: RenderPlant) => {
    return <PlantItem key={plant.id} openModalDelete={openDeleteModal} openModalUpdate={openUpdateModal} plant={plant}></PlantItem>;
  });

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr className={classes.row}>
            <th className={classes.box}>Id</th>
            <th className={classes.box}>Created at</th>
            <th className={classes.box} onClick={changeSearchParams.bind(null, SortBy.name, sortOrder)}>
              <Arrow sortBy={sortBy} sortOrder={sortOrder} header={SortBy.name} />
              Name
            </th>
            <th className={classes.box}>species</th>
            <th className={classes.box} onClick={changeSearchParams.bind(null, SortBy.watering_interval, sortOrder)}>
              <Arrow sortBy={sortBy} sortOrder={sortOrder} header={SortBy.watering_interval} />
              Watering interval
            </th>
            <th className={classes.box}>Last watering</th>
            <th className={classes.box} onClick={changeSearchParams.bind(null, SortBy.next_watering, sortOrder)}>
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
      <ModalWindowDelete closeModalDelete={closeDeleteModal} deleteModal={deleteModal} />
      <ModalWindowUpdate closeModalUpdate={closeUpdateModal} updateModal={updateModal} />
    </>
  );
};

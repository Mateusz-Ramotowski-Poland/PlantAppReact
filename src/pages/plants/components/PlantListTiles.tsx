import { useEffect } from "react";
import { RenderPlant } from "../../../interfaces";
import { useAppSelector } from "../../../store/hooks";
import { useGetPlants, useModals } from "../hooks";
import { UpdateDeleteWindow } from "../interfaces/interfaces";
import { ModalWindowDelete } from "../layout/ModalWindowDelete";
import { ModalWindowUpdate } from "../layout/ModalWindowUpdate";
import { PlantItemTile } from "./PlantItemTile";
import classes from "./PlantListTiles.module.css";

interface Props {}

export const PlantListTiles = (props: Props) => {
  const {
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
    modal: deleteModal,
  } = useModals<UpdateDeleteWindow>({ data: { id: "", name: "" } });
  const {
    closeModal: closeUpdateModal,
    openModal: openUpdateModal,
    modal: updateModal,
  } = useModals<UpdateDeleteWindow>({ data: { id: "", name: "" } });
  let { getPlants } = useGetPlants();
  const plants = useAppSelector((state) => state.plants.plants);

  useEffect(() => {
    if (plants.length === 0) getPlants();
  }, []);

  if (!plants || plants.length === 0) return <p>The user don't have any plants</p>;

  const plantsList = plants.map((plant: RenderPlant) => {
    return <PlantItemTile key={plant.id} openModalDelete={openDeleteModal} openModalUpdate={openUpdateModal} plant={plant}></PlantItemTile>;
  });

  return (
    <>
      <h1 className={classes.title}>Your plants</h1>
      <div className={classes.container}>{plantsList}</div>
      <ModalWindowDelete closeModalDelete={closeDeleteModal} deleteModal={deleteModal} />
      <ModalWindowUpdate closeModalUpdate={closeUpdateModal} updateModal={updateModal} />
    </>
  );
};

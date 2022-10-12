import { useEffect } from "react";
import { RenderPlant } from "../../../interfaces";
import { useAppSelector } from "../../../store/hooks";
import { useGetPlants, useModals } from "../hooks";
import { PlantItemTile } from "./PlantItemTile";

interface Props {}

export const PlantListTiles = (props: Props) => {
  const { closeModal: closeDeleteModal, openModal: openDeleteModal, modal: deleteModal } = useModals();
  const { closeModal: closeUpdateModal, openModal: openUpdateModal, modal: updateModal } = useModals();
  let { getPlants } = useGetPlants();
  const plants = useAppSelector((state) => state.plants.plants);

  useEffect(() => {
    if (plants.length === 0) getPlants();
  }, []);

  if (!plants || plants.length === 0) return <p>The user don't have any plants</p>;

  const plantsList = plants.map((plant: RenderPlant) => {
    return <PlantItemTile key={plant.id} openModalDelete={openDeleteModal} openModalUpdate={openUpdateModal} plant={plant}></PlantItemTile>;
  });

  return <>{plantsList}</>;
};

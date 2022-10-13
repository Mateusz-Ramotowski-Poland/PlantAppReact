import { RenderPlant } from "../../../interfaces";
import { useAppDispatch } from "../../../store/hooks";
import { UpdateDeleteWindow } from "../interfaces/interfaces";
import { waterPlant } from "../store/plantsSlice";
import { formatPlantDates } from "./helpers";
import classes from "./PlantItemTile.module.css";

interface Props {
  plant: RenderPlant;
  openModalDelete: (data?: UpdateDeleteWindow) => void;
  openModalUpdate: (data?: UpdateDeleteWindow) => void;
}

export const PlantItemTile = (props: Props) => {
  const dispatch = useAppDispatch();
  const { plant } = props;
  const { created, nextWatering, lastWatering } = formatPlantDates({
    created: plant.created_at,
    lastWatering: plant.last_watering,
    nextWatering: plant.next_watering,
  });

  const clickDeleteHandler = () => props.openModalDelete({ id: plant.id, name: plant.name });
  const clickUpdateHandler = () => props.openModalUpdate({ id: plant.id, name: plant.name });
  const clickWateredHandler = () => dispatch(waterPlant(plant.id));

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>
          {plant.species} - {plant.name}
        </p>
      </div>
      <div className={classes.main}>
        <div className={classes.leftMain}>
          <p>Created: {created}</p>
          <p>Next watering: {nextWatering}</p>
          <p>Last watering: {lastWatering}</p>
          <p>Watering interval: {plant.watering_interval}</p>
        </div>
        <div className={classes.rightMain}>
          <p>Id: {plant.id}</p>
          <p>Watering count: {plant.watering_count}</p>
          <p>Sun exposure: {plant.sun_exposure}</p>
          <p>Temperature: {plant.temperature}</p>
        </div>
      </div>
      <div className={classes.buttons}>
        <button type="button" className={classes.button} onClick={clickDeleteHandler}>
          Delete
        </button>
        <button type="button" className={classes.button} onClick={clickUpdateHandler}>
          Update
        </button>
        <button type="button" className={classes.button} onClick={clickWateredHandler}>
          Set as watered
        </button>
      </div>
    </div>
  );
};

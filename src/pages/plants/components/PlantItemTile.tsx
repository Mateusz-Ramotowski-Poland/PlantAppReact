import { useAppDispatch } from "../../../store/hooks";
import { PlantItemProps } from "../interfaces/interfaces";
import { waterPlant } from "../store/plantsSlice";
import { formatPlantDates } from "./helpers";
import classes from "./PlantItemTile.module.css";

export const PlantItemTile = (props: PlantItemProps) => {
  const dispatch = useAppDispatch();
  // prettier-ignore
  const {id, created_at, name, species, watering_interval, last_watering, next_watering, watering_count, sun_exposure, temperature, wateringStatus,} = props.plant;
  // prettier-ignore
  const { created, nextWatering, lastWatering } = formatPlantDates({created: created_at, lastWatering: last_watering, nextWatering: next_watering });

  const clickDeleteHandler = () => props.openModalDelete(id, { plantName: name });
  const clickUpdateHandler = () => props.openModalUpdate(id, { plantName: name });
  const clickWateredHandler = () => dispatch(waterPlant(id));

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>
          {species} - {name}
        </p>
      </div>
      <div className={classes.main}>
        <div className={classes.leftMain}>
          <p>Created: {created}</p>
          <p>Next watering: {nextWatering}</p>
          <p>Last watering: {lastWatering}</p>
          <p>Watering interval: {watering_interval}</p>
        </div>
        <div className={classes.rightMain}>
          <p>Id: {id}</p>
          <p>Watering count: {watering_count}</p>
          <p>Sun exposure: {sun_exposure}</p>
          <p>Temperature: {temperature}</p>
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

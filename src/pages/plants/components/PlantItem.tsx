import { useAppDispatch } from "../../../store/hooks";
import { PlantItemProps } from "../interfaces/interfaces";
import { waterPlant } from "../store/plantsSlice";
import { formatPlantDates } from "./helpers";
import classes from "./PlantItem.module.css";

export const PlantItem = (props: PlantItemProps) => {
  // prettier-ignore
  const {id, created_at, name, species, watering_interval, last_watering, next_watering, watering_count, sun_exposure, temperature, wateringStatus,} = props.plant;
  const dispatch = useAppDispatch();

  const clickDeleteHandler = () => props.openModalDelete(id, { plantName: name });
  const clickUpdateHandler = () => props.openModalUpdate(id, { plantName: name });
  const clickWateredHandler = () => dispatch(waterPlant(id));

  // prettier-ignore
  const { created, nextWatering, lastWatering } = formatPlantDates({created: created_at, lastWatering: last_watering, nextWatering: next_watering });

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.box}>{id}</td>
        <td className={classes.box}>{created}</td>
        <td className={classes.box}>{name}</td>
        <td className={classes.box}>{species}</td>
        <td className={classes.box}>{watering_interval}</td>
        <td className={classes.box}>{lastWatering}</td>
        <td className={`${classes.box} ${classes[wateringStatus as string]}`}>{nextWatering}</td>
        <td className={classes.box}>{watering_count}</td>
        <td className={classes.box}>{sun_exposure}</td>
        <td className={classes.box}>{temperature}</td>
        <td className={classes.box}>
          <button type="button" className={classes.button} onClick={clickDeleteHandler}>
            Delete
          </button>
        </td>
        <td className={classes.box}>
          <button type="button" className={classes.button} onClick={clickUpdateHandler}>
            Update
          </button>
        </td>
        <td>
          <button type="button" className={classes.button} onClick={clickWateredHandler}>
            Set as watered
          </button>
        </td>
      </tr>
    </>
  );
};

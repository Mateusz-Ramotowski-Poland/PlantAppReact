import { Plant } from "../../../interfaces";
import { useAppDispatch } from "../../../store/hooks";
import { waterPlant } from "../store/plantsSlice";
import classes from "./PlantItem.module.css";

interface Props {
  plant: Plant;
  openModalDelete: (id: string, name: string) => void;
  openModalUpdate: (id: string, name: string) => void;
}

export const PlantItem = (props: Props) => {
  // prettier-ignore
  const {id, created_at, name, species, watering_interval, last_watering, next_watering, watering_count, sun_exposure, temperature, wateringStatus,} = props.plant;
  const dispatch = useAppDispatch();

  function clickDeleteHandler() {
    props.openModalDelete(id, name);
  }

  function clickUpdateHandler() {
    props.openModalUpdate(id, name);
  }

  function clickWateredHandler() {
    dispatch(waterPlant(id));
  }

  function formatData(str: string) {
    return str.slice(0, 10) + " " + str.slice(11, 19);
  }

  const createdAt = created_at ? formatData(created_at) : created_at;
  const nextWatering = next_watering ? formatData(next_watering) : next_watering;
  const lastWatering = last_watering ? formatData(last_watering) : last_watering;

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.box}>{id}</td>
        <td className={classes.box}>{createdAt}</td>
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

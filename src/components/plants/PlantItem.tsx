import { useAppDispatch } from "../../store/hooks";
import { waterPlant } from "../../store/plantsSlice";
import classes from "./PlantItem.module.css";

interface Props {
  id: string;
  created_at: string;
  name: string;
  species: string;
  watering_interval: number;
  last_watering: string;
  next_watering: string;
  watering_count: string;
  sun_exposure: number;
  temperature: number;
  openModalDelete: (id: string) => void;
  openModalUpdate: (id: string) => void;
}

export const PlantItem = (props: Props) => {
  const dispatch = useAppDispatch();

  function clickDeleteHandler() {
    props.openModalDelete(props.id);
  }

  function clickUpdateHandler() {
    props.openModalUpdate(props.id);
  }

  function clickWateredHandler() {
    const path = `/plants/${props.id}/water/`;
    dispatch(waterPlant(path, props.id));
  }

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.box}>{props.id}</td>
        <td className={classes.box}>{props.created_at}</td>
        <td className={classes.box}>{props.name}</td>
        <td className={classes.box}>{props.species}</td>
        <td className={classes.box}>{props.watering_interval}</td>
        <td className={classes.box}>{props.last_watering}</td>
        <td className={classes.box}>{props.next_watering}</td>
        <td className={classes.box}>{props.watering_count}</td>
        <td className={classes.box}>{props.sun_exposure}</td>
        <td className={classes.box}>{props.temperature}</td>
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

import { RenderPlant } from "../../../interfaces";
import { useAppDispatch } from "../../../store/hooks";
import { UpdateDeleteWindow } from "../interfaces/interfaces";
import { waterPlant } from "../store/plantsSlice";
import { formatPlantDates } from "./helpers";
import classes from "./PlantItem.module.css";

interface Props {
  plant: RenderPlant;
  openModalDelete: (data: UpdateDeleteWindow) => void;
  openModalUpdate: (data: UpdateDeleteWindow) => void;
}

export const PlantItem = (props: Props) => {
  const { plant } = props;
  const dispatch = useAppDispatch();
  const { created, nextWatering, lastWatering } = formatPlantDates({
    created: plant.created_at,
    lastWatering: plant.last_watering,
    nextWatering: plant.next_watering,
  });

  const clickDeleteHandler = () => props.openModalDelete({ id: plant.id, name: plant.name });
  const clickUpdateHandler = () => props.openModalUpdate({ id: plant.id, name: plant.name });
  const clickWateredHandler = () => dispatch(waterPlant(plant.id));

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.box}>{plant.id}</td>
        <td className={classes.box}>{created}</td>
        <td className={classes.box}>{plant.name}</td>
        <td className={classes.box}>{plant.species}</td>
        <td className={classes.box}>{plant.watering_interval}</td>
        <td className={classes.box}>{lastWatering}</td>
        <td className={`${classes.box} ${classes[plant.wateringStatus as string]}`}>{nextWatering}</td>
        <td className={classes.box}>{plant.watering_count}</td>
        <td className={classes.box}>{plant.sun_exposure}</td>
        <td className={classes.box}>{plant.temperature}</td>
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

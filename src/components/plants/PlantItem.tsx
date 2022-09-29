import classes from "./PlantItem.module.css";

export const PlantItem = (props: any) => {
  return (
    <tr data-id={props.id} className={classes.row}>
      <td className={classes.box}>{props.created_at}</td>
      <td className={classes.box}>{props.name}</td>
      <td className={classes.box}>{props.species}</td>
      <td className={classes.box}>{props.watering_interval}</td>
      <td className={classes.box}>{props.last_watering}</td>
      <td className={classes.box}>{props.next_watering}</td>
      <td className={classes.box}>{props.watering_count}</td>
      <td className={classes.box}>{props.sun_exposure}</td>
      <td className={classes.box}>{props.temperature}</td>
    </tr>
  );
};

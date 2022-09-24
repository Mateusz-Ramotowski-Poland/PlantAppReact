export const PlantItem = (props: any) => {
  return (
    <tr data-id={props.id}>
      <td>{props.created_at}</td>
      <td>{props.name}</td>
      <td>{props.species}</td>
      <td>{props.watering_interval}</td>
      <td>{props.last_watering}</td>
      <td>{props.next_watering}</td>
      <td>{props.watering_count}</td>
      <td>{props.sun_exposure}</td>
      <td>{props.temperature}</td>
    </tr>
  );
};

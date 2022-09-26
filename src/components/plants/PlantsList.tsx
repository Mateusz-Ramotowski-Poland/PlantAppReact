import { Plant } from "../../interafces";
import { PlantItem } from "./PlantItem";

interface Props {
  isLoading: boolean;
  httpError: string | undefined;
  plants: Plant[];
}

export const PlantsList = (props: Props) => {
  if (props.isLoading) {
    return (
      <section>
        <p>Plants are loading</p>
      </section>
    );
  }

  if (props.httpError) {
    return (
      <section>
        <p>{props.httpError}</p>
      </section>
    );
  }

  if (props.plants.length === 0) {
    return (
      <section>
        <p>The user don't have any plants</p>
      </section>
    );
  }

  const plantsList = props.plants.map((plant: any) => (
    <PlantItem
      key={plant.id}
      id={plant.id}
      created_at={plant.created_at}
      name={plant.name}
      species={plant.species}
      watering_interval={plant.watering_interval}
      last_watering={plant.last_watering}
      next_watering={plant.next_watering}
      watering_count={plant.watering_count}
      sun_exposure={plant.sun_exposure}
      temperature={plant.temperature}
    ></PlantItem>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Created at</th>
          <th>Name</th>
          <th>species</th>
          <th>Watering interval</th>
          <th>Last watering</th>
          <th>Next watering</th>
          <th>Watering count</th>
          <th>Sun exposure</th>
          <th>Temperature</th>
        </tr>
      </thead>
      <tbody>{plantsList}</tbody>
    </table>
  );
};

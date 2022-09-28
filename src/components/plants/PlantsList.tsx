import { useSelector } from "react-redux";
import { Plant } from "../../interafces";
import { PlantItem } from "./PlantItem";

export const PlantsList = () => {
  const plants = useSelector((state: any) => state.plants.plants);
  console.log(plants);

  if (plants.length === 0) {
    return (
      <section>
        <p>The user don't have any plants</p>
      </section>
    );
  }

  const plantsList = plants.map((plant: Plant) => (
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

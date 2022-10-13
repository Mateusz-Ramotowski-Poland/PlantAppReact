import dayjs from "dayjs";

interface PlantDates {
  created: string;
  nextWatering: string;
  lastWatering: string;
}

export function formatPlantDates({ created, nextWatering, lastWatering }: PlantDates) {
  created = created ? dayjs(created).format("YYYY-MM-DD") : created;
  nextWatering = nextWatering ? dayjs(nextWatering).format("YYYY-MM-DD HH:mm") : nextWatering;
  lastWatering = lastWatering ? dayjs(lastWatering).format("YYYY-MM-DD HH:mm") : lastWatering;

  return { created, nextWatering, lastWatering };
}

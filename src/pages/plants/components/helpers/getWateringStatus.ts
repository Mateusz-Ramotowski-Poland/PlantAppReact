export const getWateringStatus = (nextWatering: string): string => {
  console.log("getWateringStatus runed");
  const nowMiliSeconds = Date.now();
  const nextWateringMiliseconds = Date.parse(new Date(nextWatering).toString());
  const difference = nextWateringMiliseconds - nowMiliSeconds;
  if (difference < 24 * 60 * 60 * 1000) {
    return "wateringAlarm";
  } else if (difference < 3 * 24 * 60 * 60 * 1000) {
    return "wateringWarning";
  } else {
    return "wateringOk";
  }
};

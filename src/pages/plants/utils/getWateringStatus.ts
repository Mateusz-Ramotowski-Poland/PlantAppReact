enum WateringStatuses {
  alarm = "wateringAlarm",
  warning = "wateringWarning",
  ok = "wateringOk",
}

export const getWateringStatus = (nextWatering: string) => {
  console.log("getWateringStatus runed");
  const nowMiliSeconds = new Date();
  const nextWateringMiliseconds = new Date(nextWatering);
  const difference = Number(nextWateringMiliseconds) - Number(nowMiliSeconds);
  if (difference < 24 * 60 * 60 * 1000) {
    return WateringStatuses.alarm;
  } else if (difference < 3 * 24 * 60 * 60 * 1000) {
    return WateringStatuses.warning;
  } else {
    return WateringStatuses.ok;
  }
};

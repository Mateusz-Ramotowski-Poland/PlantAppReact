import dayjs from "dayjs";

export const getWateringStatus = (nextWatering: string) => {
  const nowMiliSeconds = dayjs();
  const nextWateringMiliseconds = dayjs(nextWatering);
  const difference = Number(nextWateringMiliseconds) - Number(nowMiliSeconds);
  if (difference < 24 * 60 * 60 * 1000) {
    return "wateringAlarm";
  } else if (difference < 3 * 24 * 60 * 60 * 1000) {
    return "wateringWarning";
  } else {
    return "wateringOk";
  }
};

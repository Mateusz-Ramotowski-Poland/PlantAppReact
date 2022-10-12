import { RenderPlant } from "../../../../interfaces";
import { SortBy, SortOrder } from "../enums/enums";

export function sortPlantArray(array: RenderPlant[], sortOrder: SortOrder | null, byPropertyName: SortBy | null) {
  if (byPropertyName === null || sortOrder === null) return array;

  const deepCopyOfArray: RenderPlant[] = JSON.parse(JSON.stringify(array)) ?? [];
  return deepCopyOfArray.sort(function (a, b) {
    let aProperty = a[byPropertyName];
    let bProperty = b[byPropertyName];

    if (byPropertyName !== "watering_interval") {
      aProperty = a[byPropertyName]?.toUpperCase();
      bProperty = b[byPropertyName]?.toUpperCase();
    }

    if (sortOrder === "descending") {
      if (aProperty > bProperty) return -1;
      if (aProperty < bProperty) return 1;
      return 0;
    }

    if (sortOrder === "ascending") {
      if (aProperty < bProperty) return -1;
      if (aProperty > bProperty) return 1;
      return 0;
    }

    return 0;
  });
}

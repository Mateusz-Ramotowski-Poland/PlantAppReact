import { RenderPlant } from "../../../interfaces";

export interface PaginatedList<ListItem> {
  results: ListItem[];
  count: number;
  next: string;
  prev: string;
}
export interface PlantItemProps {
  plant: RenderPlant;
  openModalDelete: (id: string, data: object) => void;
  openModalUpdate: (id: string, data: object) => void;
}

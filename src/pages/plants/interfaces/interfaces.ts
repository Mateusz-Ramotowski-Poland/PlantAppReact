import { RenderPlant } from "../../../interfaces";

export interface PaginatedList<ListItem> {
  results: ListItem[];
  count: number;
  next: string;
  prev: string;
}

export interface UpdateDeleteWindow {
  id: string;
  name?: string;
}

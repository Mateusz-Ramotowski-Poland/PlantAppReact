export interface PaginatedList<ListItem> {
  results: ListItem[];
  count: number;
  next: string;
  prev: string;
}

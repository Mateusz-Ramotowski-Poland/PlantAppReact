import { SortBy, SortOrder } from "./enums/enums";

interface Props {
  sortBy: SortBy;
  sortOrder: SortOrder;
  header: SortBy;
}

export const Arrow = (props: Props) => {
  const { sortBy, sortOrder, header } = props;
  let arrow;

  if (sortBy !== header) {
    arrow = "⇅";
  }
  if (sortBy === header) {
    arrow = sortOrder === SortOrder.ascending ? "⇈" : "⇊";
  }

  return <>{arrow}</>;
};

//⇅ ⇈ ⇊

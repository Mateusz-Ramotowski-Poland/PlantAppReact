import { useSearchParams } from "react-router-dom";
import { SortBy, SortOrder } from "../components/enums/enums";

export function useChangeGetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function changeSearchParams(sortBy: SortBy, sortOrder: SortOrder | null, event: React.MouseEvent) {
    if (sortOrder === SortOrder.ascending) {
      sortOrder = SortOrder.descending;
    } else {
      sortOrder = SortOrder.ascending;
    }
    setSearchParams({
      sortBy: sortBy,
      sortOrder: sortOrder,
    });
  }

  function getSearchParams() {
    let sortBy: SortBy | null, sortOrder: SortOrder | null;
    Object.values(SortBy).includes(searchParams.get("sortBy") as SortBy)
      ? (sortBy = searchParams.get("sortBy") as SortBy)
      : (sortBy = null);

    Object.values(SortOrder).includes(searchParams.get("sortOrder") as SortOrder)
      ? (sortOrder = searchParams.get("sortOrder") as SortOrder)
      : (sortOrder = null);

    return { sortBy, sortOrder };
  }

  return { searchParams, changeSearchParams, getSearchParams };
}

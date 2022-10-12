import { useSearchParams } from "react-router-dom";
import { SortBy, SortOrder } from "../components/enums/enums";

export function useChangeGetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function changeSearchParams(sortBy: SortBy, event: React.MouseEvent) {
    const textContent = (event.target as HTMLTableElement).textContent as string;
    const arrowSign = textContent[0];
    let sortOrder;
    if (arrowSign === "⇈") {
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
    let sortBy: SortBy, sortOrder: SortOrder;
    Object.values(SortBy).includes(searchParams.get("sortBy") as SortBy)
      ? (sortBy = searchParams.get("sortBy") as SortBy)
      : (sortBy = SortBy.none);

    Object.values(SortOrder).includes(searchParams.get("sortOrder") as SortOrder)
      ? (sortOrder = searchParams.get("sortOrder") as SortOrder)
      : (sortOrder = SortOrder.none);

    return { sortBy, sortOrder };
  }

  return { searchParams, changeSearchParams, getSearchParams };
}

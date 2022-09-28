import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetPlants } from "../hooks/useGetPlants";

export const AfterLoginPage = () => {
  const navigate = useNavigate();
  const { getPlants, isFetchDataError, isDataLoading } = useGetPlants();

  function goToPage() {
    navigate("/logged/showPlants");
  }

  useEffect(() => getPlants, []);

  return (
    <>
      <h1>Welcome!</h1>
      {!isFetchDataError && isDataLoading && <p>Page is loading</p>}
      {isFetchDataError && <p>Fetching data error</p>}
      {isFetchDataError && <button onClick={getPlants}>Download plants again</button>}
      {isFetchDataError && <button onClick={goToPage}>Go to page</button>}
      <ToastContainer />
    </>
  );
};

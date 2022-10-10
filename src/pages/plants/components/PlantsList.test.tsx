import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { api, getUserData } from "../../../shared/api";
import { getAllUserPlants } from "../api/getAllUserPlants";
import { rootStore } from "../../../store/rootStore";
import { AuthContextProvider } from "../../../store/authContext";
import { PlantsList } from "./PlantsList";
import { ShowPlantsPage } from "../ShowPlantsPage";

jest.mock("../../../shared/api", () => {
  return {
    getUserData: jest.fn(),
  };
});

jest.mock("../api/getAllUserPlants", () => {
  return {
    getAllUserPlants: jest.fn(),
  };
});

/* describe("delete plant tests", () => {
  let remove: jest.SpyInstance;
  const userExample = { id: "53" };
  const plantsExample = {
    results: [
      {
        author: "http://localhost:8000/accounts/users/53/",
        created_at: "2022-09-30T08:25:57.896772",
        id: 136,
        last_watering: null,
        name: "1",
        next_watering: "2022-09-30T10:21:19.187824",
        species: "1",
        sun_exposure: 1,
        temperature: 1,
        url: "http://localhost:8000/plants/136/",
        water: "http://localhost:8000/plants/136/water/",
        watering_count: 0,
        watering_interval: 1,
      },
    ],
  };

  beforeEach(async () => {
    (getUserData as jest.Mock).mockImplementation(() => {
      return Promise.resolve(userExample);
    });
    (getAllUserPlants as jest.Mock).mockImplementation(() => {
      return Promise.resolve(plantsExample);
    });
    render(
      <Provider store={rootStore}>
        <BrowserRouter>
          <AuthContextProvider>
            <ShowPlantsPage>
              <PlantsList />
            </ShowPlantsPage>
          </AuthContextProvider>
        </BrowserRouter>
      </Provider>
    );
    const deleteButton = await screen.findByRole("button", { name: "Delete" });
    userEvent.click(deleteButton);
  });

  test("click delete - show modal window", () => {
    expect(screen.getByText("Are you sure to delete plant with id=136?")).toBeInTheDocument();
  });

  test("click delete - delete plant", async () => {
    remove = jest.spyOn(api, "delete").mockImplementation(() => {
      return Promise.resolve();
    });

    const deletePLantButton = await screen.findByRole("button", { name: "Delete plant" });
    userEvent.click(deletePLantButton);
    expect(await screen.findByText("The user don't have any plants")).toBeInTheDocument();
  });
}); */

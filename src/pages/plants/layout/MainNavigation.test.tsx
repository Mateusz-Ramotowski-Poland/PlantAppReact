import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthContextProvider } from "../../../store/authContext";
import { rootStore } from "../../../store/rootStore";
import { MainNavigation } from "./MainNavigation";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("test logout button", () => {
  render(
    <BrowserRouter>
      <Provider store={rootStore}>
        <AuthContextProvider>
          <MainNavigation />
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  );

  <MainNavigation />;

  userEvent.click(screen.getByRole("button", { name: "Logout" }));
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/");

  mockedUsedNavigate.mockClear();
});

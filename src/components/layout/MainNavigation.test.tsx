import { MainNavigation } from "./MainNavigation";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContextProvider } from "../../store/authContext";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

test("test logout button", () => {
  render(
    <AuthContextProvider>
      <MainNavigation />
    </AuthContextProvider>
  );

  userEvent.click(screen.getByRole("button", { name: "Logout" }));
  console.log("mockedUsedNavigate", mockedUsedNavigate.mock.calls);
  // console.log("useNavigate", (useNavigate as jest.Mock).mock.calls);
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/");

  mockedUsedNavigate.mockClear();
});

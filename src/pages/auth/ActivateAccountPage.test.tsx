import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { showMessage, api } from "../../shared";
import { ActivateAccountPage } from "./ActivateAccountPage";

jest.mock("../../shared", () => {
  const originalModule = jest.requireActual("../../shared");

  return {
    __esModule: true,
    ...originalModule,
    showMessage: jest.fn(),
  };
});

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("activate account tests", () => {
  let post: jest.SpyInstance;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <ActivateAccountPage />
      </BrowserRouter>
    );
  });

  test("navigate page after activation", async () => {
    post = jest.spyOn(api, "post").mockImplementation(() => {
      return Promise.resolve();
    });
    userEvent.click(screen.getByRole("button", { name: "Click to activate" }));
    await waitFor(() => {
      expect(mockedUsedNavigate as jest.Mock).toHaveBeenCalledWith("/");
    });
  });

  test("show error message after unsuccessful activation", async () => {
    post = jest.spyOn(api, "post").mockImplementation(() => {
      return Promise.reject(100);
    });

    userEvent.click(screen.getByRole("button", { name: "Click to activate" }));
    await waitFor(() => {
      expect(showMessage as jest.Mock).toHaveBeenCalledWith(100, "error");
    });
  });
});

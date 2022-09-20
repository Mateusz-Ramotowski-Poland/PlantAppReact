import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { fetchDataPost, showMessage } from "../shared";
import { ActivateAccountPage } from "./ActivateAccountPage";

jest.mock("../shared", () => ({
  fetchDataPost: jest.fn(),
  showMessage: jest.fn(),
}));
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("activate account tests", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ActivateAccountPage />
      </BrowserRouter>
    );
  });

  test("navigate page after activation", async () => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
      return Promise.resolve();
    });
    userEvent.click(screen.getByRole("button", { name: "Click to activate" }));
    await waitFor(() => {
      expect(mockedUsedNavigate as jest.Mock).toHaveBeenNthCalledWith(1, "/");
    });
  });

  test("show error message after unsuccessful activation", async () => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
      return Promise.reject(100);
    });

    userEvent.click(screen.getByRole("button", { name: "Click to activate" }));
    await waitFor(() => {
      expect(showMessage as jest.Mock).toHaveBeenNthCalledWith(1, 100, "error");
    });
  });
});

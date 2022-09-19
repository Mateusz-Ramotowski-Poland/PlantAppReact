import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { fetchDataPost, showMessage } from "../../functions";
import { CreateAccountForm } from "./CreateAccountForm";

jest.mock("../../functions", () => {
  const originalModule = jest.requireActual("../../functions");

  return {
    __esModule: true,
    ...originalModule,
    fetchDataPost: jest.fn(),
    showMessage: jest.fn(),
  };
});

describe("create account test", () => {
  const username = "admin";
  const password = "password";
  const email = "mateusz.ramotowski@profil-software.com";
  const differentPassword = "differentPassword";

  beforeEach(() => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
      return Promise.resolve();
    });

    render(
      <BrowserRouter>
        <CreateAccountForm />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId("username"), username);
    userEvent.type(screen.getByTestId("password"), password);
    userEvent.type(screen.getByTestId("confirm-password"), password);
    userEvent.type(screen.getByTestId("email"), email);
  });

  test("create account request with credentials from inputs", () => {
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(fetchDataPost as jest.Mock).toHaveBeenNthCalledWith(
      1,
      "/accounts/users/",
      { username: username, password: password, email: email }
    );
  });
  test("When password and confirm-password differs: see arror and can not send request", () => {
    userEvent.type(screen.getByTestId("confirm-password"), differentPassword);
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(
      screen.getByText("Password and confirm password don't match")
    ).toBeInTheDocument();
    expect(fetchDataPost as jest.Mock).not.toHaveBeenCalled();
  });

  test("show message after create new account", async () => {
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(showMessage as jest.Mock).toHaveBeenNthCalledWith(
        1,
        "New account was created!",
        "info"
      );
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CreateAccountForm } from "./CreateAccountForm";
import { showMessage } from "../../shared";
import { api } from "../../shared";

jest.mock("../../shared", () => {
  const originalModule = jest.requireActual("../../shared");

  return {
    __esModule: true,
    ...originalModule,
    showMessage: jest.fn(),
  };
});

describe("create account test", () => {
  let post: jest.SpyInstance;
  const username = "admin";
  const password = "password";
  const email = "mateusz.ramotowski@profil-software.com";
  const differentPassword = "differentPassword";

  beforeEach(() => {
    post = jest.spyOn(api, "post").mockImplementation(() => {
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

    expect(post).toHaveBeenCalledWith("/accounts/users/", {
      username: username,
      password: password,
      email: email,
    });
  });
  test("When password and confirm-password differs: see arror and can not send request", () => {
    userEvent.type(screen.getByTestId("confirm-password"), differentPassword);
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(screen.getByText("Passwod and confirm passsword mismatch")).toBeInTheDocument();
    expect(post).not.toHaveBeenCalled();
  });

  test("show message after create new account", async () => {
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(showMessage as jest.Mock).toHaveBeenCalledWith("New account was created!", "info");
    });
  });
});

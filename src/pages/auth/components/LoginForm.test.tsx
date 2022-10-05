import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { api } from "../../../shared";
import { BrowserRouter } from "react-router-dom";

const mockedUseLogin = jest.fn();
jest.mock("../../hooks/useLogin", () => ({
  useLogin: () => mockedUseLogin,
}));

describe("login tests", () => {
  let post: jest.SpyInstance;
  const username = "admin";
  const password = "pass";

  beforeEach(() => {
    post = jest.spyOn(api, "post").mockImplementation(() => {
      return Promise.resolve();
    });
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId("username"), username);
    userEvent.type(screen.getByTestId("password"), password);
  });

  test("check if login with credentials from inputs", () => {
    userEvent.click(screen.getByRole("button"));
    expect(post).toHaveBeenCalledWith("/accounts/jwt/create", {
      username,
      password,
    });
  });

  test("api.post function was called", () => {
    userEvent.click(screen.getByRole("button"));
    expect(post as jest.Mock).toHaveBeenCalledWith("/accounts/jwt/create", {
      username,
      password,
    });
  });

  test("login with wrong credentials", async () => {
    post = jest.spyOn(api, "post").mockImplementation(() => {
      return Promise.reject(new Error("wrong credentials"));
    });
    userEvent.click(screen.getByRole("button", { name: "Login" }));
    const alertElement = await screen.findByText("Wrong credentials for loggin");
    expect(alertElement).toBeInTheDocument();
  });

  test("login function was called", async () => {
    userEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(post).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockedUseLogin).toHaveBeenCalled();
    });
  });
});

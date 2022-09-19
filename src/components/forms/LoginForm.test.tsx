import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { fetchDataPost } from "../../shared";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../functions", () => ({
  fetchDataPost: jest.fn(),
}));
const mockedUseLogin = jest.fn();
jest.mock("../../hooks/useLogin", () => ({
  useLogin: () => mockedUseLogin,
}));

describe("login tests", () => {
  const username = "admin";
  const password = "pass";

  beforeEach(() => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
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
    expect(fetchDataPost as jest.Mock).toHaveBeenNthCalledWith(
      1,
      "/accounts/jwt/create",
      { username, password }
    );
  });

  test("fetchDataPost function was called", () => {
    userEvent.click(screen.getByRole("button"));
    expect(fetchDataPost as jest.Mock).toHaveBeenNthCalledWith(
      1,
      "/accounts/jwt/create",
      { username, password }
    );
  });

  test("login with wrong credentials", async () => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
      return Promise.reject(new Error("wrong credentials"));
    });
    userEvent.click(screen.getByRole("button", { name: "Login" }));
    const alertElement = await screen.findByText(
      "Wrong credentials for loggin"
    );
    expect(alertElement).toBeInTheDocument();
  });

  test("login function was called", async () => {
    userEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(fetchDataPost as jest.Mock).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockedUseLogin).toHaveBeenCalled();
    });
  });
});

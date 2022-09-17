import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { fetchDataPost } from "../../functions";

jest.mock("../../functions", () => ({
  fetchDataPost: jest.fn(),
}));

const mockedUseLogin = jest.fn();

jest.mock("../../hooks/useLogin", () => ({
  useLogin: () => mockedUseLogin,
}));

describe("login tests", () => {
  beforeEach(() => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
      return Promise.resolve();
    });
  });

  test("check if login with credentials from inputs", () => {
    const username = "admin";
    const password = "pass";

    const { debug } = render(<LoginForm />);

    userEvent.type(screen.getByTestId("username"), username);
    userEvent.type(screen.getByTestId("password"), password);
    userEvent.click(screen.getByRole("button"));

    expect(fetchDataPost as jest.Mock).toHaveBeenNthCalledWith(
      1,
      "/accounts/jwt/create",
      { username, password }
    );
  });

  test("fetchDataPost function was called", () => {
    const username = "admin";
    const password = "pass";

    render(<LoginForm />);

    userEvent.type(screen.getByTestId("username"), username);
    userEvent.type(screen.getByTestId("password"), password);
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
    render(<LoginForm />);

    userEvent.type(screen.getByTestId("username"), "1");
    userEvent.type(screen.getByTestId("password"), "1");
    userEvent.click(screen.getByRole("button", { name: "Login" }));

    const alertElement = await screen.findByText(
      "Wrong credentials for loggin"
    );

    expect(alertElement).toBeInTheDocument();
  });

  test("login function was called", async () => {
    render(<LoginForm />);

    userEvent.type(screen.getByTestId("username"), "1");
    userEvent.type(screen.getByTestId("password"), "1");
    userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(fetchDataPost as jest.Mock).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockedUseLogin).toHaveBeenCalled();
    });
  });
});

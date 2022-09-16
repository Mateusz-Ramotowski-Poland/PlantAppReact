import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { fetchDataPost } from "../../functions";
import { debug } from "console";

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

  test("check if login function was called", () => {
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

describe("create account test", () => {
  beforeEach(() => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
      return Promise.resolve({ access: "dummyData", refresh: "dummyData" });
    });

    const username = "admin";
    const password = "password";
    const email = "mateusz.ramotowski@profil-software.com";

    render(<LoginForm />);
    userEvent.click(screen.getByText("Create account"));

    userEvent.type(screen.getByTestId("username"), username);
    userEvent.type(screen.getByTestId("password"), password);
    userEvent.type(screen.getByTestId("confirm-password"), password);
    userEvent.type(screen.getByTestId("email"), email);
  });

  test("create account request with credentials from inputs", () => {
    const username = "admin";
    const password = "password";
    const email = "mateusz.ramotowski@profil-software.com";

    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(fetchDataPost as jest.Mock).toHaveBeenNthCalledWith(
      1,
      "/accounts/users/",
      { username: username, password: password, email: email }
    );
  });
  test("see error when password and confirm-password differs", () => {
    const differentPassword = "differentPassword";

    userEvent.type(screen.getByTestId("confirm-password"), differentPassword);
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(
      screen.getByText("Password and confirm password don't match")
    ).toBeInTheDocument();
  });
  test("can not sent request when password and conirm password differs", () => {
    const differentPassword = "differentPassword";

    userEvent.type(screen.getByTestId("confirm-password"), differentPassword);
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(fetchDataPost as jest.Mock).not.toHaveBeenCalled();
  });

  test("show message after create new account", async () => {
    userEvent.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(screen.getByText("New account was created!")).toBeInTheDocument();
    });
  });
});

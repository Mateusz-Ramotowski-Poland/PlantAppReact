import { fetchDataPost } from "../shared";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RetrievePasswordFormPage } from "./RetrievePasswordFormPage";

jest.mock("../shared", () => {
  const originalModule = jest.requireActual("../shared");

  return {
    __esModule: true,
    ...originalModule,
    fetchDataPost: jest.fn(),
  };
});

describe("Retrieve password tests", () => {
  const email = "mateuszramot@wp.pl";

  beforeEach(() => {
    (fetchDataPost as jest.Mock).mockImplementation(() => {
      return Promise.resolve();
    });

    render(<RetrievePasswordFormPage></RetrievePasswordFormPage>);
    userEvent.type(screen.getByTestId("email"), email);
  });

  test("reset password request with data from input", () => {
    userEvent.click(screen.getByRole("button", { name: "Go further" }));

    expect(fetchDataPost as jest.Mock).toHaveBeenNthCalledWith(
      1,
      "/accounts/users/reset_password/",
      {
        email: email,
      }
    );
  });
});

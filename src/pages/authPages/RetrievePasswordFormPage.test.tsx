import { api } from "../../shared";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RetrievePasswordFormPage } from "./RetrievePasswordFormPage";

describe("Retrieve password tests", () => {
  const email = "mateuszramot@wp.pl";
  let post: jest.SpyInstance;

  beforeEach(() => {
    post = jest.spyOn(api, "post").mockImplementation(() => {
      return Promise.resolve();
    });

    render(<RetrievePasswordFormPage></RetrievePasswordFormPage>);
    userEvent.type(screen.getByTestId("email"), email);
  });

  test("reset password request with data from input", () => {
    userEvent.click(screen.getByRole("button", { name: "Go further" }));

    expect(post).toHaveBeenCalledWith("/accounts/users/reset_password/", {
      email: email,
    });
  });
});

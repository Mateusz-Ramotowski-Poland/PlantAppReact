import { MainNavigation } from "./MainNavigation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Navigate/Redirect tests", () => {
  test("Navigate after logout", () => {
    render(<MainNavigation />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
  });
});

import { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext, AuthContextProvider } from "./authContext";
import { BrowserRouter } from "react-router-dom";
import { api } from "../shared/index";

const Consumer = (props: any) => {
  const ctx = useContext(AuthContext);

  const fn = () => {
    ctx.login(props.a);
  };

  return (
    <>
      {ctx.isLoggedIn ? "auth" : "not auth"}
      <button onClick={fn}>login</button>
    </>
  );
};

test("NameProvider composes full name from first, last", async () => {
  const post = jest.spyOn(api, "post").mockImplementation(() => {
    return Promise.reject();
  });

  const a = { access: "" };

  const { debug } = render(
    <BrowserRouter>
      <AuthContextProvider>
        <Consumer a={a}></Consumer>
      </AuthContextProvider>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "login" }));

  debug();

  await screen.findByText("auth");
});

import React, { useContext } from "react";
import { findByText, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext, AuthContextProvider } from "./authContext";
import { BrowserRouter, Router } from "react-router-dom";
import { fetchDataPost } from "../functions";
import { act } from "react-dom/test-utils";

jest.mock("../functions", () => ({
  fetchDataPost: jest.fn(),
}));

const Consumenr = (props: any) => {
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
  (fetchDataPost as jest.Mock).mockImplementation(() => {
    return Promise.reject();
  });

  const a = { access: "" };

  const { debug } = render(
    <BrowserRouter>
      <AuthContextProvider>
        <Consumenr a={a}></Consumenr>
      </AuthContextProvider>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "login" }));

  debug();

  await screen.findByText("auth");
});

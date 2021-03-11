//TECH IMPORTS
import React from "react";
import { screen, render, waitFor  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//COMPONENT IMPORTS
import App from "../App";

describe("sanity tests for App component", ()=>{
    test("App component & elements renders without error", ()=>{

        render(<App />);

        const navLink=screen.getByRole("link", { name: /Lambda Integration Testing Challenge/i });

        expect(navLink).toBeInTheDocument();

        const navImg=screen.getByRole("img", { src: /Lambda-Logo-Red/i });

        expect(navImg).toBeInTheDocument();
    })
})
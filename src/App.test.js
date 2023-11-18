// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   console.log(linkElement);
//   expect(linkElement).toBeInTheDocument();
// });

// import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


// describe("App renders properly", () => { 
  it("renders learn react link", () => {
    const {getByText} = render(<App />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const linkElement = getByText("hero-text").textContent;
    expect(linkElement).toBeInTheDocument();
  });
//  })
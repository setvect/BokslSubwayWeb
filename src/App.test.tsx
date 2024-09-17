import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders subway arrival information title", () => {
  render(<App />);
  const titleElement = screen.getByText("수도권 지하철 실시간 도착 안내");
  expect(titleElement).toBeInTheDocument();
});

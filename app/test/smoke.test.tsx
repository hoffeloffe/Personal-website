import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { Navbar } from "../src/components/Navbar";
import { Button } from "../src/components/ui/Button";
import { Card } from "../src/components/ui/Card";
import { theme } from "../src/theme/theme";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("smoke tests", () => {
  it("renders app shell", () => {
    render(<App />);

    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
  });

  it("renders navbar links", () => {
    renderWithTheme(<Navbar darkMode={false} toggleDarkMode={vi.fn()} />);

    expect(screen.getByLabelText("HOFF3 - Back to top")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
  });

  it("calls dark mode toggle action", () => {
    const onToggle = vi.fn();
    renderWithTheme(<Navbar darkMode={false} toggleDarkMode={onToggle} />);

    screen.getAllByLabelText("Switch to dark mode")[0].click();

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows loading state on button", () => {
    renderWithTheme(<Button loading>Send</Button>);

    expect(screen.getByRole("button", { name: /send/i })).toBeDisabled();
    expect(screen.getByText("⏳")).toBeInTheDocument();
  });

  it("renders card content", () => {
    renderWithTheme(<Card>Card content</Card>);

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });
});

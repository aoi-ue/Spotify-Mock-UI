import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import Hello from "../components/Hello";

test("React Testing Library works!", () => {
	const { getByText } = render(<Hello name="Jill" />);
	expect(getByText(/hello jill/i)).toBeInTheDocument();
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

it("renders without crashing", function () {
  render(<Snowman />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot", function () {
  const { asFragment, queryByTestId } = render(<Snowman words={["apple"]} maxWrong={1}/>);
  
  fireEvent.click(queryByTestId('btn-b'));
  expect(asFragment()).toMatchSnapshot();
});

it("changes images on incorrect guess", function () {
  const { queryByTestId } = render(<Snowman />);

  expect(queryByTestId('img-0.png')).toBeInTheDocument();

  fireEvent.click(queryByTestId('btn-b'));
  expect(queryByTestId('img-1.png')).toBeInTheDocument();
});

it("changes letters, but not picture on correct guess", function () {
  const { queryByTestId } = render(<Snowman words={["apple"]}/>);

  expect(queryByTestId('img-0.png')).toBeInTheDocument();

  fireEvent.click(queryByTestId('btn-a'));
  expect(queryByTestId('img-0.png')).toBeInTheDocument();

  expect(queryByTestId('word')).toHaveTextContent('a');
});

it("reset button works", function () {
  const { queryByTestId } = render(<Snowman words={["apple"]}/>);

  fireEvent.click(queryByTestId('btn-a'));

  fireEvent.click(queryByTestId('reset-btn'));
  expect(queryByTestId('word')).not.toHaveTextContent('a');
});


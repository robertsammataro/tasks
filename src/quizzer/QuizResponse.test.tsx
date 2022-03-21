import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";
import { QuizResponse } from "./QuizResponse";
import userEvent from "@testing-library/user-event";

const animalQuestion: Question = {
    id: 1,
    name: "Question 1",
    body: "What is the best animal?",
    type: "short_answer_question",
    options: ["orca", "other"],
    expected: "orca",
    points: 100,
    published: false
};

const pokemonQuestion: Question = {
    id: 2,
    name: "Question 2",
    body: "What is Robby's favorite pokemon?",
    type: "multiple_choice_question",
    options: ["lugia", "pikachu", "arcanine", "ditto"],
    expected: "lugia",
    points: 100,
    published: false
};

const shapeQuestion: Question = {
    id: 3,
    name: "Question 3",
    body: "What shape has three sides?",
    type: "multiple_choice_question",
    options: ["square", "circle", "triangle", "octagon"],
    expected: "triangle",
    points: 100,
    published: false
};

describe("QuizResponse Tests", () => {
    beforeEach(() => {
        render(
            <QuizResponse
                question={animalQuestion}
                questionArray={[]}
                changeQuestions={() => ""}
            />
        );
    });

    test("Check to make sure point count is displayed correctly", () => {
        const points = screen.getByText("Number of Points: 100");
        expect(points).toBeInTheDocument();
    });

    test("Check to see if the clear button works for short answer", () => {
        const textBox = screen.getByRole("textbox");
        userEvent.type(textBox, "abcd");
        const clearButton = screen.getByTestId("clear-button");
        clearButton.click();
        {
            /** HOW TO I CHECK TO SEE WHAT THE VALUE OF THE TEXTBOX IS? */
        }
    });

    test("Check if the edit button works", () => {
        let questionBox = screen.queryByTestId("question-edit-box");
        let pointsBox = screen.queryByTestId("points-edit-box");
        let bodyBox = screen.queryByTestId("body-edit-box");
        let publishedButton = screen.queryByTestId("published-edit-button");
        let typeBox = screen.queryByTestId("type-edit-button");
        let expectedBox = screen.queryByTestId("expected-edit-box");

        expect(questionBox).not.toBeInTheDocument();
        expect(pointsBox).not.toBeInTheDocument();
        expect(bodyBox).not.toBeInTheDocument();
        expect(publishedButton).not.toBeInTheDocument();
        expect(typeBox).not.toBeInTheDocument();
        expect(expectedBox).not.toBeInTheDocument();

        const editButton = screen.getByTestId("edit-button");
        editButton.click();

        questionBox = screen.queryByTestId("question-edit-box");
        pointsBox = screen.queryByTestId("points-edit-box");
        bodyBox = screen.queryByTestId("body-edit-box");
        publishedButton = screen.queryByTestId("published-edit-button");
        typeBox = screen.queryByTestId("type-edit-button");
        expectedBox = screen.queryByTestId("expected-edit-box");

        expect(questionBox).toBeInTheDocument();
        expect(pointsBox).toBeInTheDocument();
        expect(bodyBox).toBeInTheDocument();
        expect(publishedButton).toBeInTheDocument();
        expect(typeBox).toBeInTheDocument();
        expect(expectedBox).toBeInTheDocument();
    });

    test("Check to see if question checking works", () => {
        const originalAnswer = screen.getByText("Question 1❌");
        expect(originalAnswer).toBeInTheDocument();

        const textBox = screen.getByRole("textbox");
        userEvent.type(textBox, "orca");

        const newAnswer = screen.getByText("Question 1✅");
        expect(newAnswer).toBeInTheDocument();
    });
});

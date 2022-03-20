import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";

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

const myQuestionList = [animalQuestion, pokemonQuestion, shapeQuestion];

const myQuiz: Quiz = {
    id: 12345,
    name: "Robby's First Quiz",
    questions: myQuestionList,
    description: "Simple quiz to make sure that this thing really works!"
};

const quizArray: Quiz[] = [myQuiz];

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer quizArray={quizArray} />);
    });

    test("The name 'Robby's First Quiz' appears exactly once", () => {
        const title = screen.queryByText("Robby's First Quiz");
        expect(title).toBeInTheDocument();
    });

    test("There is exactly one 'quiz-container'", () => {
        const quizContainers = screen.queryAllByTestId("quiz-container");
        expect(quizContainers.length).toBe(1);
    });

    test("The add button exists", () => {
        const addButton = screen.getByRole("button", { name: /Add Quiz/i });
        expect(addButton).toBeInTheDocument();
    });

    test("The add button creates a new quiz", () => {
        const addButton = screen.getByRole("button", { name: /Add Quiz/i });
        addButton.click();
        const newTitle = screen.queryByText("New Quiz");
        expect(newTitle).toBeInTheDocument();
    });
});

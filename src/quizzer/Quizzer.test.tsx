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

/** Because the state for all three of my components are so closely related, it was
 *  very hard for me to break my tests down into individual files for each component,
 *  so all the tests are here in Quizzer.test.tsx. Sorry about that!
 */
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

    test("Make sure the correct number of questions are detected", () => {
        const title = screen.queryByText("3");
        expect(title).toBeInTheDocument();
    });

    test("Make sure the description is correctly displayed", () => {
        const title = screen.queryByText(
            "Simple quiz to make sure that this thing really works!"
        );
        expect(title).toBeInTheDocument();
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

    test("Make sure the delete button works", () => {
        const deleteButton = screen.getByTestId("delete-button");
        deleteButton.click();
        const oldTitle = screen.queryByText("Robby's First Quiz");
        expect(oldTitle).not.toBeInTheDocument();
    });

    test("Make sure the Show/Hide button works", () => {
        const firstCheck = screen.queryByText("Question 1");
        expect(firstCheck).not.toBeInTheDocument();
        const visibleButton = screen.getByTestId("visible-button");
        visibleButton.click();
        const secondCheck = screen.queryAllByTestId("quiz-response");
        expect(secondCheck.length).toBe(3);
    });

    test("Make sure the Hide Unpublished button works", () => {
        const visibleButton = screen.getByTestId("visible-button");
        visibleButton.click();
        const secondCheck = screen.queryAllByTestId("quiz-response");
        expect(secondCheck.length).toBe(3);
        const filterButton = screen.getByTestId("filter-published-button");
        filterButton.click();
        const thirdCheck = screen.queryAllByTestId("quiz-response");
        expect(thirdCheck.length).toBe(0);
    });

    test("Make sure the New Question button works", () => {
        const visibleButton = screen.getByTestId("visible-button");
        visibleButton.click();
        const newQuestionButton = screen.getByTestId("new-question-button");
        newQuestionButton.click();
        const checkResponses = screen.queryAllByTestId("quiz-response");
        expect(checkResponses.length).toBe(4);
    });

    test("Make sure the delete button for individual questions works", () => {
        const visibleButton = screen.getByTestId("visible-button");
        visibleButton.click();
        const buttonCollection = screen.queryAllByTestId(
            "delete-question-button"
        );
        expect(buttonCollection.length).toBe(3);
        const question1 = screen.queryByText("What is the best animal?");
        const question2 = screen.queryByText(
            "What is Robby's favorite pokemon?"
        );
        const question3 = screen.queryByText("What shape has three sides?");
        expect(question1).toBeInTheDocument();
        expect(question2).toBeInTheDocument();
        expect(question3).toBeInTheDocument();

        const deleteButton = screen.queryAllByTestId("delete-question-button");
        deleteButton[0].click();
        const getQuestions = screen.queryAllByTestId("quiz-response");
        expect(getQuestions.length).toBe(2);
        expect(question1).not.toBeInTheDocument();
        expect(question2).toBeInTheDocument();
        expect(question3).toBeInTheDocument();
    });

    {
        /** ADD A UNIT TEST TO SHOW THAT MOVEUP AND MOVEDOWN ARE WORKING
    test("Check to make sure the right number of points are shown", () => {
        const visibleButton = screen.getByTestId("visible-button");
        visibleButton.click();
        const pointDisplay = screen.queryAllByText("100");
        expect(pointDisplay.length).toBe(3);

    });
     */
    }
});

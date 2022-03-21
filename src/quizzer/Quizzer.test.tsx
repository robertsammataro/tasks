import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";
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

    test("Check to see if the published button works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const quizResponses = screen.getAllByTestId("quiz-response");
        expect(quizResponses.length).toBe(3);
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const publishedButton = screen.getByTestId("published-edit-button");
        publishedButton.click();
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const unpublishedButton = screen.getByTestId("filter-published-button");
        unpublishedButton.click();
        const secondQuizResponses = screen.getAllByTestId("quiz-response");
        expect(secondQuizResponses.length).toBe(1);
        unpublishedButton.click();
        const thirdQuizResponses = screen.getAllByTestId("quiz-response");
        expect(thirdQuizResponses.length).toBe(3);
    });

    test("Check to see if chaning the type of question works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const typeButton = screen.getByTestId("type-edit-button");
        typeButton.click();
        const onScreenTextboxes = screen.getAllByRole("textbox");
        expect(onScreenTextboxes.length).toBe(5);
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const optionButtons = screen.getAllByRole("radio");
        expect(optionButtons.length).toBe(10);
    });

    test("Check to see if chaning the type of question twice works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const typeButton = screen.getByTestId("type-edit-button");
        typeButton.click();
        typeButton.click();
        const onScreenTextboxes = screen.getAllByRole("textbox");
        expect(onScreenTextboxes.length).toBe(4);
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const optionButtons = screen.getAllByRole("radio");
        expect(optionButtons.length).toBe(8);
    });

    test("Check to see if Move Up button works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const originalOrder = screen.queryByText(
            "Question 1Question 2Question 3"
        );
        const originalOrder2 = screen.queryByText(
            "Question 2Question 1Question 3"
        );
        expect(originalOrder).toBeInTheDocument();
        expect(originalOrder2).not.toBeInTheDocument();
        const upButton = screen.getAllByTestId("move-up-button");
        upButton[0].click();
        expect(originalOrder).toBeInTheDocument();
        upButton[1].click();
        const newOrder = screen.queryByText("Question 2Question 1Question 3");
        const newOrder2 = screen.queryByText("Question 1Question 2Question 3");
        expect(newOrder).toBeInTheDocument();
        expect(newOrder2).not.toBeInTheDocument();
    });

    test("Check to see if Move Down button works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const originalOrder = screen.queryByText(
            "Question 1Question 2Question 3"
        );
        const originalOrder2 = screen.queryByText(
            "Question 1Question 3Question 2"
        );
        expect(originalOrder).toBeInTheDocument();
        expect(originalOrder2).not.toBeInTheDocument();
        const upButton = screen.getAllByTestId("move-down-button");
        upButton[2].click();
        expect(originalOrder).toBeInTheDocument();
        upButton[1].click();
        const newOrder = screen.queryByText("Question 1Question 3Question 2");
        const newOrder2 = screen.queryByText("Question 1Question 2Question 3");
        expect(newOrder).toBeInTheDocument();
        expect(newOrder2).not.toBeInTheDocument();
    });

    test("Check to see if editing the name field works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const questionTitleBox = screen.getAllByRole("textbox");
        userEvent.type(questionTitleBox[1], "My New Question");
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const newAnswer = screen.getByText("Question 1My New Question❌");
        expect(newAnswer).toBeInTheDocument();
    });

    test("Check to see if editing the points field works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const questionPointsBox = screen.getByRole("spinbutton");
        userEvent.type(questionPointsBox, "9");
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const newPoints = screen.getByText("Number of Points: 1009");
        expect(newPoints).toBeInTheDocument();
        const oldPoints = screen.getAllByText("Number of Points: 100");
        expect(oldPoints.length).toBe(2);
    });

    test("Check to see if editing the question field works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const questionBodyBox = screen.getAllByRole("textbox");
        userEvent.type(questionBodyBox[2], "-Appended");
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const newPoints = screen.getByText("What is the best animal?-Appended");
        expect(newPoints).toBeInTheDocument();
        const oldPoints = screen.queryByText("What is the best animal?");
        expect(oldPoints).not.toBeInTheDocument();
    });

    test("Check to see if you can add options to multiple choice", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const typeButton = screen.getByTestId("type-edit-button");
        typeButton.click();
        const questionBodyBox = screen.getAllByRole("textbox");
        userEvent.type(questionBodyBox[3], ", third");
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const newOptionButtons = screen.getAllByRole("radio");
        expect(newOptionButtons.length).toBe(11);
    });

    test("Check to see if editing the expected field works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const expectedBox = screen.getByTestId("expected-edit-box");
        userEvent.type(expectedBox, "EXTRA");
        const saveButton = screen.getByTestId("save-button");
        saveButton.click();
        const originalAnswer = screen.getByText("Question 1❌");
        expect(originalAnswer).toBeInTheDocument();
        const textBox = screen.getByRole("textbox");
        userEvent.type(textBox, "orcaEXTRA");
        const newAnswer = screen.getByText("Question 1✅");
        expect(newAnswer).toBeInTheDocument();
    });

    test("Check to make sure the Cancel button works", () => {
        const showButton = screen.getByTestId("visible-button");
        showButton.click();
        const editButton = screen.getAllByTestId("edit-button");
        editButton[0].click();
        const cancelButton = screen.getByTestId("cancel-button");
        cancelButton.click();
        const allTextBoxes = screen.getAllByRole("textbox");
        expect(allTextBoxes.length).toBe(1);
    });
});

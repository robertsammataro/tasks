import React from "react";
import { render } from "@testing-library/react";
import { QuizResponse } from "./QuizResponse";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";

describe("QuizResponse Component tests", () => {
    const myQuestion: Question = {
        id: 1234,
        name: "Question 1",
        body: "What is the best animal?",
        type: "short_answer_question",
        options: ["orca", "other"],
        expected: "orca",
        points: 100,
        published: false
    };

    const myQuiz: Quiz = {
        name: "Testing Quiz",
        id: 1,
        questions: [myQuestion],
        description: "This is a test quiz for the testing functions"
    };

    /**
    test("There is a QuizResponse Box", () => {
        render(<QuizResponse question={myQuestion} />);
    });
    */
});

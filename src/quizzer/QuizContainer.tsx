import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";
import { QuizResponse } from "./QuizResponse";

interface QuizContainerProps {
    quiz: Quiz;
    quizzes: Quiz[];
    setQuizzes: (newQuizzes: Quiz[]) => void;
}

export function QuizContainer({
    quiz,
    quizzes,
    setQuizzes
}: QuizContainerProps): JSX.Element {
    const [questions, changeQuestions] = useState<Question[]>(quiz.questions);
    const [isVisible, setVisible] = useState<boolean>(false);
    const [showUnpublished, setShowUnpublished] = useState<boolean>(true);

    function removeQuiz() {
        const newQuizzes: Quiz[] = [...quizzes];
        const outputQuizzes: Quiz[] = [];
        newQuizzes.map((currentQuiz: Quiz) => {
            currentQuiz.name !== quiz.name
                ? outputQuizzes.push(currentQuiz)
                : "";
        });
        setQuizzes(outputQuizzes);
    }

    function changeVisible() {
        setVisible(!isVisible);
    }

    function changePublishedVisibility() {
        setShowUnpublished(!showUnpublished);
    }

    function addEmptyQuestion() {
        const newQuestion: Question = {
            id: 0,
            name: "New Question",
            body: "New Question",
            type: "short_answer_question",
            options: ["Option A", "Option B"],
            expected: "Default Answer",
            points: 0,
            published: false
        };

        const questionsCopy = [...questions, newQuestion];
        changeQuestions(questionsCopy);
    }

    return (
        <div type-id="quiz-container-object">
            {/** This is what draws and formats the header at the top of the QuizContainer()
             *   it displays:
             *
             *      - Name of the quiz
             *      - Number of questions
             *      - Description
             *      - Total possible points for quiz
             */}

            <hr></hr>
            <Form.Group as={Row}>
                <Col
                    style={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        marginLeft: "20px"
                    }}
                >
                    <h4>{quiz.name}</h4>
                    <span>
                        <p style={{ paddingBottom: "0" }}>
                            <strong>Number of questions:</strong>
                            {"   " + quiz.questions.length}
                            <br></br>
                            <p>{quiz.description}</p>
                        </p>
                    </span>
                </Col>
                <Col
                    style={{
                        verticalAlign: "middle",
                        textAlign: "right",
                        marginRight: "20px"
                    }}
                >
                    <Button onClick={changeVisible}>
                        {isVisible ? "Hide" : "Show"}
                    </Button>
                    {"   "}
                    <Button
                        style={{
                            backgroundColor: "red"
                        }}
                        onClick={removeQuiz}
                    >
                        Delete
                    </Button>
                </Col>
            </Form.Group>

            {/** Actually renders the QuizResponse objects as long as the state
             *   is set to visible.
             */}
            {isVisible && (
                <div style={{ textAlign: "left", marginLeft: "20px" }}>
                    <Button onClick={changePublishedVisibility}>
                        {showUnpublished
                            ? "Hide Unpublished"
                            : "Show Unpublished"}
                    </Button>
                    {"   "}
                    <Button
                        style={{
                            backgroundColor: "green",
                            borderColor: "green"
                        }}
                        onClick={addEmptyQuestion}
                    >
                        New Question
                    </Button>
                </div>
            )}
            {isVisible &&
                questions.map((question: Question) => (
                    <div key={question.id}>
                        {showUnpublished || question.published === true ? (
                            <div>
                                <hr></hr>
                                <QuizResponse
                                    question={question}
                                    questionArray={questions}
                                    changeQuestions={changeQuestions}
                                ></QuizResponse>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                ))}
            <hr></hr>
        </div>
    );
}

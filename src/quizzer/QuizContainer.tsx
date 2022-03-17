import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";
import { QuizResponse } from "./QuizResponse";

export function QuizContainer({ quiz }: { quiz: Quiz }): JSX.Element {
    const [quizEditMode, changeQuizEditMode] = useState<boolean>(false);
    const [questions, changeQuestions] = useState<Question[]>(quiz.questions);
    const [isVisible, setVisible] = useState<boolean>(false);
    const [showUnpublished, setShowUnpublished] = useState<boolean>(true);

    function changeVisible() {
        setVisible(!isVisible);
    }

    function changePublishedVisibility() {
        setShowUnpublished(!showUnpublished);
    }

    function resetAnswers() {
        changeQuestions([...quiz.questions]);
    }

    return (
        <div>
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
                    <Button onClick={changeVisible}>Show/Hide</Button>
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
                    {"\t"}
                    <Button onClick={resetAnswers}>Reset Answers</Button>
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

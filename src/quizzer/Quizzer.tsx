import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Quiz } from "../interfaces/quiz";
import { QuizContainer } from "./QuizContainer";

export function Quizzer({ quizArray }: { quizArray: Quiz[] }): JSX.Element {
    const [quizzes, setQuizzes] = useState<Quiz[]>(quizArray);

    function addEmptyQuiz() {
        const newQuiz: Quiz = {
            name: "New Quiz",
            id: 0,
            questions: [],
            description: "Sample Description"
        };

        setQuizzes([...quizzes, newQuiz]);
    }

    return (
        <div>
            <hr></hr>
            <Form.Group as={Row}>
                <Col style={{ textAlign: "left", paddingLeft: "20px" }}>
                    <h2>Available Quizzes:</h2>
                </Col>
                <Col style={{ textAlign: "right", paddingRight: "20px" }}>
                    <Button onClick={addEmptyQuiz}>Add Quiz</Button>
                </Col>
            </Form.Group>
            {quizzes.map((quiz: Quiz) => (
                <div data-testid="quiz-container" key={quiz.id}>
                    <QuizContainer
                        data-testid="quiz-container"
                        quiz={quiz}
                        quizzes={quizzes}
                        setQuizzes={setQuizzes}
                    ></QuizContainer>
                </div>
            ))}
        </div>
    );
}

import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Question } from "../interfaces/question";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

//Takes in a question and displays the window to the website
export function QuizResponse({
    question
}: {
    question: Question;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");

    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }

    return (
        <div style={{ paddingLeft: "20px" }}>
            {/* Header of the Question Container*/}
            <div style={{ textAlign: "left" }}>
                <h5>
                    {question.name +
                        (answer === question.expected ? "✅" : "❌")}
                </h5>
                <p>
                    {"Number of Points: " + question.points} <br></br>{" "}
                    <strong>{question.body}</strong>
                </p>
            </div>

            {/* Conditional to determine whether the multiple choice 
            or open ended response box gets shown to the user*/}
            {question.type === "multiple_choice_question" ? (
                <Form.Group controlId="formMultipleChoice">
                    {question.options.map((response: string) => (
                        <Form.Check
                            inline
                            key={question.id + "_" + response}
                            type="radio"
                            name="response"
                            onChange={updateAnswer}
                            id={response}
                            label={response}
                            value={response}
                            checked={response === answer}
                        />
                    ))}
                </Form.Group>
            ) : (
                <Form.Group
                    controlId="formShortAnswer"
                    as={Row}
                    style={{ marginRight: "20px" }}
                >
                    <Col>
                        <Form.Control value={answer} onChange={updateAnswer} />
                    </Col>
                </Form.Group>
            )}
        </div>
    );
}

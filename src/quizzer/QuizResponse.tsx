import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Question, QuestionType } from "../interfaces/question";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface QuizResponseProps {
    question: Question;
    questionArray: Question[];
    changeQuestions: (newQuestions: Question[]) => void;
}

//Takes in a question and displays the window to the website
export function QuizResponse({
    question,
    questionArray,
    changeQuestions
}: QuizResponseProps): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);

    //State to control the editMode components
    const [editNameValue, setEditNameValue] = useState<string>(question.name);
    const [editBodyValue, setEditBodyValue] = useState<string>(question.body);
    const [editTypeValue, setEditTypeValue] = useState<QuestionType>(
        question.type
    );
    const [editPointsValue, setEditPointsValue] = useState<number>(
        question.points
    );
    const [editOptionsValue, setEditOptionsValue] = useState<string>(
        question.options.join(", ")
    );
    const [editPublishedValue, setEditPublishedValue] = useState<boolean>(
        question.published
    );
    const [editExpectedValue, setEditExpectedValue] = useState<string>(
        question.expected
    );

    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }

    function updateFields() {
        setEditMode(false);

        const newArray = [...questionArray];
        const newQuestion: Question = {
            id: question.id,
            name: editNameValue,
            body: editBodyValue,
            type: editTypeValue,
            options: editOptionsValue.split(", "),
            expected: editExpectedValue,
            points: editPointsValue,
            published: editPublishedValue
        };

        const current_id: number = question.id;
        const newIndex: number = newArray.findIndex(
            (question: Question): boolean => question.id === current_id
        );

        newArray.splice(newIndex, 1, newQuestion);
        changeQuestions(newArray);
    }

    function updateType() {
        if (editTypeValue === "short_answer_question") {
            setEditTypeValue("multiple_choice_question");
        } else {
            setEditTypeValue("short_answer_question");
        }
    }

    function deleteQuestion() {
        const newQuestions: Question[] = [...questionArray];
        const outputQuestions: Question[] = [];
        newQuestions.map((currentQuestion: Question) => {
            currentQuestion.name !== question.name
                ? outputQuestions.push(currentQuestion)
                : "";
        });
        changeQuestions(outputQuestions);
    }

    function moveUp() {
        const oldIndex = questionArray.findIndex(
            (currentQuestion: Question): boolean =>
                currentQuestion.id === question.id
        );
        if (oldIndex != 0) {
            const newQuestions = questionArray.filter(
                (currentQuestion: Question): boolean =>
                    currentQuestion.id !== question.id
            );

            newQuestions.splice(oldIndex - 1, 0, question);
            changeQuestions(newQuestions);
        }
    }

    function moveDown() {
        const oldIndex = questionArray.findIndex(
            (currentQuestion: Question): boolean =>
                currentQuestion.id === question.id
        );
        if (oldIndex != questionArray.length - 1) {
            const newQuestions = questionArray.filter(
                (currentQuestion: Question): boolean =>
                    currentQuestion.id !== question.id
            );

            newQuestions.splice(oldIndex + 1, 0, question);
            changeQuestions(newQuestions);
        }
    }

    return (
        <div
            data-testid="quiz-response"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
            {/* Header of the Question Container*/}
            <div style={{ textAlign: "left" }}>
                <Form.Group as={Row}>
                    <Col>
                        <h5>
                            {question.name +
                                (answer === question.expected ? "✅" : "❌")}
                        </h5>
                    </Col>

                    {/** Button to clear answer for a QuizResponse object
                     *   and to trigger edit mode for this question
                     */}
                    <Col
                        style={{
                            textAlign: "right"
                        }}
                    >
                        <Button
                            onClick={moveUp}
                            style={{
                                backgroundColor: "white",
                                borderColor: "white"
                            }}
                            data-testid="move-up-button"
                        >
                            ⬆️
                        </Button>
                        <Button
                            onClick={moveDown}
                            style={{
                                backgroundColor: "white",
                                borderColor: "white"
                            }}
                            data-testid="move-down-button"
                        >
                            ⬇️
                        </Button>
                        <Button
                            data-testid="clear-button"
                            onClick={() => setAnswer("")}
                        >
                            Clear
                        </Button>
                        {"   "}
                        <Button
                            data-testid="edit-button"
                            onClick={() => setEditMode(!editMode)}
                        >
                            Edit
                        </Button>
                        {"   "}
                        <Button
                            style={{
                                backgroundColor: "red",
                                borderColor: "red"
                            }}
                            data-testid="delete-question-button"
                            onClick={deleteQuestion}
                        >
                            Delete
                        </Button>
                    </Col>
                </Form.Group>
                <p>
                    {"Number of Points: " + question.points} <br></br>{" "}
                    <strong>{question.body}</strong>
                </p>
            </div>
            {/* Conditional to determine whether the multiple choice 
            or open ended response box gets shown to the user*/}
            {question.type === "multiple_choice_question" ? (
                <Form.Group
                    controlId="formMultipleChoice"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                >
                    {question.options.map((response: string) => (
                        <Form.Check
                            inline
                            key={question.id + "_" + response}
                            type="radio"
                            name={question.id.toString()}
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
                        <Form.Control
                            data-testid="text-entry-box"
                            value={answer}
                            onChange={updateAnswer}
                        />
                    </Col>
                </Form.Group>
            )}
            {/**Draw the edit fields if in edit mode
             *
             * This probably could've been its own component but it would have also
             * been a lot of state to pass around and I didn't feel like messing with
             * that, sorry!
             */}
            {editMode && (
                <div>
                    <br></br>
                    <Form.Group
                        style={{ textAlign: "left", paddingLeft: "20px" }}
                    >
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Question Name:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    data-testid="question-edit-box"
                                    value={editNameValue}
                                    onChange={(event: ChangeEvent) =>
                                        setEditNameValue(event.target.value)
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Number of Points:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    data-testid="points-edit-box"
                                    type="number"
                                    value={editPointsValue}
                                    onChange={(event: ChangeEvent) =>
                                        setEditPointsValue(
                                            parseInt(event.target.value) || 0
                                        )
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Question Body:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    data-testid="body-edit-box"
                                    value={editBodyValue}
                                    onChange={(event: ChangeEvent) =>
                                        setEditBodyValue(event.target.value)
                                    }
                                />
                            </Col>
                        </Form.Group>
                        {editTypeValue === "multiple_choice_question" && (
                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Label>Options:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        data-testid="options-edit-box"
                                        value={editOptionsValue}
                                        onChange={(event: ChangeEvent) =>
                                            setEditOptionsValue(
                                                event.target.value
                                            )
                                        }
                                    />
                                </Col>
                            </Form.Group>
                        )}
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Published:</Form.Label>
                            </Col>
                            <Col>
                                <Button
                                    data-testid="published-edit-button"
                                    onClick={() =>
                                        setEditPublishedValue(
                                            !editPublishedValue
                                        )
                                    }
                                >
                                    {editPublishedValue ? "Yes" : "No"}
                                </Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Question Type:</Form.Label>
                            </Col>
                            <Col>
                                <Button
                                    data-testid="type-edit-button"
                                    onClick={updateType}
                                >
                                    {editTypeValue ===
                                    "multiple_choice_question"
                                        ? "Multiple Choice Question"
                                        : "Short Answer Question"}
                                </Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>
                                    Expected Answer (Case Sensitive):
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    data-testid="expected-edit-box"
                                    value={editExpectedValue}
                                    onChange={(event: ChangeEvent) =>
                                        setEditExpectedValue(event.target.value)
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Button
                                style={{
                                    backgroundColor: "green",
                                    borderColor: "green"
                                }}
                                onClick={() => updateFields()}
                                data-testid="save-button"
                            >
                                Save
                            </Button>
                            {"   "}
                            <Button
                                style={{
                                    backgroundColor: "red",
                                    borderColor: "red"
                                }}
                                onClick={() => setEditMode(false)}
                                data-testid="cancel-button"
                            >
                                Cancel
                            </Button>
                        </Form.Group>
                    </Form.Group>
                </div>
            )}
        </div>
    );
}

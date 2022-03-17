import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { QuizResponse } from "./QuizResponse";

export function QuizContainer({
    input_questions
}: {
    input_questions: Question[];
}): JSX.Element {
    const [editMode, isEditMode] = useState<boolean>(false);
    const [questions, changeQuestions] = useState<Question[]>(input_questions);
    const [isVisible, setVisible] = useState<boolean>(false);

    function changeVisible() {
        setVisible(!isVisible);
    }

    return (
        <div>
            <Form.Group controlId="formVisibleMode">
                <Form.Check
                    type="switch"
                    id="expand_switch"
                    label="Expand"
                    checked={isVisible}
                    onChange={changeVisible}
                />
            </Form.Group>
            {isVisible &&
                questions.map((question: Question) => (
                    <div key={question.id}>
                        <QuizResponse question={question}></QuizResponse>
                    </div>
                ))}
        </div>
    );
}

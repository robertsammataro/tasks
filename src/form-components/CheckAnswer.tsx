import React, { useState } from "react";
import { Form } from "react-bootstrap";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    const [userInput, updateUserInput] = useState<string>("");

    function changeUserInput(event: ChangeEvent) {
        updateUserInput(event.target.value);
    }

    return (
        <div>
            <h3>Check Answer</h3>
            <Form.Group controlId="formCheckAnswer">
                <Form.Label>Enter Your Answer:</Form.Label>
                <Form.Control value={userInput} onChange={changeUserInput} />
            </Form.Group>
            <div>{userInput === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}

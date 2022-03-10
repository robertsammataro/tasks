import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    const [currentChoice, setCurrentChoice] = useState<string>(options[0]);

    function updateCurrentChoice(event: ChangeEvent) {
        setCurrentChoice(event.target.value);
    }

    return (
        <div>
            <h3>Multiple Choice Question</h3>
            <Form.Group controlId="formMultipleChoiceQuestion">
                <Form.Label>Please make your selection</Form.Label>
                <Form.Select
                    value={currentChoice}
                    onChange={updateCurrentChoice}
                >
                    {options.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {currentChoice === expectedAnswer ? "✔️" : "❌"}
        </div>
    );
}

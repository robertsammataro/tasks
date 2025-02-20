import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function ChangeColor(): JSX.Element {
    const COLORS = [
        "red",
        "orange",
        "green",
        "blue",
        "purple",
        "gray",
        "black",
        "pink"
    ];
    const [currentColor, setCurrentColor] = useState<string>("red");

    function updateCurrentColor(event: ChangeEvent) {
        setCurrentColor(event.target.value);
    }

    return (
        <div>
            <h3>Change Color</h3>
            <Form.Group controlId="formChangeColor">
                <Form.Label>Please select a color:</Form.Label>
                {COLORS.map((color: string) => (
                    <Form.Check
                        inline
                        type="radio"
                        name="colors"
                        onChange={updateCurrentColor}
                        id={"colors-" + color}
                        key={color}
                        style={{ backgroundColor: color }}
                        label={color}
                        value={color}
                        checked={currentColor === color}
                    />
                ))}
            </Form.Group>
            <div>
                You have chosen{" "}
                <span
                    data-testid="colored-box"
                    style={{ backgroundColor: currentColor }}
                >
                    {currentColor}
                </span>
            </div>
        </div>
    );
}

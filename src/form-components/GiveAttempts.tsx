import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function GiveAttempts(): JSX.Element {
    const [remaining, setRemaining] = useState<number>(1);
    const [numberInput, setNumberBox] = useState<number>(0);

    function addAttempts(toAdd: number) {
        setRemaining(remaining + toAdd);
    }

    return (
        <div>
            <h3>Give Attempts</h3>
            {remaining}
            <Form.Group controlId="formGiveAttempts">
                <Form.Label>Attempts to add:</Form.Label>
                <Form.Control
                    type="number"
                    value={numberInput}
                    onChange={(event: ChangeEvent) =>
                        setNumberBox(parseInt(event.target.value))
                    }
                />
            </Form.Group>
            <Button onClick={() => addAttempts(-1)} disabled={remaining === 0}>
                use
            </Button>
            <Button onClick={() => addAttempts(numberInput)}>gain</Button>
        </div>
    );
}

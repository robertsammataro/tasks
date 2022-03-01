import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [dice1number, updateDice1Number] = useState<number>(1);
    const [dice2number, updateDice2Number] = useState<number>(2);

    function changeDice1Number(): void {
        updateDice1Number(d6());
    }

    function changeDice2Number(): void {
        updateDice2Number(d6());
    }

    function generatePrintStatement(): string {
        if (dice1number === dice2number) {
            if (dice1number === 1) {
                return "Lose";
            } else {
                return "Win";
            }
        } else {
            return "";
        }
    }

    return (
        <div>
            <p>
                <Button onClick={changeDice1Number}>Roll Left</Button>
                <span> </span>
                <Button onClick={changeDice2Number}>Roll Right</Button>
            </p>
            <p>
                <span data-testid="left-die">{dice1number} </span>
                <span data-testid="right-die">{dice2number}</span>
            </p>
            {generatePrintStatement()}
        </div>
    );
}

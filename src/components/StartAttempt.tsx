import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [inProgress, updateInProgress] = useState<boolean>(false);
    const [remainingAttempts, updateRemainingAttempts] = useState<number>(4);

    function startNewAttempt(): void {
        updateInProgress(!inProgress);
        updateRemainingAttempts(remainingAttempts - 1);
    }

    function stopAttempt(): void {
        updateInProgress(!inProgress);
    }

    function mulligan(): void {
        updateRemainingAttempts(remainingAttempts + 1);
    }

    return (
        <div>
            <p>
                <Button
                    onClick={startNewAttempt}
                    disabled={inProgress || remainingAttempts === 0}
                >
                    Start Quiz
                </Button>
            </p>
            <p>
                <Button onClick={stopAttempt} disabled={!inProgress}>
                    Stop Quiz
                </Button>
            </p>
            <p>
                <Button onClick={mulligan} disabled={inProgress}>
                    Mulligan
                </Button>
            </p>
        </div>
    );
}

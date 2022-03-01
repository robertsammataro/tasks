import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): JSX.Element {
    type Holiday =
        | "new_years"
        | "christmas"
        | "thanksgiving"
        | "fourth_of_july"
        | "halloween";

    const [currentHoliday, updateCurrentHoliday] =
        useState<Holiday>("new_years");

    function cycleByDate(): void {
        if (currentHoliday === "new_years") {
            updateCurrentHoliday("fourth_of_july");
        } else if (currentHoliday === "fourth_of_july") {
            updateCurrentHoliday("halloween");
        } else if (currentHoliday === "halloween") {
            updateCurrentHoliday("thanksgiving");
        } else if (currentHoliday === "thanksgiving") {
            updateCurrentHoliday("christmas");
        } else {
            updateCurrentHoliday("new_years");
        }
    }

    function cycleByName(): void {
        if (currentHoliday === "christmas") {
            updateCurrentHoliday("fourth_of_july");
        } else if (currentHoliday === "fourth_of_july") {
            updateCurrentHoliday("halloween");
        } else if (currentHoliday === "halloween") {
            updateCurrentHoliday("new_years");
        } else if (currentHoliday === "new_years") {
            updateCurrentHoliday("thanksgiving");
        } else {
            updateCurrentHoliday("christmas");
        }
    }

    function convertCurrentHoliday(): string {
        if (currentHoliday === "christmas") {
            return "🎅";
        } else if (currentHoliday === "fourth_of_july") {
            return "🎆 (USA Flag Emoji Doesn't Work)";
        } else if (currentHoliday === "halloween") {
            return "🎃";
        } else if (currentHoliday === "new_years") {
            return "🎉";
        } else {
            return "🦃";
        }
    }

    return (
        <div>
            <Button onClick={cycleByName}>Advance by Alphabet</Button>
            <Button onClick={cycleByDate}>Advance by Year</Button>
            <p>
                <span>Holiday: {convertCurrentHoliday()}</span>
            </p>
        </div>
    );
}

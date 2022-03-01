import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): JSX.Element {
    const [questionType, changeQuestionType] = useState<QuestionType>(
        "short_answer_question"
    );

    function updateComponentState(): void {
        questionType === "short_answer_question"
            ? changeQuestionType("multiple_choice_question")
            : changeQuestionType("short_answer_question");
    }

    return (
        <div>
            <Button onClick={updateComponentState}>Change Type</Button>
            {questionType === "multiple_choice_question" ? (
                <div>Multiple Choice</div>
            ) : (
                <div>Short Answer</div>
            )}
        </div>
    );
}

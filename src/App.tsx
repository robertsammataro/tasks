import React from "react";
import "./App.css";
import { ChangeType } from "./components/ChangeType";
import { RevealAnswer } from "./components/RevealAnswer";
import { StartAttempt } from "./components/StartAttempt";
import { TwoDice } from "./components/TwoDice";
import { CycleHoliday } from "./components/CycleHoliday";
import { Counter } from "./components/Counter";
import { DoubleHalf } from "./bad-components/DoubleHalf";
import { ColoredBox } from "./bad-components/ColoredBox";
import { ShoveBox } from "./bad-components/ShoveBox";
import { ChooseTeam } from "./bad-components/ChooseTeam";
import { CheckAnswer } from "./form-components/CheckAnswer";
import { GiveAttempts } from "./form-components/GiveAttempts";
import { EditMode } from "./form-components/EditMode";
import { MultipleChoiceQuestion } from "./form-components/MultipleChoiceQuestion";
import { ChangeColor } from "./form-components/ChangeColor";
import { Quizzer } from "./quizzer/Quizzer";
import { QuizResponse } from "./quizzer/QuizResponse";
import { Question } from "./interfaces/question";

function App(): JSX.Element {
    const myQuestion: Question = {
        id: 1234,
        name: "Question 1",
        body: "What is the best animal?",
        type: "short_answer_question",
        options: ["orca", "other"],
        expected: "orca",
        points: 100,
        published: false
    };

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript - Robby Sammataro
            </header>

            <Quizzer></Quizzer>
            <QuizResponse question={myQuestion}></QuizResponse>
            <hr></hr>
        </div>
    );
}

export default App;

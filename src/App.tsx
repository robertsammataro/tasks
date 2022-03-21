import React, { useState } from "react";
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
import { Question } from "./interfaces/question";
import myImage from "./project_outline.jpg";
import { Quiz } from "./interfaces/quiz";
import { Button } from "react-bootstrap";

function App(): JSX.Element {
    const [imageVisible, setImageVisible] = useState<boolean>(false);
    const [pastWorkVisible, setPastWorkVisible] = useState<boolean>(false);

    function updateImageVisibility() {
        setImageVisible(!imageVisible);
    }

    function updatePastWorkVisibility() {
        setPastWorkVisible(!pastWorkVisible);
    }

    const animalQuestion: Question = {
        id: 1,
        name: "Question 1",
        body: "What is the best animal?",
        type: "short_answer_question",
        options: ["orca", "other"],
        expected: "orca",
        points: 100,
        published: false
    };

    const pokemonQuestion: Question = {
        id: 2,
        name: "Question 2",
        body: "What is Robby's favorite pokemon?",
        type: "multiple_choice_question",
        options: ["lugia", "pikachu", "arcanine", "ditto"],
        expected: "lugia",
        points: 100,
        published: false
    };

    const shapeQuestion: Question = {
        id: 3,
        name: "Question 3",
        body: "What shape has three sides?",
        type: "multiple_choice_question",
        options: ["square", "circle", "triangle", "octagon"],
        expected: "triangle",
        points: 100,
        published: false
    };

    const myQuestionList = [animalQuestion, pokemonQuestion, shapeQuestion];

    const myQuiz: Quiz = {
        id: 12345,
        name: "Robby's First Quiz",
        questions: myQuestionList,
        description: "Simple quiz to make sure that this thing really works!"
    };

    const quizArray: Quiz[] = [myQuiz];

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript - Robby Sammataro
            </header>

            {/** Add a button to show/hide the layout sketch so it doesn't
             *   get in the way of things!
             */}
            <div style={{ marginTop: "20px" }}>
                <Button onClick={updateImageVisibility}>
                    Show/Hide Sketch and Feature List
                </Button>
                {imageVisible && (
                    <div>
                        <br></br>
                        <img src={myImage} width="800" />
                        <div>
                            <h4>Application Functions:</h4>
                            <ul
                                style={{
                                    textAlign: "left",
                                    paddingLeft: "35%"
                                }}
                            >
                                <li>Application Sketch</li>
                                <li>Quizzes are visible</li>
                                <li>Quizzes have questions</li>
                                <li>At least two types of questions</li>
                                <li>Check correctness</li>
                                <li>Clear Answers</li>
                                <li>Publish/Unpublish Questions</li>
                                <li>Filter Published/Unpublished Questions</li>
                                <li>Edit Questions</li>
                                <li>Add Questions</li>
                                <li>Delete Questions</li>
                                <li>Reorder Questions</li>
                                <li>Add Quizzes</li>
                                <li>Delete Quizzes</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <Quizzer quizArray={quizArray}></Quizzer>

            {/** ========================================
             *   STUFF BELOW THIS LINE IS JUST OLD WORK!!
             *   ========================================*/}

            <div style={{ marginTop: "20px" }}>
                <Button onClick={updatePastWorkVisibility}>
                    Show/Hide Past Work
                </Button>
                {pastWorkVisible && (
                    <div>
                        <br></br>
                        <hr></hr>
                        <CheckAnswer expectedAnswer="42"></CheckAnswer>
                        <hr></hr>
                        <GiveAttempts></GiveAttempts>
                        <hr></hr>
                        <EditMode></EditMode>
                        <hr></hr>
                        <ChangeColor></ChangeColor>
                        <hr></hr>
                        <MultipleChoiceQuestion
                            options={["a", "b", "c"]}
                            expectedAnswer="b"
                        ></MultipleChoiceQuestion>
                        <hr></hr>
                        {<DoubleHalf></DoubleHalf>}
                        <hr></hr>
                        <ChooseTeam></ChooseTeam>
                        <hr></hr>
                        <ColoredBox></ColoredBox>
                        <hr></hr>
                        <ShoveBox></ShoveBox>
                        <hr></hr>
                        <Counter></Counter>
                        <hr />
                        <RevealAnswer></RevealAnswer>
                        <hr />
                        <StartAttempt></StartAttempt>
                        <hr />
                        <TwoDice></TwoDice>
                        <hr />
                        <ChangeType></ChangeType>
                        <hr />
                        <CycleHoliday></CycleHoliday>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

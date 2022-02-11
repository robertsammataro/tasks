import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript - Robby Sammataro
            </header>
            <p>
                Hello World! Edit <code>src/App.tsx</code> and save. This page
                will automatically reload.
            </p>
            <>
                <h1>This is a header!</h1>
                <img
                    src="https://i.imgur.com/86pnF0S.jpg"
                    alt="Robby at Epcot 2022"
                />
                <ul>
                    <li>Hey here is my first bullet point</li>
                    <li>Oh look here is another one</li>
                    <li>Okay this is my last box.</li>
                </ul>
                <Button onClick={() => console.log("Hello World!")}>
                    Log Hello World
                </Button>
                <Container>
                    <Row>
                        <Col>
                            <div
                                style={{
                                    border: "1px solid red",
                                    padding: "4px",
                                    width: 250,
                                    height: 50,
                                    backgroundColor: "red",
                                    color: "white"
                                }}
                            >
                                This is my text!
                            </div>
                        </Col>
                        <Col>
                            <div
                                style={{
                                    border: "1px solid red",
                                    padding: "4px",
                                    width: 250,
                                    height: 50,
                                    backgroundColor: "red",
                                    color: "white"
                                }}
                            >
                                This is my text!
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        </div>
    );
}

export default App;

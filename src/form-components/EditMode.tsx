import React, { useState } from "react";
import { Form } from "react-bootstrap";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function EditMode(): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [studentName, setStudentName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);

    function displayStudentName() {
        if (!editMode) {
            if (isStudent) {
                return <div>{studentName} is a student</div>;
            } else {
                return <div>{studentName} is not a student</div>;
            }
        }
    }

    function updateStudentName(event: ChangeEvent) {
        setStudentName(event.target.value);
    }

    function updateEditMode() {
        setEditMode(!editMode);
    }

    function updateIsStudent() {
        setIsStudent(!isStudent);
    }

    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Group controlId="formEditMode">
                <Form.Check
                    type="switch"
                    id="editSwitch"
                    label="Edit Mode"
                    checked={editMode}
                    onChange={updateEditMode}
                />
                <Form.Label>What is your name?</Form.Label>
                <Form.Control
                    value={studentName}
                    onChange={updateStudentName}
                    disabled={!editMode}
                />
                <Form.Check
                    type="switch"
                    id="studentSwitch"
                    label="Is a Student?"
                    checked={isStudent}
                    onChange={updateIsStudent}
                    disabled={!editMode}
                />
            </Form.Group>
            {displayStudentName()}
        </div>
    );
}

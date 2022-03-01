import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): JSX.Element {
    const [visible, setVisibility] = useState<boolean>(false);

    function changeVisibility(): void {
        setVisibility(!visible);
    }

    return (
        <div>
            <Button onClick={changeVisibility}>Show/Hide</Button>
            {visible && <div>42</div>}
        </div>
    );
}

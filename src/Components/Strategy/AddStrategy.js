import React, { useState } from "react";
// import { X } from "react-feather";
import { Row, Col, DatePicker, Button, Menu, Dropdown, Card, Select, Input, Form } from "antd";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { StrategyWrapper } from "./Strategy.style";

function AddStrategy(props) {
    const { onSubmit, placeholder, text } = props;

    const [isEditable, setIsEditable] = useState(false);
    const [inputText, setInputText] = useState("");

    const submissionHandler = () => {
        if (inputText && onSubmit) {
            setInputText("");
            onSubmit(inputText);
        }
        setIsEditable(false);
    };

    return (
        <StrategyWrapper>
            {isEditable ? (
                <div className="add-strategy-name">
                    <Input
                        type="text"
                        placeholder={placeholder}
                        onChange={(event) => setInputText(event.target.value)}
                        autoFocus
                    />
                    <span className="strategy-icons">
                        <CheckIcon onClick={() => submissionHandler()} />
                        <CloseIcon onClick={() => setIsEditable(false)} />
                    </span>
                </div>
            ) : (
                <Button
                    htmlType="button"
                    onClick={() => setIsEditable(true)}
                >
                    {text}
                </Button>
            )}
        </StrategyWrapper>
    );
}

export default AddStrategy;

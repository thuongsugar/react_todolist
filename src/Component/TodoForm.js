import { useState, useRef, useEffect, useContext } from "react";
import { Input, Button } from "antd";
import { TimeContext } from "../Context/TimeProvider";
import { ClockCircleOutlined } from "@ant-design/icons";
function TodoForm(props) {
    const [input, setInput] = useState({ index: undefined, input: "" });
    const refInput = useRef(null);
    useEffect(() => props.stateFormInput(updateState), []);
    const [timeChoice, _] = useContext(TimeContext);
    function handleChangeInput(e) {
        setInput({ index: input.index, input: e.target.value });
    }
    function updateState(todoData) {
        console.log(todoData);
        setInput({ ...todoData });
        refInput.current.focus();
    }
    function handleClick() {
        props.addTodo(
            {
                input: input.input.trim(),
                isComplete: false,
            },
            input.index
        );
        setInput("");
        refInput.current.focus();
    }
    function handleCancel() {
        setInput({ index: undefined, input: "" });
    }
    function checkTimeOut() {
        if (timeChoice == new Date().toLocaleDateString("en-GB")) {
            return false;
        } else {
            //dd/mm/yyy ?=
            const [day, month, year] = timeChoice.split("/");
            let dateChoice = new Date(year, month - 1, day, 0, 0, 0, 0);
            return dateChoice < new Date();
        }
    }
    const isTimeOut = checkTimeOut();
    let timeOutAttribute = {
        // readOnly: true,
        disabled: true,
        placeholder: "Time has passed",
        status: "error",
        prefix: <ClockCircleOutlined />,
        style: {
            borderTopLeftRadius: "200px",
            borderBottomLeftRadius: "20px",
            cursor: "not-allowed",
        },
    };
    return (
        <div style={{ display: "flex" }}>
            {isTimeOut ? (
                <Input {...timeOutAttribute} />
            ) : (
                <Input
                    ref={refInput}
                    value={input.input ? input.input : ""}
                    onChange={handleChangeInput}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleClick();
                        }
                    }}
                    placeholder={"new todo"}
                    style={{
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                    }}
                />
            )}

            <Button
                disabled={!input.input && true}
                onClick={handleClick}
                style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                }}
                type={"primary"}
            >
                {typeof input.index == "undefined"
                    ? "Add new todo"
                    : "Update todo"}
            </Button>
            {typeof input.index == "undefined" ? (
                <></>
            ) : (
                <Button onClick={handleCancel}>Cancel</Button>
            )}
        </div>
    );
}
export default TodoForm;

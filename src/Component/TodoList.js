import {
    Tabs,
    Space,
    Tooltip,
    List,
    Button,
    Popconfirm,
    DatePicker,
} from "antd";
import {
    EditOutlined,
    CloseSquareOutlined,
    CheckSquareOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { useState, useContext } from "react";
// import { serverTimestamp } from "firebase/firestore";
import { TimeContext } from "../Context/TimeProvider";

function TodoList(props) {
    let styleIcon = {
        padding: "5px",
        fontSize: "20px",
        background: "#fff",
        borderRadius: "10px",
        cursor: "pointer",
    };
    let styleButton = {
        padding: "3px 8px",
        borderRadius: "6px",
        // transition: "opacity 3s",
    };
    let listStyle = {
        overflowY: "auto",
        height: "66vh",
        minHeight: "66vh",
    };
    let listItemStyle = {
        display: "flex",
        justifyContent: "space-between",
    };

    const { TabPane } = Tabs;
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const [timeChoice, setTimeChoice] = useContext(TimeContext);

    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

    const showPopconfirm = () => {
        console.log("show");
        setVisible(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        await props.handleDeleteTodo();

        setVisible(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setVisible(false);
    };
    function handleSelect() {
        console.log(selectAll);
        if (props.todoList.length > 0) {
            props.handleSelectTodo(selectAll);
            setSelectAll(!selectAll);
        }
    }
    function handleUpdateTodo(index) {
        props.upDateTodoForm(index);
    }
    function handleTabClick(key, event) {}
    function onChangeDatePicker(date, dateString) {
        console.log(dateString);
        if (date) {
            setTimeChoice(dateString);
            // console.log(date, dateString);
            console.log(dateString == new Date().toLocaleDateString("en-GB"));
        }
    }
    return (
        <>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <Button
                    disabled={props.todoList.length <= 0 ? true : false}
                    type="primary"
                    style={styleButton}
                    onClick={handleSelect}
                >
                    {selectAll ? "Deselect All" : "Select All"}
                </Button> */}
                <DatePicker
                    inputReadOnly
                    size="small"
                    defaultValue={moment(timeChoice, dateFormatList[0])}
                    format={dateFormatList}
                    onChange={onChangeDatePicker}
                    style={{ borderRadius: "20px" }}
                />
                {props.todoList.some((todo) => todo.isComplete === true) ? (
                    <Popconfirm
                        placement="right"
                        title={"Are you sure to delete this task?"}
                        visible={visible}
                        onConfirm={handleOk}
                        okButtonProps={{
                            loading: confirmLoading,
                        }}
                        onCancel={handleCancel}
                    >
                        <Button
                            danger
                            style={styleButton}
                            onClick={showPopconfirm}
                        >
                            Remove all todo completed
                        </Button>
                    </Popconfirm>
                ) : (
                    <></>
                )}
            </Space>
            <Tabs
                defaultActiveKey="1"
                centered
                onTabClick={handleTabClick}
                style={{ color: "#fff" }}
            >
                {/* {console.log(props.todoList[0].createAt.toDate().)} */}
                <TabPane tab="All" key={1}>
                    <List
                        className="list_todo"
                        size="small"
                        dataSource={props.todoList}
                        renderItem={(todoData, index) => (
                            <Tooltip
                                placement="left"
                                title={`${todoData.createDate}, ${todoData.createTime}`}
                                key={index}
                            >
                                <List.Item
                                    direction="horizontal"
                                    style={{
                                        ...listItemStyle,
                                        textDecoration:
                                            todoData.isComplete &&
                                            "line-through 4px #2a9d8f",
                                    }}
                                >
                                    <h3 style={{ color: "#fff" }}>
                                        {todoData.input}
                                    </h3>
                                    <Space size={"small"}>
                                        {todoData.isComplete ? (
                                            <CheckSquareOutlined
                                                style={{
                                                    ...styleIcon,
                                                    background: "#2a9d8f",
                                                }}
                                                onClick={() =>
                                                    props.handleComplete(index)
                                                }
                                            />
                                        ) : (
                                            <CloseSquareOutlined
                                                style={styleIcon}
                                                onClick={() =>
                                                    props.handleComplete(index)
                                                }
                                            />
                                        )}
                                        <EditOutlined
                                            style={styleIcon}
                                            onClick={() =>
                                                handleUpdateTodo(index)
                                            }
                                        />
                                    </Space>
                                </List.Item>
                            </Tooltip>
                        )}
                        style={listStyle}
                    />
                </TabPane>
                <TabPane tab="Completed" key={2}>
                    <List
                        size="small"
                        dataSource={props.todoList}
                        renderItem={(todoData, index) =>
                            todoData.isComplete ? (
                                <Tooltip
                                    placement="left"
                                    title={`${todoData.createDate}, ${todoData.createTime}`}
                                    key={index}
                                >
                                    <List.Item
                                        direction="horizontal"
                                        style={{
                                            ...listItemStyle,
                                            textDecoration:
                                                todoData.isComplete &&
                                                "line-through 4px #2a9d8f",
                                        }}
                                    >
                                        <h3 style={{ color: "#fff" }}>
                                            {todoData.input}
                                        </h3>
                                        <Space size={"small"}>
                                            {todoData.isComplete ? (
                                                <CheckSquareOutlined
                                                    style={{
                                                        ...styleIcon,
                                                        background: "#2a9d8f",
                                                    }}
                                                    onClick={() =>
                                                        props.handleComplete(
                                                            index
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <CloseSquareOutlined
                                                    style={styleIcon}
                                                    onClick={() =>
                                                        props.handleComplete(
                                                            index
                                                        )
                                                    }
                                                />
                                            )}
                                            <EditOutlined
                                                style={styleIcon}
                                                onClick={() =>
                                                    handleUpdateTodo(index)
                                                }
                                            />
                                        </Space>
                                    </List.Item>
                                </Tooltip>
                            ) : (
                                <></>
                            )
                        }
                        style={listStyle}
                    />
                </TabPane>
                <TabPane tab="UnComplete" key={3}>
                    <List
                        size="small"
                        dataSource={props.todoList}
                        renderItem={(todoData, index) =>
                            !todoData.isComplete ? (
                                <Tooltip
                                    placement="left"
                                    title={`${todoData.createDate}, ${todoData.createTime}`}
                                    key={index}
                                >
                                    <List.Item
                                        direction="horizontal"
                                        style={{
                                            ...listItemStyle,
                                            textDecoration:
                                                todoData.isComplete &&
                                                "line-through 4px #2a9d8f",
                                        }}
                                    >
                                        <h3 style={{ color: "#fff" }}>
                                            {todoData.input}
                                        </h3>
                                        <Space size={"small"}>
                                            {todoData.isComplete ? (
                                                <CheckSquareOutlined
                                                    style={{
                                                        ...styleIcon,
                                                        background: "#2a9d8f",
                                                    }}
                                                    onClick={() =>
                                                        props.handleComplete(
                                                            index
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <CloseSquareOutlined
                                                    style={styleIcon}
                                                    onClick={() =>
                                                        props.handleComplete(
                                                            index
                                                        )
                                                    }
                                                />
                                            )}
                                            <EditOutlined
                                                style={styleIcon}
                                                onClick={() =>
                                                    handleUpdateTodo(index)
                                                }
                                            />
                                        </Space>
                                    </List.Item>
                                </Tooltip>
                            ) : (
                                <></>
                            )
                        }
                        style={listStyle}
                    />
                </TabPane>
            </Tabs>
        </>
    );
}
export default TodoList;

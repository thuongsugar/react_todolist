import { useState, useRef, useContext, useEffect } from "react";
import { Space, Popover, Spin, Divider, Button, Avatar, Tooltip } from "antd";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import { Link, Outlet, useNavigate } from "react-router-dom";

import TodoForm from "./TodoForm";
import ToDoList from "./TodoList";
import TodoCount from "./TodoCount";

import { addTodoDB, updateTodoDB, deleteDocDB } from "../firebase/service";

import { AuthContext } from "../Context/AuthProvider";
import { auth, db } from "../firebase/config";
import { TimeContext } from "../Context/TimeProvider";
import SideBar from "./SideBar";
import { AppContext } from "../Context/AppProvider";
import ControllerGroup from "./group/ControllerGroup";

function TodoApp() {
    const user = useContext(AuthContext);
    const { selectedGroup, members, selectedGroupId } = useContext(AppContext);
    const [timeChoice, setTimeChoice] = useContext(TimeContext);
    const [todoList, setTodo] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const stateTodoForm = useRef();
    // const refModelLogin = useRef();

    useEffect(() => {
        console.log(selectedGroupId);
        if (user.user) {
            const todosRef = collection(db, "todos");
            console.log("query lai todo");
            console.log(selectedGroupId);

            const q = query(
                todosRef,
                selectedGroupId === "me"
                    ? (where("uid", "==", auth.currentUser.uid),
                      where("groupId", "==", "me"))
                    : where("groupId", "==", selectedGroupId),
                where("todoDate", "==", timeChoice),
                orderBy("input")
            );
            setLoading(true);
            const unsubscribed = onSnapshot(q, (querySnap) => {
                console.log(selectedGroupId);
                console.log(auth.currentUser.uid);
                console.log(querySnap);
                const document = querySnap.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(document);
                setTodo(document);
                setLoading(false);
                return () => {
                    console.log("unsubsc");
                    unsubscribed();
                };
            });
        } else {
            setTodo([]);
        }
    }, [user.user, timeChoice, selectedGroupId]);

    function addTodo(inputData, indexTodo) {
        if (!auth.currentUser) {
            navigate("/login");
            // refModelLogin.current();
        } else {
            if (inputData.input.trim().length > 0) {
                const timeCreate = new Date().toLocaleString("en-GB"); // dd/mm/yyy, hh:mm:ss
                let dataTime = {
                    todoDate: timeChoice,
                    createDate: timeCreate.split(",")[0],
                    createTime: timeCreate.split(",")[1],
                };
                //update todo
                if (typeof indexTodo !== "undefined") {
                    const todoUpdate = {
                        ...todoList[indexTodo],
                        input: inputData.input.trim(),
                    };
                    updateTodoDB(todoUpdate.id, todoUpdate);
                } else {
                    //new todo
                    addTodoDB({
                        ...inputData,
                        ...dataTime,
                        groupId: selectedGroupId,
                    });
                }
            }
        }
    }
    function stateFormInput(stateFormFun) {
        stateTodoForm.current = stateFormFun;
    }

    function handleComplete(index) {
        todoList[index].isComplete = !todoList[index].isComplete;
        updateTodoDB(todoList[index].id, todoList[index]);
    }
    function upDateTodoForm(indexTodo) {
        stateTodoForm.current({
            index: indexTodo,
            input: todoList[indexTodo].input,
        });
    }
    async function handleDeleteTodo() {
        const todoSelected = todoList.filter(
            (todo) => todo.isComplete === true
        );
        const idListSelected = todoSelected.map((todo) => todo.id);
        await deleteDocDB(idListSelected);
    }
    return (
        <div style={{ display: "flex", width: "70%", margin: "auto" }}>
            <SideBar />
            <Space
                direction="vertical"
                style={{
                    width: "80%",
                    // minHeight: "100vh",
                    height: "100vh",
                    // margin: "auto",
                    background: "rgba(0,0,0,0.411)",
                    padding: "10px 10px",
                    // marginTop: "50px",
                    borderRadius: "0 15px 15px 0",
                }}
            >
                <Space
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <h1 style={{ color: "#fffa" }}>TodoList</h1>
                    {user.user ? (
                        <div>
                            <Popover
                                content={<ControllerGroup />}
                                placement="rightTop"
                                // title={"Logout"}
                            >
                                <h2
                                    style={{
                                        color: "#fff",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                        margin: 0,
                                    }}
                                >
                                    {selectedGroup && selectedGroup.nameGroup}
                                </h2>
                            </Popover>
                            <Avatar.Group
                                maxCount={2}
                                size="small"
                                maxStyle={{
                                    color: "#f56a00",
                                    backgroundColor: "#fde3cf",
                                }}
                            >
                                {members.map((member) => (
                                    <Tooltip title={member.displayName}>
                                        <Avatar
                                            style={{
                                                background: `#${Math.floor(
                                                    Math.random() * 16777215
                                                ).toString(16)}`,
                                            }}
                                            key={member.uid}
                                        >
                                            {member.displayName &&
                                                member.displayName
                                                    .charAt(0)
                                                    .toLocaleUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </div>
                    ) : (
                        ""
                    )}
                </Space>
                <TodoForm addTodo={addTodo} stateFormInput={stateFormInput} />
                {isLoading ? (
                    <Spin
                        size="large"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    />
                ) : (
                    <>
                        <ToDoList
                            todoList={todoList}
                            handleComplete={handleComplete}
                            upDateTodoForm={upDateTodoForm}
                            handleDeleteTodo={handleDeleteTodo}
                            // handleSelectTodo={handleSelectTodo}
                        />
                        <TodoCount toDoList={todoList} />
                    </>
                )}
            </Space>
            <Outlet />
        </div>
    );
}
export default TodoApp;

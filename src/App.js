import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodoApp from "./Component/TodoApp";
import ShowInfo from "./Component/user/ShowInfo";
import ChangePassWord from "./Component/user/ChangePassWord";
import FormEditDisplayName from "./Component/user/FormEditDisplayName";
import FormEditEmail from "./Component/user/FormEditEmail";
import Login from "./Component/user/Login";
import Signin from "./Component/user/Signin";
import ProtectedRoute from "./Component/protected/ProtectedRoute";
import PublicRoute from "./Component/protected/PublicRoute";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoApp />}>
                    <Route
                        path="login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <PublicRoute>
                                <Signin />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="info"
                        element={
                            <ProtectedRoute>
                                <ShowInfo />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="edit-display-name"
                            element={<FormEditDisplayName />}
                        />
                        <Route path="edit-email" element={<FormEditEmail />} />
                    </Route>
                    <Route
                        path="change-password"
                        element={
                            <ProtectedRoute>
                                <ChangePassWord />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

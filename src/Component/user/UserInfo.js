import { Button, Divider, Popover } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Logout from "../user/Logout";

function UserInfo() {
    const user = useContext(AuthContext);
    return (
        <>
            {user.user ? (
                <Popover
                    content={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                color: "#333",
                            }}
                        >
                            <Link to="info">Info</Link>
                            <Link to="change-password">Change password</Link>
                            <Divider style={{ margin: 0 }} />
                            <Logout />
                        </div>
                    }
                    placement="rightTop"
                >
                    <h2
                        style={{
                            color: "#fff",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        {user.user.displayName}
                    </h2>
                </Popover>
            ) : (
                <Link to="login">
                    <Button ghost>Login</Button>
                </Link>
            )}
        </>
    );
}

export default UserInfo;

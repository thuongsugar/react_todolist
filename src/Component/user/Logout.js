import React from "react";
import { Space } from "antd";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
function Logout() {
    return (
        <span style={{ cursor: "pointer" }} onClick={() => signOut(auth)}>
            Logout
        </span>
    );
}

export default Logout;

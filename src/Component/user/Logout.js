import React from "react";
import { Space } from "antd";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
function Logout() {
    return (
        <p
            style={{ fontWeight: 500, cursor: "pointer" }}
            onClick={() => signOut(auth)}
        >
            Logout
        </p>
    );
}

export default Logout;

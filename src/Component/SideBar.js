import { Col, Row } from "antd";
import React from "react";
import Group from "./group/Group";
import UserInfo from "./user/UserInfo";

function SideBar() {
    return (
        <div
            style={{
                background: "rgba(0, 0, 0,0.411)",
                width: "20%",
                padding: "10px",
                boxShadow: "-1px 1px 8px 1px #999",
            }}
        >
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <Group />
                </Col>
            </Row>
        </div>
    );
}

export default SideBar;

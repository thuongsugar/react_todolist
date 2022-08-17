import { message } from "antd";
function handleError(codeError) {
    switch (codeError) {
        case "auth/wrong-password":
            return message.error("Wrong password");
        case "auth/user-not-found":
            return message.error("User not found");
        case "auth/email-already-in-use":
            return message.error("Email already in use");
        case "auth/weak-password":
            return message.info("Weak password");
        case "auth/invalid-email":
            return message.error("Invalid email");
        case "auth/requires-recent-login":
            return message.error("Requires back login");
        case "success":
            return message.success("Success");

        default:
            break;
    }
}
export default handleError;

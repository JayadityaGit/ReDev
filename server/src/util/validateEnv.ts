import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    MONGO: str(),
    PORT: port(),
    SECRET: str(),
})
import express, { NextFunction,  Response, Request } from "express";
import router from "./routes/PropertyRoutes";
import createHttpError, {isHttpError} from "http-errors";
import morgan from "morgan";
import userRouter from "./routes/UserRoutes";
import session from "express-session"
import "dotenv/config"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo";
import { requriesAuth } from "./middleware/auth";
import cors from "cors"

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(morgan("dev"))
app.use(express.json());



app.use(session({
    secret: env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:  60 * 60 * 1000,
        sameSite: "lax",
    },

    

    rolling: true,
    store: MongoStore.create({mongoUrl: env.MONGO}),
}))



app.use("/users", userRouter)
app.use("/", requriesAuth, router)


app.use((req, res, next)=>{
     next(createHttpError(404, "Endpoint not found"))
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {

    console.error(error);

    let errorMessage = "An unknown error occurred, or please check the internet connection";

    let statusCode = 500;

    if(isHttpError(error)){

          errorMessage = error.message;
          statusCode = error.status;

    }

    res.status(statusCode).json({error: errorMessage})
    
})



export default app;
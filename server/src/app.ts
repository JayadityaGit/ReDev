import express, { NextFunction,  Response, Request } from "express";
import router from "./routes/PropertyRoutes";
import createHttpError, {isHttpError} from "http-errors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use("/", router)


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
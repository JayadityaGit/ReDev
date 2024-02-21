import app from "./app";
import "dotenv/config"
import env from "./util/validateEnv"
import mongoose from "mongoose";



const port = env.PORT;


async function connectMongo() {
    try {

        await mongoose.connect(env.MONGO);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })

        console.log("MongoDB connected");
        
    } catch (error) {
        console.error(error)
    }
}


connectMongo()





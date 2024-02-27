import { Router } from "express";
import { getPropertyByCity } from "../controller/PropertyController";


 const propertyRouter = Router();


propertyRouter.post("/city", getPropertyByCity);



export default propertyRouter;
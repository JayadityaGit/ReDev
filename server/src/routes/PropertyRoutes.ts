import { Router } from "express";
import { getPropertyByCity, getPropertyByFilters } from "../controller/PropertyController";


 const propertyRouter = Router();


propertyRouter.post("/city", getPropertyByCity);

propertyRouter.post("/filters", getPropertyByFilters)



export default propertyRouter;
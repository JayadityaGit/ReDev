import { Router } from "express";
import { createProperty, deleteProperty, getOwnedProperties, updateProperty } from "../controller/AuthPropertyController";




const authPropertyrouter = Router();



authPropertyrouter.get("/getOwnedProperties", getOwnedProperties);
authPropertyrouter.post("/createProperty", createProperty);
authPropertyrouter.patch("/updateProperty/:id", updateProperty)
authPropertyrouter.delete("/deleteProperty/:id", deleteProperty)



export default authPropertyrouter;
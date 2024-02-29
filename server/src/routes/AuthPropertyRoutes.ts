import { Router } from "express";
import { addToLibrary, createProperty, deleteProperty, getLibrary, getOwnedProperties, removeFromLibrary, updateProperty } from "../controller/AuthPropertyController";




const authPropertyrouter = Router();



authPropertyrouter.get("/getOwnedProperties", getOwnedProperties);
authPropertyrouter.post("/createProperty", createProperty);
authPropertyrouter.patch("/updateProperty/:id", updateProperty)
authPropertyrouter.delete("/deleteProperty/:id", deleteProperty)
authPropertyrouter.post("/addToLibrary", addToLibrary)
authPropertyrouter.get("/getLibrary", getLibrary)
authPropertyrouter.post("/removeFromLibrary", removeFromLibrary)


export default authPropertyrouter;
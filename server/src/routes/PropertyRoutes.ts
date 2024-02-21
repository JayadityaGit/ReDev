import { Router } from "express";
import { createProperty, deleteProperty, getallProperties, updateProperty } from "../controller/PropertyController";



const router = Router();



router.get("/getAllProperties", getallProperties);
router.post("/createProperty", createProperty);
router.patch("/updateProperty/:id", updateProperty)
router.delete("/deleteProperty/:id", deleteProperty)



export default router;
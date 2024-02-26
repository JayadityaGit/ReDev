import { Router } from "express";
import { createProperty, deleteProperty, getOwnedProperties, updateProperty } from "../controller/PropertyController";




const router = Router();



router.get("/getOwnedProperties", getOwnedProperties);
router.post("/createProperty", createProperty);
router.patch("/updateProperty/:id", updateProperty)
router.delete("/deleteProperty/:id", deleteProperty)



export default router;
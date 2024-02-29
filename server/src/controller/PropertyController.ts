import { RequestHandler } from "express";
import createHttpError from "http-errors";
import PropertyModel from "../model/PropertyModel";


export const getPropertyByCity: RequestHandler = async (req, res, next) => {


    try {
        
        const city = req.body.city;

        if(!city){
            throw createHttpError(400, "Please provide city");
        }
        const response = await PropertyModel.find({city: city}).exec();

        if(response.length === 0){
            throw createHttpError(404, "No properties found in this area");
        }

        res.status(200).json(response);

    } catch (error) {
        next(error)
    }
    
}
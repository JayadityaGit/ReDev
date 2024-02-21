import { RequestHandler } from "express";
import PropertyModel from "../model/PropertyModel";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getallProperties: RequestHandler = async(req, res, next) => {

    try {
    //throw createHttpError(500, "Internal Server Error");
    const properties = await PropertyModel.find().exec();
    res.status(200).json(properties)

    } catch (error) {
        next(error)
    }

}


interface CreatePropertyRequest {
    images2D: string[];
    panaromaImages?: string[];
    is3D: boolean;
    Type: string;
    buyType: string;
    coordinates: number[];
    price: number;
    address: string;
    city: string;
    state: string;
    emi: string;
    priceSqft: number;
    bed: number;
    bath: number;
    sqft: number;
    phone: number;
    email: string;
    seller: string;
}



export const createProperty: RequestHandler<unknown, unknown, CreatePropertyRequest, unknown> = async(req, res, next) => {

    try {

        const {images2D, panaromaImages, is3D, Type, buyType, coordinates, price, address, city, state, emi, priceSqft, bed, bath, sqft, phone, email, seller} = req.body;


        if(!images2D ||images2D.length === 0){
            throw createHttpError(400, "Please provide atleast one image")
        }

        
        if(!Type || Type.length === 0){
            throw createHttpError(400, "Please provide valid property type")
        }

        if(!buyType || buyType.length === 0){
            throw createHttpError(400, "Please provide valid ownership type")
        }


        if(!coordinates || coordinates.length !== 2){
            throw createHttpError(400, "Please provide valid coordinates")
        }


        if(!price||price <= 0){
            throw createHttpError(400, "Please provide valid price")
        }


        if(!address||address.length === 0){
            throw createHttpError(400, "Please provide valid address")
        }


        if(!city || city.length === 0){
            throw createHttpError(400, "Please provide valid city")
        }


        if( !state ||  state.length === 0){
            throw createHttpError(400, "Please provide valid state")
        }


        if( !emi || emi.length === 0){
            throw createHttpError(400, "Please provide valid emi, if emi is not present please make it 0")
        }
        

        if(!priceSqft || priceSqft <= 0){
            throw createHttpError(400, "Please provide valid price per sqft")
        }


        if(!bed || bed < 0){
            throw createHttpError(400, "Please provide details for the number of bedrooms")
        }


        if(!bath || bath < 0){
            throw createHttpError(400, "Please provide details for the number of bathrooms")
        }

        if(!sqft || sqft < 0){
            throw createHttpError(400, "Please provide details for the area in sqft")
        }


        if(!phone || phone <= 0){
            throw createHttpError(400, "Please provide valid phone number")
        }

        if(!email || email.length === 0){
            throw createHttpError(400, "Please provide valid email")
        }


        if(!seller || seller.length === 0){
            throw createHttpError(400, "Please provide the name of the seller")
        }

        const newProperty = await PropertyModel.create({
            images2D: images2D ,
            panaromaImages:panaromaImages ,
            is3D:is3D ,
            Type: Type,
            buyType: buyType,
            coordinates: coordinates,
            price: price,
            address: address,
            city: city,
            state: state,
            emi: emi,
            priceSqft: priceSqft,
            bed: bed,
            bath: bath,
            sqft: sqft,
            phone: phone,
            email: email,
            seller: seller
        })


        res.status(201).json(newProperty);
        
    } catch (error) {
        next(error)
    }
    
}



export const updateProperty: RequestHandler = async(req, res, next) => {

    try {

        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Please provide valid id")
        }


        const {images2D, panaromaImages, is3D, Type, buyType, coordinates, price, address, city, state, emi, priceSqft, bed, bath, sqft, phone, email, seller} = req.body;

        

        if(!images2D ||images2D.length === 0){
            throw createHttpError(400, "Please provide atleast one image")
        }

        
        if(!Type || Type.length === 0){
            throw createHttpError(400, "Please provide valid property type")
        }

        if(!buyType || buyType.length === 0){
            throw createHttpError(400, "Please provide valid ownership type")
        }


        if(!coordinates || coordinates.length !== 2){
            throw createHttpError(400, "Please provide valid coordinates")
        }


        if(!price||price <= 0){
            throw createHttpError(400, "Please provide valid price")
        }


        if(!address||address.length === 0){
            throw createHttpError(400, "Please provide valid address")
        }


        if(!city || city.length === 0){
            throw createHttpError(400, "Please provide valid city")
        }


        if( !state ||  state.length === 0){
            throw createHttpError(400, "Please provide valid state")
        }


        if( !emi || emi.length === 0){
            throw createHttpError(400, "Please provide valid emi, if emi is not present please make it 0")
        }
        

        if(!priceSqft || priceSqft <= 0){
            throw createHttpError(400, "Please provide valid price per sqft")
        }


        if(!bed || bed < 0){
            throw createHttpError(400, "Please provide details for the number of bedrooms")
        }


        if(!bath || bath < 0){
            throw createHttpError(400, "Please provide details for the number of bathrooms")
        }

        if(!sqft || sqft < 0){
            throw createHttpError(400, "Please provide details for the area in sqft")
        }


        if(!phone || phone <= 0){
            throw createHttpError(400, "Please provide valid phone number")
        }

        if(!email || email.length === 0){
            throw createHttpError(400, "Please provide valid email")
        }


        if(!seller || seller.length === 0){
            throw createHttpError(400, "Please provide the name of the seller")
        }


        const updatedProperty = await PropertyModel.findByIdAndUpdate(id, {
            images2D: images2D ,
            panaromaImages:panaromaImages ,
            is3D:is3D ,
            Type: Type,
            buyType: buyType,
            coordinates: coordinates,
            price: price,
            address: address,
            city: city,
            state: state,
            emi: emi,
            priceSqft: priceSqft,
            bed: bed,
            bath: bath,
            sqft: sqft,
            phone: phone,
            email: email,
            seller: seller
        }, {new: true})


        if(!updatedProperty){
             throw createHttpError(404, "server could not edit the property")
        }


        res.status(200).json(updatedProperty);
        

        
        
        
    } catch (error) {
        next(error)
    }
    
}



export const deleteProperty: RequestHandler = async(req, res, next) => {

    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)){
               throw createHttpError(400, "property does not exist")
        }

        const deletedProperty = await PropertyModel.findByIdAndDelete(id);

        if(!deletedProperty){
            throw createHttpError(404, "server could not delete the property")
        }

        res.status(200).json(deletedProperty)

    } catch (error) {
        next(error)
    }
    


}




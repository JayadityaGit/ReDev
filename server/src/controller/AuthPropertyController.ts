import { RequestHandler } from "express";
import PropertyModel from "../model/PropertyModel";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getOwnedProperties: RequestHandler = async(req, res, next) => {

    try {
    //throw createHttpError(500, "Internal Server Error");

    const authenticatedUserId = req.session.userId;

    const properties = await PropertyModel.find({userId: authenticatedUserId}).exec();
    res.status(200).json(properties)

    } catch (error) {
        next(error)
    }

}


interface CreatePropertyRequest {
    images2D: string[];
    panaromaImages?: string[];
    Type: string;
    buyType: string;
    price: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    emi: string;
    priceSqft: string;
    bed: string;
    bath: string;
    sqft: string;
    phone: string;
    email: string;
    seller: string;
    virtualTours?: string;
}



export const createProperty: RequestHandler<unknown, unknown, CreatePropertyRequest, unknown> = async(req, res, next) => {

    try {

        const {images2D, panaromaImages, Type, buyType, price, address, city, state, zip, emi, priceSqft, bed, bath, sqft, phone, email, seller, virtualTours} = req.body;


        if(!images2D ||images2D.length === 0){
            throw createHttpError(400, "Please provide atleast one image")
        }

        
        if(!Type || Type.length === 0){
            throw createHttpError(400, "Please provide valid property type")
        }

        if(!buyType || buyType.length === 0){
            throw createHttpError(400, "Please provide valid ownership type")
        }


        if(!price||price.length === 0){
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

        if(!zip || zip.length===0){
            throw createHttpError(400, "Please provide valid zip")
        }


        if( !emi || emi.length === 0){
            throw createHttpError(400, "Please provide valid emi, if emi is not present please make it 0")
        }
        

        if(!priceSqft || priceSqft.length <= 0){
            throw createHttpError(400, "Please provide valid price per sqft")
        }


        if(!bed || bed.length <= 0){
            throw createHttpError(400, "Please provide details for the number of bedrooms")
        }


        if(!bath || bath.length <= 0){
            throw createHttpError(400, "Please provide details for the number of bathrooms")
        }

        if(!sqft || sqft.length <= 0){
            throw createHttpError(400, "Please provide details for the area in sqft")
        }


        if(!phone || phone.length <= 0){
            throw createHttpError(400, "Please provide valid phone number")
        }

        if(!email || email.length === 0){
            throw createHttpError(400, "Please provide valid email")
        }


        if(!seller || seller.length === 0){
            throw createHttpError(400, "Please provide the name of the seller")
        }

        const newProperty = await PropertyModel.create({
            userId: req.session.userId,
            images2D: images2D ,
            panaromaImages:panaromaImages ,
            is3D:panaromaImages || virtualTours ? true : false,
            Type: Type,
            buyType: buyType,
            price: price,
            address: address,
            city: city,
            state: state,
            zip: zip,
            emi: emi,
            priceSqft: priceSqft,
            bed: bed,
            bath: bath,
            sqft: sqft,
            phone: phone,
            email: email,
            seller: seller,
            virtualTours: virtualTours
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


        const {images2D, panaromaImages,  Type, buyType, price, address, city, state, zip, emi, priceSqft, bed, bath, sqft, phone, email, seller, virtualTours} = req.body;

        

        if(!images2D ||images2D.length === 0){
            throw createHttpError(400, "Please provide atleast one image")
        }

        
        if(!Type || Type.length === 0){
            throw createHttpError(400, "Please provide valid property type")
        }

        if(!buyType || buyType.length === 0){
            throw createHttpError(400, "Please provide valid ownership type")
        }


       

        if(!price||price.length <= 0){
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

        if(!zip || zip.length <= 0){
            throw createHttpError(400, "Please provide valid zip")
        }


        if( !emi || emi.length === 0){
            throw createHttpError(400, "Please provide valid emi, if emi is not present please make it 0")
        }
        

        if(!priceSqft || priceSqft.length <= 0){
            throw createHttpError(400, "Please provide valid price per sqft")
        }


        if(!bed || bed.length <= 0){
            throw createHttpError(400, "Please provide details for the number of bedrooms")
        }


        if(!bath || bath.length <= 0){
            throw createHttpError(400, "Please provide details for the number of bathrooms")
        }

        if(!sqft || sqft.length <= 0){
            throw createHttpError(400, "Please provide details for the area in sqft")
        }


        if(!phone || phone.length <= 0){
            throw createHttpError(400, "Please provide valid phone number")
        }

        if(!email || email.length === 0){
            throw createHttpError(400, "Please provide valid email")
        }


        if(!seller || seller.length === 0){
            throw createHttpError(400, "Please provide the name of the seller")
        }


        const updatedProperty = await PropertyModel.findByIdAndUpdate(id, {
            userId: req.session.userId,
            images2D: images2D ,
            panaromaImages:panaromaImages ,
            is3D: panaromaImages || virtualTours ? true : false,
            Type: Type,
            buyType: buyType,
            price: price,
            address: address,
            city: city,
            state: state,
            zip: zip,
            emi: emi,
            priceSqft: priceSqft,
            bed: bed,
            bath: bath,
            sqft: sqft,
            phone: phone,
            email: email,
            seller: seller,
            virtualTours: virtualTours,
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




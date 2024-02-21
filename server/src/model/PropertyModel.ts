import { InferSchemaType, Schema, model } from "mongoose";


const propertySchema = new Schema({
    images2D: {type: [String], required: true},
    panaromaImages: {type: [String]},
    is3D: {type: Boolean, required: true},
    Type: {type: String, required: true},
    buyType: {type: String, required: true},
    coordinates: {type: [Number], required: true, unique: true},
    price: {type: Number, required: true},
    address: {type: String, required: true, unique: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    emi: {type: String, required: true},
    priceSqft: {type: Number, required: true},
    bed: {type: Number, required: true},
    bath: {type: Number, required: true},
    sqft: {type: Number, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    seller: {type: String, required: true},

}, {timestamps: true})


type Property = InferSchemaType<typeof propertySchema>;

export default model<Property>("Property", propertySchema)
import { InferSchemaType, Schema, model } from "mongoose";


const propertySchema = new Schema({

    userId: {type: Schema.Types.ObjectId, required: true},
    images2D: {type: [String], required: true},
    panaromaImages: {type: [String]},
    is3D: {type: Boolean, required: true},
    Type: {type: String, required: true},
    buyType: {type: String, required: true},
    price: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    emi: {type: String, required: true},
    priceSqft: {type: String, required: true},
    bed: {type: String, required: true},
    bath: {type: String, required: true},
    sqft: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    seller: {type: String, required: true},
    virtualTours:{type: String},
    videoTours:{type: String},

}, {timestamps: true})


type Property = InferSchemaType<typeof propertySchema>;

export default model<Property>("Property", propertySchema)
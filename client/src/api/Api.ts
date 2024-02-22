import { PropertyModel } from "../models/Property";

async function getDataOrError(input: RequestInfo, init?: RequestInit) {

    const response = await fetch(input, init);

    if(response.ok){
        return response;
    }else{
        const errorBody = await response.json();
        throw new Error(errorBody.error);
    }

}




export async function getAllProperties() {

    const response = await getDataOrError("/getAllProperties", {method: "GET"});

    const data = await response.json();

    return data;
    
}


export interface PropertyInput {
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
    virtualTours?: string;
}

export async function createProperty(property: PropertyInput): Promise<PropertyModel> {

    const response = await getDataOrError("/createProperty", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    
    
    });
    
    const data = await response.json();

    return data;
}
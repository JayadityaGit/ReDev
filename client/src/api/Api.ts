import { PropertyModel } from "../models/Property";
import { User } from "../models/user";

async function getDataOrError(input: RequestInfo, init?: RequestInit) {

    const response = await fetch(input, {...init, credentials: "include"});

    if(response.ok){
        return response;
    }else{
        const errorBody = await response.json();

        const message: string = errorBody.error;

        throw message;
    }

}


export async function getLibrary() {

    const response = await getDataOrError("http://localhost:5000/getLibrary", {method: "GET"});

    const data = await response.json();

    return data;
    
}


export async function addToLibrary(property: PropertyModel) {
    const response = await getDataOrError("http://localhost:5000/addToLibrary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({property: property})
    })

    const data = await response.json();

    return data;
}

export async function removeFromLibrary(propertyId: string) {
    const response = await getDataOrError("http://localhost:5000/removeFromLibrary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: propertyId})
    })

    const data = await response.json();

    return data;
}



export async function getOwnedProperties() {

    const response = await getDataOrError("http://localhost:5000/getOwnedProperties", {method: "GET"});

    const data = await response.json();

    return data;
    
}


export async function deleteOwnedProperty(id: string): Promise<PropertyModel> {

    const response = await getDataOrError("http://localhost:5000/deleteProperty/" + id, {method: "DELETE"});

    const data = await response.json();

    return data;
    
}


export async function getLoggedInUser(): Promise<User> {
    const response = await getDataOrError("http://localhost:5000/users/getUser", {method: "GET"});

    return response.json();
}


export interface SignUpCredintials {
    username: string;
    email: string;
    password: string
}


export async function signUp(credentials: SignUpCredintials) {

    const response = await getDataOrError("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });


    return response.json()
    
}


export interface LoginCredintials {
    username: string;
    password: string
}


export async function login(credentials: LoginCredintials) {
    const response = await getDataOrError("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(credentials)

    })

    return response.json()
}

export async function logout() {

    await getDataOrError("http://localhost:5000/users/logout", {method: "POST"});
    
}


export interface PropertyInput {
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

export async function createProperty(property: PropertyInput): Promise<PropertyModel> {


    


    const response = await getDataOrError("http://localhost:5000/createProperty", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    
    
    });
    
    const data = await response.json();

    return data;
}



export async function updateProperty(property: unknown, id: string): Promise<PropertyModel> {

    const response = await getDataOrError("http://localhost:5000/updateProperty/"+id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    
    });

    const data = await response.json();

    return data;
    
}



export async function getPropertiesByCity(city: string): Promise<PropertyModel[]> {
    
    const response = await getDataOrError("http://localhost:5000/properties/city", {
        
    method: "POST",

    headers:{
        "Content-Type": "application/json",
    },

    
    body: JSON.stringify({city: city})


});
    const data = await response.json();
    return data;
}
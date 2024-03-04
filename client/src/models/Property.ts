export interface PropertyModel {
    _id: string;
    userId: string,
    images2D: string[];
    panaromaImages: string[];
    is3D: boolean;
    Type: string;
    buyType: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zip: number;
    emi: number;
    priceSqft: number;
    bed: number;
    bath: number;
    sqft: number;
    phone: string;
    email: string;
    seller: string;
    virtualTours: string;
    videoTours: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
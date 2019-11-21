import { IsString, IsInt, IsDate, IsNumber } from 'class-validator';

export interface ProductArgs {
    name: string;
    industry: string;
    price: string;
    quantity: string;
    date_added: Date;
    date_update: Date;
}


export interface ProductSearch {
    productId: string;
}
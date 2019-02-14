import { product } from './product';

export interface CartState {
            id: any,
            products : product[],
            totalPrice : number,
            date: any
}
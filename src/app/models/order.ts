import { product } from './product';

export class Order {
    constructor(
        public id : number, 
        public date : any,
        public name : string, 
        public email : string,
        public address : string,
        public phone : string,
        public products : string
    ) {}
}
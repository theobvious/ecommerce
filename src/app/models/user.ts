export class User {
    constructor(
        public name : string, 
        public email : string,
        public role : string, 
        public city : string,
        public street : string, 
        public username : string,
        public password : string,
        public tz : number
    ) {}
}
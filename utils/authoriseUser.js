import jwt from "jsonwebtoken";
import SECREAT_KEY from "../data/secreateKey";
import Cookies from "cookies";

export default async function handler(req){
    try {

        const cookie = new Cookies(req);
        const token = cookie.get("token");
    
        if(token){
            jwt.verify(token, SECREAT_KEY);
            console.log("token verified");

            const decodedToken = jwt.decode(token)
            return decodedToken;
        } else {
            return null;
        }
    } catch(err){
        console.log(err);
        return null;
    }
}
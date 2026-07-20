import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { CLIENT_RENEG_LIMIT } from "tls";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:`${process.env.JWT_ACCESS_SECRET}`
        })
    }

    validate(payload:any) {
        
        return payload
    }
}
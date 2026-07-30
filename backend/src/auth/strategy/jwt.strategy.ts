import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.accessToken;
        },
      ]),
     secretOrKey:`${process.env.JWT_ACCESS_SECRET}`
    });
  }

  validate(payload: any) {
    return payload;
  }
}

// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy,ExtractJwt } from "passport-jwt";


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
//     constructor(){
//         super({
//             jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey:`${process.env.JWT_ACCESS_SECRET}`
//         })
//     }

//     validate(payload:any) {
        
//         return payload
//     }
// }

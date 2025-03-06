import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
    signin(dto: AuthDto){
        console.log({dto})
        return "service: you have signed in."
    }
}

import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
    signin(dto: AuthDto){
        return "service: you have signed in."
    }
    signup(dto: AuthDto){
        return "service: you have signed up"
    }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from 'src/auth/dto';



const prisma = new PrismaClient({
    omit: {
        user: {
            hash: true
        }
    }
})
@Injectable()
export class UsersService {
    async findOne(dto: AuthDto) {
        console.log('user service: call findOne()')
        try {
            // find user
            const { hash, ...user } = await prisma.user.findUniqueOrThrow({
                where: {
                    email: dto.email
                },
                omit: {
                    hash: false
                },
            })
            return { hash, user }
        }
        catch (error) {
            throw new ForbiddenException(error)
        }
    }

}

import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth"
import jwt, { JwtPayload } from 'jsonwebtoken'
import CustomError from "../utils/CustomError"

const signature = <string> process.env.TOKEN_SIGNATURE 

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] || ''

    // authentication scheme: Bearer token
    try {
        if (!auth.toLowerCase().startsWith('bearer') && 
            auth.split(' ').length !== 2) {
            throw new CustomError('Invalid bearer token.', 400)
        }
        
        const token = auth.split(' ')[1] // Bearer[0] jf8jf8rf9ff4[1]
        
        // verify token is valid
        jwt.verify(token, signature, (err, decoded) => {
            if (err) {
                throw new CustomError('Invalid session.', 401)
            }
            // add property to request object that contains token payload
            (req as AuthRequest).user = <JwtPayload> decoded 
        })
        
        return next()
    } catch (error) {
        next(error)
    }
}


import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth"
import jwt, { JwtPayload } from 'jsonwebtoken'
import CustomError from "../utils/CustomError"

const signature = <string> process.env.TOKEN_SIGNATURE 

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] || ''

    // Esquema de autenticacion Bearer token
    try {
        if (!auth.toLowerCase().startsWith('bearer') && auth.split(' ').length !== 2) {
            throw new CustomError('Bearer token invalido', 400)
        }
        
        const token = auth.split(' ')[1] // Bearer[0] jf8jf8rf9ff4[1]
        
        // Verificando que el token sea valido
        jwt.verify(token, signature, (err, decoded) => {
            if (err) {
                throw new CustomError('Sesion invalida', 401)
            }
            // Asignando datos del token a objeto Request
            (req as AuthRequest).user = <JwtPayload> decoded 
        })
        
        return next()
    } catch (error) {
        next(error)
    }
}
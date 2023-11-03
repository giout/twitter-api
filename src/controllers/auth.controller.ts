import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { validatePassword } from "../utils/validation"
import { encrypt } from "../utils/bcrypt"
import { createUser, findUserByAlias } from "../services/users.service"

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { alias, firstName, lastName, biography, password } = req.body

        const user = await findUserByAlias(alias)

        if(user) 
            throw new CustomError('El usuario ya existe', 400)

        // validacion de campos vacios
        if (!(alias && firstName && lastName && biography && password))
            throw new CustomError('Faltan campos por enviar.', 400)

        // validacion de clave
        if (!validatePassword(password))
            throw new CustomError('La clave debe contener 8 caracteres minimo, una letra y 1 numero', 400)

        password = encrypt(password) // encriptacion de clave

        await createUser(alias, firstName, lastName, biography, password)

        res.status(201).json({alias, firstName, lastName, biography, password})
    } catch(e) {
        next(e)
    }
}

export const logIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        // verificar si usuario existe
        // verificar si la clave concuerda
        // crear y enviar token de autenticacion    
    } catch(e) {
        next(e)
    }
}
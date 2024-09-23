import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { validatePassword } from "../utils/validation"
import { compareCrypted, encrypt } from "../utils/bcrypt"
import { createUser, findUserByAlias } from "../services/users.service"
import jwt from "jsonwebtoken"

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { alias, first_name, last_name, biography, password } = req.body

        const user = await findUserByAlias(alias)

        if (user)
            throw new CustomError('User already exists.', 400)

        // validate empty fields
        if (!(alias && first_name && last_name && biography && password))
            throw new CustomError('Data is missing.', 400)

        // validate password
        if (!validatePassword(password))
            throw new CustomError('Password must contain at least 8 characters, letters and numbers.', 400)

        password = encrypt(password) // encrypt password

        const createdUser = await createUser(alias, first_name, last_name, biography, password)

        res.status(201).json(createdUser)
    } catch(e) {
        next(e)
    }
}

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { alias, password } = req.body
        
        // verify if user exists
        const user = await findUserByAlias(alias)

        if (!user)
            throw new CustomError('User does not exist.', 404)
        
        // verify if password matches
        const equals = compareCrypted(password, user.password)

        if (!equals) 
            throw new CustomError('Password is invalid.', 401)

        // create and send authentication token  
        const signature = <string> process.env.TOKEN_SIGNATURE

        const payload = { id: user.user_id} // token data

        const token = jwt.sign(payload, signature, { 
            expiresIn: 60*60*24*30 // 1 month
        })

        res.status(200).json({ token })
    } catch(e) {
        next(e)
    }
}

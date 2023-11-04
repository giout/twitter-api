import { NextFunction, Request, Response } from "express"
import { deleteUser, findUserByPk, findUsers, updateUserByPk } from "../services/users.service"
import { AuthRequest } from "../types/auth"
import CustomError from "../utils/CustomError"
import { encrypt } from "../utils/bcrypt"
import { findTweetByPk, findTweetsByUser } from "../services/tweets.service"

// falta paginacion
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const param = <string> req.query.search
        const users = await findUsers(param)
        res.status(200).json(users)
    } catch(e) {
        next(e)
    }
}

export const getAuthUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene payload del token
        const { user } = (req as AuthRequest)
        res.status(200).json({ id: user.id })
    } catch(e) {
        next(e)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await userExists(id)
        res.status(200).json(user)
    } catch(e) {
        next(e)
    }   
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        
        await userExists(id)
        userIsAuth(req, id)

        const { password } = req.body

        if (password)
            req.body.password = encrypt(password)
    
        const updatedUser = await updateUserByPk(id, req.body)
        res.status(200).json(updatedUser)
    } catch(e) {
        next(e)
    }
}

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        
        userExists(id)
        userIsAuth(req, id)
        
        await deleteUser(id) 
        res.status(200).end()
    } catch(e) {
        next(e)
    }
}

// filtrado
// paginacion
export const getUserTweets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        await userExists(id)
        const tweets = await findTweetsByUser(id)

        res.status(200).json(tweets)
    } catch(e) {
        next(e)
    }
}


// paginacion
// filtrado
export const getUserFollowers = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene id por parametro pasivo
        // busca en base de datos
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}

// paginacion
// filtrado
export const getUserFollowing = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene id por parametro pasivo
        // busca en base de datos
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}

// paginacion
// filtrado
export const getUserFeed = (req: Request, res: Response, next: NextFunction) => {
    try {   
        // obtiene id por parametro pasivo
        // busca en base de datos
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}

export const userExists = async (id: string) => {
    const user = await findUserByPk(id)
    
    if (!user)
        throw new CustomError('El usuario no existe', 400)

    return user
}

// verifica si el id del usuario autenticado es igual al id ingresado
export const userIsAuth = (req: Request, id: string) => {
    const { user } = (req as AuthRequest)

    if (user.id != id) 
        throw new CustomError('No esta permitido crear, actualizar o eliminar datos de un usuario diferente al autenticado', 400)
}
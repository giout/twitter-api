import { NextFunction, Request, Response } from "express"
import { deleteUser, findUserByPk, findUsers } from "../services/users.service"

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

export const getAuthUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene payload del token
        // obtiene id del usuario
        // busca en base de datos
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}

export const getUserByPk = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await findUserByPk(id)
        res.status(200).json(user)
    } catch(e) {
        next(e)
    }   
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene id por parametro pasivo
        // obtiene body del request
        // actualiza en base de datos
    } catch(e) {
        next(e)
    }
}

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await deleteUser(id) 
        res.status(200).end()
    } catch(e) {
        next(e)
    }
}

// paginacion
export const getUserTweets = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}

// paginacion
export const getUserFeed = (req: Request, res: Response, next: NextFunction) => {
    try {   
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}

// paginacion
export const getUserFollowers = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}

// paginacion
export const getUserFollowing = (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    } catch(e) {
        next(e)
    }
}
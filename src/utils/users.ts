import { findUserByPk } from '../services/users.service'
import { AuthRequest } from '../types/auth'
import { Request } from 'express'
import CustomError from './CustomError'
import { findFollow } from '../services/follows.service'

export const userExists = async (id: string) => {
    const user = await findUserByPk(id)
    
    if (!user)
        throw new CustomError('User does not exist.', 404)

    return user
}

// verifica si el id del usuario autenticado es igual al id ingresado
export const userIsAuth = (req: Request, id: string) => {
    const { user } = (req as AuthRequest)

    if (user.id != id) 
        throw new CustomError('It is not allowed to create, update or delete data of a user that is not authenticated.', 401)
}

export const verifyFollow = async (req: Request, users: any[]) => {
    const { user } = (req as AuthRequest)

    for (let i=0; i<users.length; i++) {
        const follow = await findFollow(user.id, users[i].user_id)
        users[i]['following'] = follow != undefined
    }
}
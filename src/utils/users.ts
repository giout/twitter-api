import { findPostByPk } from '../services/posts.service'
import { findTweetByPk } from '../services/tweets.service'
import { findUserByPk } from '../services/users.service'
import { AuthRequest } from '../types/auth'
import { Request } from 'express'
import CustomError from './CustomError'

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
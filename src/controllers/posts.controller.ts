import { findPostByPk } from '../services/posts.service'
import CustomError from '../utils/CustomError'

// los tweets y comentarios pertenecen a la misma entidad (posts), y en algunos escenarios seran tratados por igual
export const postExists = async (id: string) => {
    const post = await findPostByPk(id)

    if (!post)
        throw new CustomError('La publicacion no existe', 400)
}
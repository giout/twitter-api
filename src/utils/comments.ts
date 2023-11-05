import { findCommentByPk } from "../services/comments.service"
import CustomError from "./CustomError"

export const commentExists = async (id: string) => {
    const comment = await findCommentByPk(id)
    if (!comment)
        throw new CustomError('El comentario no existe', 400)

    return comment   
}
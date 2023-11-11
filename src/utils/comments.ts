import { findCommentByPk } from "../services/comments.service"
import CustomError from "./CustomError"

export const commentExists = async (id: string) => {
    const comment = await findCommentByPk(id)
    if (!comment)
        throw new CustomError('Comment does not exist.', 400)

    return comment   
}
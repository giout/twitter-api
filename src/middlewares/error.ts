import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    res.status(500).json({ msg: "Internal server error." })
}

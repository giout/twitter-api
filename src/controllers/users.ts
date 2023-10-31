import { NextFunction, Request, Response } from "express"

class UserController {
    public searchUsers = (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch(e) {
            next(e)
        }
    }

    public updateThisUser = (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch(e) {
            next(e)
        }
    }

    public removeThisUser = (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch(e) {
            next(e)
        }
    }
}

export default new UserController()
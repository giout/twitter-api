import { NextFunction, Request, Response } from "express"

class AuthController {
    public signUp = (req: Request, res: Response, next: NextFunction) => {
        try {
                        
        } catch(e) {
            next(e)
        }
    }

    public logIn = (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch(e) {
            next(e)
        }
    }
}

export default new AuthController()
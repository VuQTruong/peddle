import { Request, Response } from "express";

export const signUp = (req: Request , res: Response) => {
    res.send("reached sign up service")
}
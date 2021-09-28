import { Request, Response } from "express";

export const signIn = (req: Request , res: Response) => {
    res.send("reached sign in service")
}
import { Request, Response } from "express";

export const signOut = (req: Request , res: Response) => {
    res.send("reached sign out service")
}
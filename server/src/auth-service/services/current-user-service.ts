import { Request, Response } from "express";

export const currentUser = (req: Request , res: Response) => {
    res.send("reached current user service")
}
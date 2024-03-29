import { NextFunction, Request, Response } from "express";

export const redirectToHttps = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.header("x-forwarded-proto") !== "https")
    res.redirect(`https://${req.header("host")}${req.url}`);
  else next();
};

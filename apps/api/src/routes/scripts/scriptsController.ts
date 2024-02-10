import { NextFunction, Request, Response, Router } from "express";
import fs from "node:fs";

const router = Router();

router.post(
  "/scripts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      fs.promises.writeFile("test.txt", data, "utf8");
    } catch (error) {
      next(error);
    }
  }
);

export default router;

import express, { Request, Response } from "express";
import { identifyContact } from "../controllers/Intentify-contact";

//creatig router using express.Router inbuild function
const router = express.Router();

//using router for accesing main controller followed by / route
router.post("/", async (req: Request, res: Response) => {
  await identifyContact(req, res);
});

export default router;

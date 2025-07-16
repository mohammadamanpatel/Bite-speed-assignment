import { Request, Response } from "express";
import { processContactIdentification } from "../services/contact-service";

//indentifyContact controller to hit our main buisness logic
export const identifyContact = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, email } = req.body;

    // Validation: Require at least one of phoneNumber or email
    if (!phoneNumber && !email) {
      return res
        .status(400)
        .json({ message: "Please provide phoneNumber or email" });
    }
    
    //using contact-service to process contact verification
    const result = await processContactIdentification(phoneNumber, email);

    return res.status(200).json({ contact: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

import { Request, Response } from "express";
import DeckModel from "../models";

export const DeleteDeckController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  await DeckModel.findByIdAndDelete(deckId);
  res.json({
    message: "successfully deleted",
  });
  console.log("successfully deleted ", deckId);
};

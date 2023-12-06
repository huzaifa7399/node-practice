import { Request, Response } from "express";
import DeckModel from "../models";

export const UpdateDeckTitleController = async (
  req: Request,
  res: Response
) => {
  const deckId = req.params.deckId;
  const { title } = req.body;
  await DeckModel.findByIdAndUpdate(deckId, {
    title: title,
  });
  res.send("title updated");
};

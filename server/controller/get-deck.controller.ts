import { Request, Response } from "express";
import DeckModel from "../models";

export const GetDeckController = async (req: Request, res: Response) => {
  const decks = await DeckModel.find();
  res.json(decks);
  console.log("successfully fetched decks ");
};

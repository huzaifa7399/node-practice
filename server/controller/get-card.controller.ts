import { Request, Response } from "express";
import DeckModel from "../models";

export const GetCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send("No Deck found with this id");
  res.json(deck.cards);
};

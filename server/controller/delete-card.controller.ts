import { Request, Response } from "express";
import DeckModel from "../models";

export const DeleteCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const cardId = req.params.cardId;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send("No Deck found with this id");
  deck.cards.splice(parseInt(cardId), 1);
  deck.save();
  res.json(deck);
};

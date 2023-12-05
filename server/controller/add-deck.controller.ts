import { Request, Response } from "express";
import DeckModel from "../models";

export const AddDeckController = async (req: Request, res: Response) => {
  const data = req.body;
  const newDeck = new DeckModel({
    title: data.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
  console.log("successfully added ", data.title);
};

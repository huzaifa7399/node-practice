import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "../models";

const app = express();
const PORT = 5000;

app.use(express.json());

app.post("/deck", async (req: Request, res: Response) => {
  const data = req.body;
  const newDeck = new DeckModel({
    title: data.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  console.log("listening on port ", PORT);
  app.listen(PORT);
});

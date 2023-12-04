require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "../models";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/deck", async (req: Request, res: Response) => {
  const decks = await DeckModel.find();
  // console.log(decks);
  res.json(decks);
});

app.post("/deck", async (req: Request, res: Response) => {
  const data = req.body;
  const newDeck = new DeckModel({
    title: data.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log("listening on port ", PORT);
  app.listen(PORT);
});

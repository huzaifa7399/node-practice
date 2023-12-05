require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { GetDeckController } from "../controller/get-deck.controller";
import { AddDeckController } from "../controller/add-deck.controller";
import { DeleteDeckController } from "../controller/delete-deck.controller";
import { AddCardController } from "../controller/add-card.controller";
import { GetCardController } from "../controller/get-card.controller";
import { DeleteCardController } from "../controller/delete-card.controller";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/deck", GetDeckController);
app.post("/deck", AddDeckController);
app.delete("/deck/:deckId", DeleteDeckController);

app.post("/deck/:deckId/create-card", AddCardController);
app.get("/deck/:deckId/get-card", GetCardController);
app.delete("/deck/:deckId/cards/:cardId", DeleteCardController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("listening on port ", PORT);
  app.listen(PORT);
});

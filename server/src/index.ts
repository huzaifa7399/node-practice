require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  GetDeckController,
  AddCardController,
  AddDeckController,
  DeleteCardController,
  DeleteDeckController,
  GetCardController,
  UpdateDeckTitleController,
} from "../controller";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/deck", GetDeckController);
app.post("/deck", AddDeckController);
app.post("/deck/:deckId/update-title", UpdateDeckTitleController);
app.delete("/deck/:deckId", DeleteDeckController);

app.get("/deck/:deckId/get-card", GetCardController);
app.post("/deck/:deckId/create-card", AddCardController);
app.delete("/deck/:deckId/cards/:cardId", DeleteCardController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("listening on port ", PORT);
  app.listen(PORT);
});

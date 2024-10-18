import express from "express";
import mongoose from "mongoose";
import { PORT, URI } from "./config.js";
import productsRoute from "./routes/productsRoute.js";
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

//middleware for handling cors policy
//option 1: allow all origins with default of cors(*)
// app.use(cors())
//option 2: allow custom origins
app.use(cors({
    origin: true,
    credentials: true,
}))

app.get("/", (req, res) => {
  //   console.log(req);
  res.send("Welcome to Products Store!");
});

app.use("/products", productsRoute);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

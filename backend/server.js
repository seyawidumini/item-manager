const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// MODEL
const Item = mongoose.model("Item", {
  name: String,
  quantity: Number,
  price: Number
});

// ROUTES

// GET
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get("/", (req, res) => {
  res.send("Backend is working");
});

// POST
app.post("/api/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

// DELETE
app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
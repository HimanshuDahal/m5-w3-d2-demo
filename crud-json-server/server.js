const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (no extra options needed in modern driver)
mongoose.connect("mongodb://127.0.0.1:27017/booklist");

// Schema & Model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});
const Book = mongoose.model("Book", bookSchema);

// Routes
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/books", async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

app.put("/books/:id", async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedBook);
});

app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));

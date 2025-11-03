const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "27017";
const dbUser = process.env.DB_USER || "bookhub";
const dbPassword = process.env.DB_PASSWORD || "securePass";
const dbName = process.env.DB_NAME || "bookhub";

const mongoURI = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Book schema
const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
});

const Book = mongoose.model("Book", bookSchema);

// Seed initial data if collection is empty
Book.countDocuments().then(count => {
  if (count === 0) {
    Book.insertMany([
      { id: 1, title: "The Alchemist" },
      { id: 2, title: "Atomic Habits" }
    ]).then(() => console.log("Initial books inserted"));
  }
});

app.get("/", (req, res) => {
  res.send("BookHub Backend is running 🚀");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Mahesh:m9024731575j@cluster0.t9tfc.mongodb.net/Library?retryWrites=true&w=majority"
  );
};

// SECTION SCHEMA

const sectionSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Step 2 : creating the model
const Sections = mongoose.model("section", sectionSchema);

// BOOK SCHEMA

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    body: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Books = mongoose.model("book", bookSchema);
const CheckedOutSchema = new mongoose.Schema(
  {
    BookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      checkedOutTime: { type: Boolean, default: null },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const IsChecked = mongoose.model("checked", CheckedOutSchema);

app.get("/section", async (req, res) => {
  try {
    const section = await Sections.find().lean().exec();

    return res.status(200).send({ section: section });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/section", async (req, res) => {
  try {
    const section = await Sections.create(req.body);

    return res.status(201).send(section);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.get("/book", async (req, res) => {
  try {
    const books = await Books.find().lean().exec();

    return res.status(200).send({ books: books });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const books = await Books.create(req.body);

    return res.status(201).send(books);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.get("/ischecked/:BookId", async (req, res) => {
  try {
    const books = await Books.findById(req.params.BookId).lean().exec();

    return res.status(200).send({ books: books });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.listen(5000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }

  console.log("listening on port 5000");
});

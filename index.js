const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Mahesh:m9024731575j@cluster0.t9tfc.mongodb.net/web15_atlas?retryWrites=true&w=majority"
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
const User = mongoose.model("section", sectionSchema);

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

const Book = mongoose.model("book", bookSchema);

app.get("/section", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ users: users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/section", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.get("/book", async (req, res) => {
  try {
    const users = await Book.find().lean().exec();

    return res.status(200).send({ users: users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const user = await Book.create(req.body);

    return res.status(201).send(user);
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

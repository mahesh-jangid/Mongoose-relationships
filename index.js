const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://maheshJ:mahesh9000@cluster0.3yoo8.mongodb.net/web15_Library-system?retryWrites=true&w=majority"
  );
};

// SECTION SCHEMA

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Step 2 : creating the model
const Users = mongoose.model("users", userSchema);

// SECTION SCHEMA

const sectionSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

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

// AUTHORS SCHEMA

const AuthorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Authors = mongoose.model("author", AuthorSchema);

// BOOk AUTHOR SCHEMA

const BookAuthorSchema = new mongoose.Schema(
  {
    BookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    AuthorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookAuthors = mongoose.model("bookauthor", BookAuthorSchema);

// CHECKED OUT SCHEMA
const CheckedOutSchema = new mongoose.Schema(
  {
    BookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    checkedOutTime: { type: Date, default: null },
    checkedInTime: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const IsChecked = mongoose.model("checked", CheckedOutSchema);

app.get("/users", async (req, res) => {
  try {
    const users = await Users.find().lean().exec();

    return res.status(200).send({ users: users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const users = await Users.create(req.body);

    return res.status(201).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

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
app.get("/author", async (req, res) => {
  try {
    const books = await Books.find().lean().exec();

    return res.status(200).send({ books: books });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/author", async (req, res) => {
  try {
    const books = await Books.create(req.body);

    return res.status(201).send(books);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.get("/checked", async (req, res) => {
  try {
    const ischecked = await IsChecked.find().lean().exec();

    return res.status(200).send({ ischecked: ischecked });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.get("/checked/:BookId", async (req, res) => {
  try {
    const books = await IsChecked.findById(req.params.BookId).lean().exec();

    return res.status(200).send(books);
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

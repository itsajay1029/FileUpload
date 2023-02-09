const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 8000;

const postModel = require("./post.model");

let cors = require("cors");
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  const allData = await (
    await postModel.find().sort({ updatedAt: -1 })
  ).reverse();
  res.json(allData);
});

app.post("/upload", (req, res) => {
  const { name, description, image } = req.body;

  const newPost = new postModel({
    name,
    description,
    image,
  });

  newPost.save().then(() => res.send("successfully uploaded"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

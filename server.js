const express = require("express");
const upload = require("express-fileupload");
const app = express();

app.use(upload());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    console.log(req.files);
  }
  res.send("Got a POST request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

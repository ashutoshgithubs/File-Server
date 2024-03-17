const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
//fs -> build in node.js module
const port = 3000;
app.use(express.json());
// ** Get all file Name present in the files dir**
app.get("/files", (req, res) => {
  const dirPath = path.join(__dirname, "dir");
  fs.readdir(dirPath, (err, fileData) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Read directory failed..",
      });
    }
    return res.status(200).json({
      data: fileData,
      success: true,
      message: "Read directory done!!",
    });
  });
});

// ** GET /file/:filename - Returns content of given file by name
// Example: GET http://localhost:3000/file/example.txt

app.get("/file/:filename", (req, res) => {
  const filepath = path.join(__dirname, "dir", req.params.filename);

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: data,
    });
  });
});

// For any other route not defined in the server return 404
app.all("*", (req, res) => {
  return res.status(404).send("Page Not Found!!");
});
app.listen(port, () => {
  console.log("Server is okay!!");
});

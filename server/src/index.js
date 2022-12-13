const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// import in project
const Routes = require("./routes");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "http://127.0.0.1";
//app config
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
// connect db
require("./db/mongoose");
// config route
Routes(app);

// create server
app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

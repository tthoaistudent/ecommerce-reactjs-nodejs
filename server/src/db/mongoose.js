const mongoose = require("mongoose");

const mongooseUrl =
  process.env.MONGOOSE_HOST || "mongodb://localhost:27017/shoes_db";

mongoose.connect(mongooseUrl, { autoIndex: true }, () => {
  console.log("Connect DB successfully....");
});

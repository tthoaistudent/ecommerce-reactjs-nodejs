const userRoute = require("./users");
const authRoute = require("./auth");
const categoryRoute = require("./category");
const productRoute = require("./product");

const adminMiddleware = require("../middlewares/admin");

const Routes = (app) => {
  app.use("/api/v1/users", adminMiddleware, userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/products", productRoute);
};

module.exports = Routes;

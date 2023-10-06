const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.use("/train",require("./routes/johnDoeRailwayRoutes"))

app.use(errorMiddleware);

module.exports = app;
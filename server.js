const app = require("./app");
const dotenv = require("dotenv");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  // console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "config/config.env" });
require("./database/connection");

app.use("/", (req, res, next) => {
  res.json({ message: "Working" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running at Port Number:${PORT}`);
});

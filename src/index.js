import "dotenv/config"; // load variables from .env
import connectDB from "./db/config.js";
import { app } from "./app.js";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongodb connection error:", error);
  });

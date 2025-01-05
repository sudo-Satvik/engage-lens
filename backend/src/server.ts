import { connectDatabase } from "./config/database";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});
const PORT = Number(process.env.PORT) || 8000;

connectDatabase()
  .then(() => {
    app.on("error", (err) => {
      console.error("Error Starting Server", err);
      process.exit(1);
    });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to DataStax Astra:", err);
    process.exit(1);
  });

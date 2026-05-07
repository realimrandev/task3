import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import dns from "dns";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors(
{
  origin: "http://localhost:5173",
}
)); ///CORS

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on PORT:", PORT);
  });
});
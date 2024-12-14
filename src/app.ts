import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import { swaggerDocs } from "./swagger";
import rateLimit from "express-rate-limit";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(compression());
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Too many requests from this IP, please try again after 1 minute",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
swaggerDocs(app);

export default app;

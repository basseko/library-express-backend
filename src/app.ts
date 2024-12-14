import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import { swaggerDocs } from "./swagger";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
swaggerDocs(app);

export default app;

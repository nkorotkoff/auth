import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorMiddleware";
import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";
import checkAuth from "./routes/checkAuth";

const PORT = process.env.PORT || 4000;

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

dotenv.config();

connectDB();

const app: express.Application = express();

app.use(cors(corsOption));
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());

app.use("/api/", checkAuth);
app.use("/api/auth", userRouter);

app.use("*", (req, res) => {
  res.status(404).send("Wrong api source");
});

// create application/x-www-form-urlencoded parser

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));

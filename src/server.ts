import cors from "cors";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error!",
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
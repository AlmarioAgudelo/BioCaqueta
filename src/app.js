import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./routes/api.router.js";
import viewsRouter from "./routes/views.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/avistamientos", apiRouter);
app.use("/", viewsRouter);

export default app;

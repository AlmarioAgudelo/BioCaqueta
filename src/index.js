import "dotenv/config";
import app from "./app.js";
import { conexion } from "./config/db.js";

const PORT = process.env.PORT || 3000;

await conexion();

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

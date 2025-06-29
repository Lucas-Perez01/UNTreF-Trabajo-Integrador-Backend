import express from "express";
import mongoConnect from "./config/database.js";
import productosRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI || "";
const app = express();

// Conectar a la base de datos MongoDB
mongoConnect(MONGO_URL);

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api", productosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de UNTreF Trabajo Integrador");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

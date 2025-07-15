// Importamos dependencias
import express from "express";
import mongoConnect from "./config/database.js";
import productosRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";

// Cargamos las variables de entorno
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI || "";
const app = express();

// Conectamos a la base de datos MongoDB con la URL especificada
mongoConnect(MONGO_URL);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para agregarle un prefijo a las rutas de los productos
app.use("/api", productosRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de UNTreF Trabajo Integrador");
});
// Inicio del servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

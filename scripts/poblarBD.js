// Cargamos las variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Importamos las dependencias necesarias
import mongoConnect from "../config/database.js";
import Producto from "../models/product.js";
import mongoose from "mongoose";

// Importamos el modulo readFile para leer archivos de forma asincrona
import { readFile } from "fs/promises";

const poblarDB = async () => {
  try {
    // Conectamos a la base de datos MongoDB
    await mongoConnect(process.env.MONGO_URI);

    // Leemos el archivo JSON de los productos
    const data = await readFile("./data/computacion.json", "utf-8");

    // Parseamos el contenido del archivo JSON
    const productos = JSON.parse(data);

    // Insertamos los productos en la coleccion de MongoDB
    await Producto.insertMany(productos);
    console.log(`Se insertaron ${productos.length} productos`);
  } catch (error) {
    // Manejamos el error
    console.error("Error al insertar productos:", error);
  } finally {
    // Cerramos la conexion con la base de datos
    await mongoose.disconnect();
    console.log("Conexión cerrada");
    process.exit(0);
  }
};

poblarDB();

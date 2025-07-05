import dotenv from "dotenv";
dotenv.config();

import mongoConnect from "../config/database.js";
import Producto from "../models/product.js";
import mongoose from "mongoose";
import { readFile } from "fs/promises";

const poblarDB = async () => {
  try {
    await mongoConnect(process.env.MONGO_URI);

    const data = await readFile("./data/computacion.json", "utf-8");
    const productos = JSON.parse(data);

    await Producto.insertMany(productos);
    console.log(`Se insertaron ${productos.length} productos`);
  } catch (error) {
    console.error("Error al insertar productos:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión cerrada");
    process.exit(0);
  }
};

poblarDB();

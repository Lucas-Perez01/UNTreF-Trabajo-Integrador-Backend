// Importamos la depedencia de mongoose
import mongoose from "mongoose";

// Definimos el esquema para los productos
const ProductoSchema = new mongoose.Schema({
  // Campo para el codigo del producto de tipo Number
  codigo: {
    type: Number,
    required: true,
  },
  // Campo para el nombre del producto de tipo String
  nombre: {
    type: String,
    required: true,
  },
  // Campo para el precio del producto de tipo Number
  precio: {
    type: Number,
    required: true,
  },
  // Campo para la categoria del producto de tipo Array de Strings
  categoria: {
    type: [String],
    required: true,
  },
});

// Creamos el modelo de productos
const Productos = mongoose.model("Product", ProductoSchema);

// Exportamos el modelo de productos
export default Productos;

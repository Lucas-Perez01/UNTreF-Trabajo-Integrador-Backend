// Importamos la dependencia de mongoose
import mongoose from "mongoose";

// Definimos el esquema para los productos
const ProductoSchema = new mongoose.Schema({
  // Código del producto (tipo: Number)
  codigo: {
    type: Number,
    required: true,
  },
  // Nombre del producto (tipo: String)
  nombre: {
    type: String,
    required: true,
  },
  // Precio del producto (tipo: Number)
  precio: {
    type: Number,
    required: true,
  },
  // Categorías del producto (tipo: Array de Strings)
  categoria: {
    type: [String],
    required: true,
  },
});

// Creamos el modelo de productos
const Productos = mongoose.model("Product", ProductoSchema);

// Exportamos el modelo de productos
export default Productos;

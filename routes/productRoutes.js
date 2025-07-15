// Importamos la dependencia de express y los controladores necesarios
import express from "express";
import {
  getProductos, // Obtener todos los productos
  productoPorCodigo, // Obtener un producto por su código
  crearProducto, // Crear un nuevo producto
  modificarProducto, // Editar un producto existente por su código
  borrarProducto, // Borrar un producto por su código
  buscarProductoPorTermino, // Buscar productos por un término
  filtrarProductoPorCategoria, // Filtrar productos por categoría
  obtenerProductosEnUnRangoDePrecio, // Obtener productos en un rango de precio
  agregarMasivamente, // Agregar productos masivamente
} from "../controllers/productController.js";

// Creamos un router de express
const router = express.Router();

// Ruta para obtener todos los productos
router.get("/productos", getProductos);

// Ruta para buscar productos por término
router.get("/productos/buscar", buscarProductoPorTermino);

// Ruta para obtener un producto por su código
router.get("/productos/:codigo", productoPorCodigo);

// Ruta para crear un nuevo producto
router.post("/productos", crearProducto);

// Ruta para modificar un producto por su código
router.put("/productos/:codigo", modificarProducto);

// Ruta para borrar un producto por su código
router.delete("/productos/:codigo", borrarProducto);

// Ruta para filtrar productos por categoría específica
router.get("/productos/categoria/:nombre", filtrarProductoPorCategoria);

// Ruta para obtener productos dentro de un rango de precio
router.get("/productos/precio/:min-:max", obtenerProductosEnUnRangoDePrecio);

// Ruta para agregar productos masivamente
router.post("/productos/masivo", agregarMasivamente);

// Exportamos el router
export default router;

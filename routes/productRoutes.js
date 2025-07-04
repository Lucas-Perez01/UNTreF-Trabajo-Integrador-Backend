import express from "express";
import {
  getProductos,
  productoPorCodigo,
  crearProducto,
  modificarProducto,
  borrarProducto,
  buscarProductoPorTermino,
  filtrarProductoPorCategoria,
  obtenerProductosEnUnRangoDePrecio,
} from "../controllers/productController.js";

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/productos", getProductos);

// Ruta para buscar productos por termino
router.get("/productos/buscar", buscarProductoPorTermino);

// Ruta para obtener un producto por su código
router.get("/productos/:codigo", productoPorCodigo);

// Ruta para crear un nuevo producto
router.post("/productos", crearProducto);

// Ruta para modificar un producto por su código
router.put("/productos/:codigo", modificarProducto);

// Ruta para borrar un producto por su código
router.delete("/productos/:codigo", borrarProducto);

// Ruta para filtrar los productos que pertenezcan a una categoria especifica
router.get("/productos/categoria/:nombre", filtrarProductoPorCategoria);

// Ruta para devolver los productos dentro de un rango de precio
router.get("/productos/precio/:min-:max", obtenerProductosEnUnRangoDePrecio);

export default router;

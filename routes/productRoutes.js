// Importamos la dependencia de express y los controladores necesatrios
import express from "express";
import {
  getProductos, // Obtenemos todos los productos
  productoPorCodigo, // Obtenemos un producto por su codigo
  crearProducto, // Creamos un nuevo producto
  modificarProducto, // Editamos un producto existente por su codigo
  borrarProducto, // Borramos un producto por su codigo
  buscarProductoPorTermino, // Buscamos un producto por un termino
  filtrarProductoPorCategoria, // Filtramos productos por categoria
  obtenerProductosEnUnRangoDePrecio, // Obtenemos productos en un rango de precio
  agregarMasivamente, // Agregamos prodcutos masivamente
} from "../controllers/productController.js";

// Creamos un router de express
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

// Ruta para crear productos masivamente
router.post("/productos/masivo", agregarMasivamente);

// Exportamos router
export default router;

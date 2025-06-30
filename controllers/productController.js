// Crud de los productos
import Productos from "../models/product.js";

//Funcion para tomar todos los productos de la base de datos
const getProductos = async (req, res) => {
  try {
    const productos = await Productos.find();
    return res.status(200).json(productos);
  } catch (error) {
    res.status(500)({
      message: "Error al obtener los productos de la base de datos",
    });
  }
};

export { getProductos };

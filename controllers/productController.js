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

const productoPorCodigo = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const producto = await Productos.findOne({ codigo });
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el producto por su código",
    });
  }
};

export { getProductos, productoPorCodigo };

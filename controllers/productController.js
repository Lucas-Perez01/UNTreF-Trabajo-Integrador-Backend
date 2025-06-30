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

//Funcion para crear un producto
const crearProducto = async (req, res) => {
  try {
    //Validamos que el codigo del producto no exista en la base de datos/ que sea diferente
    const productoYaExiste = await Productos.findOne({ codigo });
    if (productoYaExiste) {
      return res.status(400).json({
        message: "El producto ya existe con ese código",
      });
    }

    //Creamos el nuevo producto
    const nuevoProducto = new Productos(req.body);
    await nuevoProducto.save();
    //Si el producto es creado se retorna con un codigo de estado 201
    return res.status(201).json(nuevoProducto);
    // Si hay un error al crear el producto, se retorna un codigo de estado 400
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el producto",
    });
  }
};

//Funcion para modificar un producto
const modificarProducto = async (req, res) => {
  const { codigo } = req.params;
  const { precio } = req.body;
  try {
    const productoModificado = await Productos.findOneAndUpdate(
      { codigo },
      { precio }
    );
    if (!productoModificado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor al modificar el producto",
    });
  }
  return res.status(200).json({ message: "Producto modificado correctamente" });
};

const borrarProducto = async (req, res) => {
  const { codigo } = req.params;
  try {
    const productoBorrado = await Productos.findOneAndDelete({ codigo });
    if (!productoBorrado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({ message: "Producto borrado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor al modificar el producto",
    });
  }
};

export {
  getProductos,
  productoPorCodigo,
  crearProducto,
  modificarProducto,
  borrarProducto,
};

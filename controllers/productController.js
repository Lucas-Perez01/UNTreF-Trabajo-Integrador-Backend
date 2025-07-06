// Crud de los productos
import Productos from "../models/product.js";

// Función para tomar todos los productos de la base de datos
const getProductos = async (req, res) => {
  try {
    const productos = await Productos.find();
    return res.status(200).json(productos);
  } catch (error) {
    res.status(500)({
      mensaje: "Error al obtener los productos de la base de datos",
    });
  }
};

const productoPorCodigo = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const producto = await Productos.findOne({ codigo });
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el producto por su código",
    });
  }
};

// Función para crear un producto
const crearProducto = async (req, res) => {
  try {
    const { codigo } = req.body;
    // Validamos que el código del producto no exista en la base de datos/ que sea diferente
    const productoYaExiste = await Productos.findOne({ codigo });
    if (productoYaExiste) {
      return res.status(400).json({
        mensaje: "El producto ya existe con ese código",
      });
    }

    // Creamos el nuevo producto
    const nuevoProducto = new Productos(req.body);
    await nuevoProducto.save();
    // Si el producto es creado se retorna con un codigo de estado 201
    return res.status(201).json(nuevoProducto);
    // Si hay un error al crear el producto, se retorna un codigo de estado 400
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al crear el producto",
    });
  }
};

// Función para modificar un producto
const modificarProducto = async (req, res) => {
  const { codigo } = req.params;
  const { precio } = req.body;
  try {
    const productoModificado = await Productos.findOneAndUpdate(
      { codigo },
      { precio }
    );
    if (!productoModificado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor al modificar el producto",
    });
  }
  return res.status(200).json({ mensaje: "Producto modificado correctamente" });
};

// Función para borrar un producto
const borrarProducto = async (req, res) => {
  const { codigo } = req.params;
  try {
    const productoBorrado = await Productos.findOneAndDelete({ codigo });
    if (!productoBorrado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    return res.status(200).json({ mensaje: "Producto borrado correctamente" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor al modificar el producto",
    });
  }
};

/* ----------------------
   Funciones adicionales
   ----------------------*/

// Función para buscar un producto por su nombre
const buscarProductoPorTermino = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ mensaje: "No se ingresó el parámetro q!" });
  }

  try {
    const productosEncontrados = await Productos.find({
      nombre: { $regex: q, $options: "i" },
    });

    if (productosEncontrados.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No existe un producto con ese nombre!" });
    }

    return res.status(200).json(productosEncontrados);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al buscar productos", error });
  }
};

// Función para filtra los productos que pertenezcan a una categoría específica.
const filtrarProductoPorCategoria = async (req, res) => {
  const nombre = req.params.nombre.toLowerCase();

  if (!nombre) {
    return res
      .status(400)
      .json({ mensaje: "No se ingresó el parámetro categoria!" });
  }

  try {
    const productos = await Productos.find({
      categoria: { $regex: nombre, $options: "i" },
    });

    if (!productos || productos.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No existe un producto con esa categoría!" });
    }

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al buscar productos por categoría",
      error,
    });
  }
};

// Función para obtener los productos que se encuentren en un rango de precio específico.
const obtenerProductosEnUnRangoDePrecio = async (req, res) => {
  const min = Number(req.params.min);
  const max = Number(req.params.max);

  if (isNaN(min) || isNaN(max)) {
    return res.status(404).json("Parametros min y max invalidos");
  }

  try {
    const productos = await Productos.find({
      precio: { $gte: min, $lte: max },
    });

    if (productos.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron productos en ese rango" });
    }

    return res.status(200).json(productos);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al obtener el producto por rango" });
  }
};

// Función gregar múltiples productos en una sola solicitud.
const agregarMasivamente = async (req, res) => {
  const productos = req.body;

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: "Productos debe ser un array" });
  }

  try {
    const codigos = productos.map((p) => p.codigo);
    const productosExistentes = await Productos.find({
      codigo: { $in: codigos },
    });
    const codigosExistentes = productosExistentes.map((p) => p.codigo);

    const productosFiltrados = productos.filter(
      (p) => !codigosExistentes.includes(p.codigo)
    );

    if (productosFiltrados.length === 0) {
      return res
        .status(409)
        .json({ mensaje: "Todos los productos ya existen" });
    }

    await Productos.insertMany(productosFiltrados);
    return res
      .status(201)
      .json({ mensaje: "Productos insertados exitosamente" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al agregar productos" });
  }
};

export {
  getProductos,
  productoPorCodigo,
  crearProducto,
  modificarProducto,
  borrarProducto,
  buscarProductoPorTermino,
  filtrarProductoPorCategoria,
  obtenerProductosEnUnRangoDePrecio,
  agregarMasivamente,
};

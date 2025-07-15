// Importamos el modelo de productos
import Productos from "../models/product.js";

// Función para obtener todos los productos de la base de datos
const getProductos = async (req, res) => {
  try {
    const productos = await Productos.find(); // Buscamos los productos
    return res.status(200).json(productos); // Respondemos con la lista de los productos
  } catch (error) {
    // Manejamos el error
    res.status(500)({
      mensaje: "Error al obtener los productos de la base de datos",
    });
  }
};

// Función para obtener un producto por su código
const productoPorCodigo = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const producto = await Productos.findOne({ codigo }); // Buscamos el producto por su codigo
    // Si el producto no se encuentra, retornamos un error 404
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    return res.status(200).json(producto); // Si se encuentra el producto, lo retornamos
  } catch (error) {
    // Manejamos el error
    return res.status(500).json({
      mensaje: "Error al obtener el producto por su código",
    });
  }
};

// Función para crear un producto
const crearProducto = async (req, res) => {
  try {
    const { codigo } = req.body;
    // Validamos que el código del producto no exista en la base de datos/que sea diferente
    // Si el producto ya existe retornamos un error 400
    const productoYaExiste = await Productos.findOne({ codigo });
    if (productoYaExiste) {
      return res.status(400).json({
        mensaje: "El producto ya existe con ese código",
      });
    }

    // Creamos el nuevo producto
    const nuevoProducto = new Productos(req.body);
    await nuevoProducto.save(); // Guardamos el nuevo producto en la base de datos
    return res.status(201).json(nuevoProducto); // Si el producto es creado se retorna con un codigo de estado 201
    // Si hay un error al crear el producto, se retorna un codigo de estado 400
  } catch (error) {
    // Manejamos el error
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
    // Buscamos y actualizamos el producto
    const productoModificado = await Productos.findOneAndUpdate(
      { codigo },
      { precio }
    );
    // Si el producto no se encuentra retornamos 404
    if (!productoModificado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (error) {
    // Manejamos el error
    return res.status(500).json({
      mensaje: "Error interno del servidor al modificar el producto",
    });
  }
  // Retornamos que el producto se modifico correctamente
  return res.status(200).json({ mensaje: "Producto modificado correctamente" });
};

// Función para borrar un producto
const borrarProducto = async (req, res) => {
  const { codigo } = req.params;
  try {
    // Buscamos y borramos un producto por su codigo
    const productoBorrado = await Productos.findOneAndDelete({ codigo });
    // Si el producto no se encuentra retornamos 404
    if (!productoBorrado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    // Retornamos 200 con un mensaje de que el prodcuto se borro correctamente
    return res.status(200).json({ mensaje: "Producto borrado correctamente" });
  } catch (error) {
    // Manejamos el error
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

  // Retornamos 400 si el parametro q (query) no se ingreso
  if (!q) {
    return res.status(400).json({ mensaje: "No se ingresó el parámetro q!" });
  }

  try {
    // Buscamos los productos por una expresion regular
    const productosEncontrados = await Productos.find({
      nombre: { $regex: q, $options: "i" },
    });

    // Retornamos 404 si el producto no existe con ese nombre
    if (productosEncontrados.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No existe un producto con ese nombre!" });
    }

    // Retornamos el producto encontrado
    return res.status(200).json(productosEncontrados);
  } catch (error) {
    // Manejamos el error
    return res
      .status(500)
      .json({ mensaje: "Error al buscar productos", error });
  }
};

// Función para filtra los productos que pertenezcan a una categoría específica.
const filtrarProductoPorCategoria = async (req, res) => {
  const nombre = req.params.nombre.toLowerCase(); // Convertimos el parametro a minusculas

  // Verificamos que el parametro se ingreso
  if (!nombre) {
    return res
      .status(400)
      .json({ mensaje: "No se ingresó el parámetro categoria!" });
  }

  try {
    // Buscamos los productos que esten en la categoria
    const productos = await Productos.find({
      categoria: { $regex: nombre, $options: "i" },
    });

    // Retornamos 404 si el producto no existe con esa categoria
    if (!productos || productos.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No existe un producto con esa categoría!" });
    }
    return res.status(200).json(productos); // Retornamos el producto en esa categoria
  } catch (error) {
    // Manejamos el error
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

  // Validamos que las constantes min y max sean numeros
  if (isNaN(min) || isNaN(max)) {
    return res.status(404).json("Parametros min y max invalidos");
  }

  try {
    // Buscamos los productos mayores o iguales que min y menores o iguales que max
    const productos = await Productos.find({
      precio: { $gte: min, $lte: max },
    });

    // Retornamos un 404 si no se encuentran productos en ese rango
    if (productos.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron productos en ese rango" });
    }
    return res.status(200).json(productos); // Retornamos los prodcutos
  } catch (error) {
    // Manejamos el error
    return res
      .status(500)
      .json({ mensaje: "Error al obtener el producto por rango" });
  }
};

// Función agregar múltiples productos en una sola solicitud.
const agregarMasivamente = async (req, res) => {
  const productos = req.body;

  // Verificamos que el body sea un array con productos
  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: "Productos debe ser un array" });
  }

  try {
    const codigos = productos.map((p) => p.codigo); // Obtenemos todos los del array recibido
    const productosExistentes = await Productos.find({
      // Buscamos cuales existen en la base de datos
      codigo: { $in: codigos },
    });
    const codigosExistentes = productosExistentes.map((p) => p.codigo);

    const productosFiltrados = productos.filter(
      // Filtramos los productos los productos que no esten repetidos
      (p) => !codigosExistentes.includes(p.codigo)
    );

    // Si los productos existen, retornamos un 409 de conflicto
    if (productosFiltrados.length === 0) {
      return res
        .status(409)
        .json({ mensaje: "Todos los productos ya existen" });
    }

    // Insertamos los productos no repetidos
    await Productos.insertMany(productosFiltrados);
    return res
      .status(201)
      .json({ mensaje: "Productos insertados exitosamente" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al agregar productos" });
  }
};

// Exportamos las funciones
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

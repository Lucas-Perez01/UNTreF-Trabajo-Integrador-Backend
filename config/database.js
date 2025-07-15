// Importamos la dependencia de mongoose
import mongoose from "mongoose";

// Función para conectarse a la base de datos de MongoDB
const mongoConnect = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri); // Intentamos conectarnos a la base de datos usando la URI especificada
    console.log("Conectado a MongoDB"); // Mostramos un mensaje de conexión exitosa
  } catch (error) {
    // Manjemos el error si la conexion falla
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

// Exportamos la función
export default mongoConnect;

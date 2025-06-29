import mongoose from "mongoose";

const mongoConnect = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default mongoConnect;

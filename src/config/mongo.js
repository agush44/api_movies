//Configuración para la conexión a la base de datos
import { mongoose } from "mongoose";

process.loadEnvFile();

const URI_DB = process.env.URI_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(URI_DB);
    console.log("Conexión exitosa a la BD");
  } catch (error) {
    console.log("Error al conectarse");
  }
};

export { connectDB };

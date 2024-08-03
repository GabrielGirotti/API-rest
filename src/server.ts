import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerOptions } from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgGreen.white("Conexion exitosa"));
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white("Hubo un error al conectar a la base"));
  }
}
connectDB();

const server = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan("dev"));

server.use("/api/products", router);

server.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

export default server;

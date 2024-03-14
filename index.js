// 1.IMPORTS
// 1.1 librerias npm

const express = require("express");
const cors = require("cors");
// 1.2 documentos del proyecto
const { connectMongo } = require("./src/data/mongo");
//const { configCloudinary } = require("./src/utils/cloudinary/config");
// 1.3 las rutas:
const userRouter = require("./src/api/routes/user.routes");
const floristeriaRouter = require("./src/api/routes/floristeria.routes");
const florRouter = require("./src/api/routes/flores.routes");
const {
  notFoundHandler,
  errorHandler,
} = require("./src/api/middlewares/error.middleware");
// 2. CONFIG
// 2.1 configuración de la app
require("dotenv").config(); // desde aquí se cargan las var de entorno del .env, hasta aquí no existen
const PORT = process.env.PORT || 3000;
connectMongo();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// usar urlencode para las urls.
//configCloudinary();
// 2.2 cabeceras (https://developer.mozilla.org/en-US/docs/Web/API/Headers)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// 2.3 cors (https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
app.use(cors()); // no hay restricciones
/*
 * La linea inferior sería un ejemplo de uso de cors, en el que solo
 * permitimos peticiones de esas dos direcciones IP
 * Este concepto se conoce como whitelisting
 */
/* app.use(cors({
  origin: [
    '0.0.0.0',
    'http://localhost:4200'
  ],
  credentials: true,
})); */

// 3. ENDPOINTS

// 3.1 endpoint para test básico
app.get("/", (req, res) => {
  res.send("Server is up");
});
// 3.2 las rutas de mis datos
app.use("/user", userRouter);
app.use("/floristeria", floristeriaRouter);
app.use("/flor", florRouter);
// 3.3 el "coche escoba" -> cualquier ruta que no haya definido pasa por aquí
app.use("*", (req, res, next) =>
  next(setError(404, "The route you requested is not part of this API"))
);

// 4. MANEJO DE ERRORES
app.use((error, req, res, next) =>
  res.status(error.status || 500).json(error.message || "Unexpected error")
);
app.use(notFoundHandler);
app.use(errorHandler);
/// hemos visto otro error
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// 5. "ARRANCAR" EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});

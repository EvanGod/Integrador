const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware de rutas
app.use("/auth", authRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API funcionando correctamente.");
});

// Verificar conexión a la base de datos
app.get("/db-check", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.send("Conexión a la base de datos exitosa.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la conexión a la base de datos.");
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

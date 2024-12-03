const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica si el usuario existe en la base de datos
        const [user] = await db.query(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            [email, password]
        );

        if (user.length === 0) {
            return res.status(401).json({ message: "Credenciales incorrectas." });
        }

        // Crear un token JWT
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
};

module.exports = { login };
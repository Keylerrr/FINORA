import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a SQLite (crea el archivo automáticamente si no existe)
const dbPromise = open({
  filename: "./finora.db",
  driver: sqlite3.Database,
});

// Crear tabla si no existe
dbPromise.then(async (db) => {
  await db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      email TEXT,
      saldo REAL DEFAULT 0
    )
  `);
});

// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  const db = await dbPromise;
  const usuarios = await db.all("SELECT * FROM usuarios");
  res.json(usuarios);
});

// Agregar usuario
app.post("/usuarios", async (req, res) => {
  const { nombre, email, saldo } = req.body;
  const db = await dbPromise;

  try {
    await db.run("INSERT INTO usuarios (nombre, email, saldo) VALUES (?, ?, ?)", [
      nombre,
      email,
      saldo ?? 0, // usa 0 si no se envía un saldo
    ]);
    res.status(201).json({ message: "Usuario agregado correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Servidor backend corriendo en http://localhost:3000");
});
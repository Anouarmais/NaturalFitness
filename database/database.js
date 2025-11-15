import * as SQLite from "expo-sqlite";

let db = null;

/**
 * Abre la base de datos y crea la tabla si no existe.
 */
export async function openDatabase() {
  if (db) return db; // ya abierta

  try {
    db = await SQLite.openDatabaseAsync("gymapp.db");
    console.log("✅ Base de datos abierta (async)");

    // Crear tabla si no existe
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS registros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        peso REAL,
        grasa REAL,
        masa REAL,
        imc REAL,
        fecha TEXT
      );
    `);
    console.log("✅ Tabla 'registros' lista");
    return db;
  } catch (error) {
    console.log("❌ Error al abrir/crear DB:", error);
    throw error;
  }
}

/**
 * Devuelve la instancia de la base de datos ya abierta.
 */
export function getDB() {
  return db;
}

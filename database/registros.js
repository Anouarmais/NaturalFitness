// database/registros.js
import { getDB, openDatabase } from "./database";

/**
 * Guarda un nuevo registro con todos los valores y la fecha actual.
 */
export async function addRegistro(
  peso,
  grasa,
  masa,
  agua,
  edadMetabolica,
  visceral,
  cintura,
  cadera
) {
  try {
    let db = getDB();
    if (!db) {
      console.log("⚠️ DB aún no abierta, abriendo...");
      db = await openDatabase();
    }

    const fecha = new Date().toISOString();

    if (!db) {
      console.log("❌ No se pudo obtener la instancia de DB");
      return;
    }

    console.log("📥 Insertando registro:", {
      peso, grasa, masa, agua, edadMetabolica, visceral, cintura, cadera, fecha
    });

    await db.runAsync(
      `INSERT INTO registros 
        (peso, grasa, masa, agua, edadMetabolica, visceral, cintura, cadera, fecha) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        peso ?? null,
        grasa ?? null,
        masa ?? null,
        agua ?? null,
        edadMetabolica ?? null,
        visceral ?? null,
        cintura ?? null,
        cadera ?? null,
        fecha
      ]
    );

    console.log("✅ Registro guardado correctamente en SQLite");
  } catch (error) {
    console.log("❌ Error al guardar registro:", error);
  }
}

/**
 * Obtiene todos los registros, ordenados del más reciente al más antiguo.
 */
export async function getRegistros() {
  const db = getDB() || (await openDatabase());
  try {
    const rows = await db.getAllAsync(
      "SELECT * FROM registros ORDER BY fecha DESC;"
    );
    return rows;
  } catch (error) {
    console.log("❌ Error al leer registros:", error);
    return [];
  }
}

/**
 * Borra todos los registros de la tabla (sin eliminar la tabla)
 */
export async function borrarRegistros() {
  try {
    let db = getDB();
    if (!db) {
      console.log("⚠️ DB aún no abierta, abriendo...");
      db = await openDatabase();
    }

    if (!db) return;

    await db.runAsync("DELETE FROM registros;");
    console.log("✅ Todos los registros han sido borrados");
  } catch (error) {
    console.log("❌ Error al borrar registros:", error);
  }
}

/**
 * Borra la tabla completa y la vuelve a crear
 */
export async function reiniciarTabla() {
  try {
    let db = getDB();
    if (!db) {
      console.log("⚠️ DB aún no abierta, abriendo...");
      db = await openDatabase();
    }

    if (!db) return;

    // Borrar tabla completa si existe
    await db.runAsync("DROP TABLE IF EXISTS registros;");
    console.log("🗑 Tabla 'registros' eliminada");

    // Crear tabla de nuevo
    await db.runAsync(`
      CREATE TABLE registros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        peso REAL,
        grasa REAL,
        masa REAL,
        agua REAL,
        edadMetabolica REAL,
        visceral REAL,
        cintura REAL,
        cadera REAL,
        fecha TEXT
      );
    `);
    console.log("✅ Tabla 'registros' creada de nuevo");
  } catch (error) {
    console.log("❌ Error al reiniciar la tabla:", error);
  }
}

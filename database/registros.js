import { getDB, openDatabase } from "./database";

/**
 * Guarda un nuevo registro de peso/grasa/masa/imc con la fecha actual.
 */
export async function addRegistro(peso, grasa, masa, imc) {
  try {
    // Esperar que la DB esté abierta
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

    // Ejecutar el insert de forma segura
    await db.runAsync(
      "INSERT INTO registros (peso, grasa, masa, imc, fecha) VALUES (?, ?, ?, ?, ?);",
      [peso, grasa, masa, imc, fecha]
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

export async function borrarRegistros() {
  try {
    let db = getDB();
    if (!db) {
      console.log("⚠️ DB aún no abierta, abriendo...");
      db = await openDatabase();
    }

    if (!db) {
      console.log("❌ No se pudo obtener la instancia de DB");
      return;
    }

    await db.runAsync("DELETE FROM registros;");

    console.log("✅ Todos los registros han sido borrados");
  } catch (error) {
    console.log("❌ Error al borrar registros:", error);
  }
}

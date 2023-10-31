import pool from "../config/database"
import queries from "./queries/database"

// crea todas las tablas y triggers de la base de datos (si no han sido creadas previamente)
export const dbInit = async () => {
    try{
        await pool.execute(queries.createTablesAndTriggers)
    } catch {
        process.exit(1)
    }
}

import 'dotenv/config'
import { Pool } from 'pg'

// clase para simplificar las conexiones a base de datos
class DataPool {
    pool: Pool

    constructor(uri: string) {
        this.pool = new Pool({connectionString: uri})
    }

    execute = async (sentence: string, args: Array<any> = []) => {
        const op = await this.pool.query(sentence, args) // realiza la operacion
        await this.pool.end() // finaliza la conexion a bd
        return op
    }
}

const pool = new DataPool(<string> process.env.DB_URI)

export default pool
import 'dotenv/config'
import { Sequelize } from 'sequelize'

const db = <string> process.env.DB_URI

const database = new Sequelize(db)

export default database
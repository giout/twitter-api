import 'dotenv/config'
import { connect } from 'mongoose'

export async function connection() {
    try {
        const uri = process.env.DB_URI
        await connect(<string> uri)
    } catch (err) {
        console.log(err)
    }

}
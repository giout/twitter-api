import 'dotenv/config'
import app from './config/app'
import { connection } from './config/database'

const port = process.env.PORT || 4000

connection().then(() => console.log('Connected'))

app.listen(port, () => {console.log('Listening on port', port)})
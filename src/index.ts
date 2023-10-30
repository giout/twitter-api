import 'dotenv/config'
import app from './config/app'
import { dbInit } from './db/init'

const port = process.env.PORT || 4000

dbInit().then(() => console.log('DB setup completed'))
app.listen(port, () => {console.log('Listening on port', port)})
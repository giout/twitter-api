import 'dotenv/config'
import app from './config/app'
import database from './config/database'

const port = process.env.PORT || 4000

database.authenticate().then(() => console.log('Connected to db'))

app.listen(port, () => {console.log('Listening on port', port)})
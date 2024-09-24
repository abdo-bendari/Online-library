import express from "express"
import { bootstrap } from "./src/bootstrap.js";
import dbConn from "./database/dbConnection.js";
const app = express()
const port = 3000


bootstrap(app, express);
dbConn
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
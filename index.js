const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
// var app = express()

const conectTomongo=require('./db');
conectTomongo();
app.use(cors())
app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/routes')

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
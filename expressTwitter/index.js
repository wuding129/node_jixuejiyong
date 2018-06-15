let express = require('express')

let app = express()

app.get('/', (req, res) => {
  res.send('node twitter')
})

app.listen(8000)
console.log('listening 8000')

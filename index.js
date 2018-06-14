let net = require('net')

let chatServer = net.createServer()

chatServer.on('connection', (client) => {
  client.write('Hi\n')

  client.on('data', (data) => {
    console.log(data)
  })
})

chatServer.listen(9000)
console.log('listening on 9000')

let net = require('net')

let chatServer = net.createServer(),
    clientList = []

chatServer.on('connection', (client) => {
  client.name = `nikename: (${Math.random().toString(32).substr(2)})`
  client.write(`Hi, ${client.name}!\n\r`)

  clientList.push(client)

  // 监听数据
  client.on('data', (data) => {
    console.log(data.toString())
    broadcast(data, client)
  })

  // 监听结束
  client.on('end', () => {
    clientList.splice(clientList.indexOf(client), 1)
  })

  // 记录错误
  client.on('error', (e) => {
    console.log(e)
  })
})

function broadcast(message, client) {
  let cleanup = []
  for (let i = 0; i < clientList.length; i++) {
    if (client !== clientList[i]) {
      if (clientList[i].writable) {
        console.log(message.toString())
        clientList[i].write(client.name + " says: " + message + '\n\r')
      } else {
        cleanup.push(clientList[i])
        clientList[i].destroy()
      }
    }
  }

  // 删除死节点，消除垃圾索引
  for (let i = 0; i < cleanup.length; i++) {
    clientList.splice(clientList.indexOf(cleanup[i]), 1)
  }
}


chatServer.listen(9000)
console.log('listening on 9000')

const io = require('socket.io-client')

const socket = io.connect('http://localhost:3000')

socket.on('connect', () => {
  // join { p: password, name: yourName }
  socket.emit('join', { p: 1111, name: 'aob' }, res => {
    console.log(res)
  })

  // someoneConnect { name: nameWhoHasConnect }
  socket.on('someoneConnect', res => {
    console.log(res.name, 'connected')
  })

  // someoneDisconnect { name: nameWhoHasDisconnect }
  socket.on('someoneDisconnect', res => {
    console.log(res.name, 'disconnected')
  })
})

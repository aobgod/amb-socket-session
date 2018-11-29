const io = require('socket.io-client')

const socket = io.connect('http://localhost:3000')

socket.on('connect', () => {
  // join { p: password, name: yourName }
  // someoneConnect { name: nameWhoHasConnect }
  // someoneDisconnect { name: nameWhoHasDisconnect }
})

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let rooms = {
  p1111: {
    players: {},
    maxplayers: 3
  },
  p2222: {
    players: {},
    maxplayers: 3
  }
}

io.on('connect', socket => {
  socket.on('join', (data, callback) => {
    if (rooms['p' + data.p] && rooms['p' + data.p].maxplayers > Object.keys(rooms['p' + data.p].players).length) {
      rooms['p' + data.p].players[socket.id] = data.name
      socket.name = data.name
      socket.join('p' + data.p)
      socket.broadcast.to('p' + data.p).emit('someoneConnect', { name: data.name })
      console.log(data.name, 'joined', data.p)
      callback(rooms)
    } else {
      callback('error คนเต็ม')
    }
  })

  socket.on('disconnect', () => {
    for (const p in rooms) {
      for (const id in rooms[p].players) {
        if (rooms[p].players[id] && id === socket.id) {
          delete rooms[p].players[id]
          socket.broadcast.emit('someoneDisconnect', { name: socket.name })
        }
      }
    }
  })
})

http.listen(3000, () => console.log('listening on 3000'))

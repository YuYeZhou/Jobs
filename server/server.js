const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connect', (socket)=>{
  socket.on('sendmsg', (data)=>{
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to ,content: msg}, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
    // console.log(data)
    // io.emit('recvmsg', data)
  })
})


app.use(cookParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(9093, () => {
  console.log('Node app start at port 9093')
})
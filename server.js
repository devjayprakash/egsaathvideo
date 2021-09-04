let express = require('express')
let app = express()
let httpServer = require('http').createServer(app)
let io = require('socket.io')(httpServer)

app.use(express.static('public'))

let connections = []

io.on('connection' , socket => {
    console.log(`new connection made with the server | total - ${connections.length + 1}`);
    connections.push(socket)

    socket.on("played_video" , data => {
        connections.forEach(soc => {
            if (soc.id !== socket.id){
                soc.emit("aayaaa" , data)
            }
        })
    })

    socket.on('disconnect' , (reson) => {
        connections = connections.filter(soc => soc.id !== socket.id)
        console.log(`User disconnected. Total user - ${connections.length}`);
    })
})

let PORT = process.env.PORT || 8080

httpServer.listen(PORT , () => {
    console.log("Server started successfully");
})

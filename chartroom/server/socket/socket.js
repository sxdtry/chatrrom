module.exports = io => {
    io.on("connection",socket=>{
        socket.on("send",data=>{
            io.emit("broadcast",data)
        })
    })
}
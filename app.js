const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: { origin: "*" }
});


app.set('view engine', 'ejs');
app.use(express.static("views"));


app.get('/', (req, res) => { 

    res.render("index");
})


//makes sure its server.listen not app.listen
//app.listen causes the socket.io cdn have a 404 error
server.listen(5000, () => { 
    console.log("server has started . . .");
})

io.on('connection', (socket) => { 
    console.log("a user has loged in");
    socket.on("message", (data) => { 
        console.log(data);
        socket.broadcast.emit("message", data);
    })
})
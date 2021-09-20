const { instrument } = require("@socket.io/admin-ui");
const app = require("express")();
const randomstring = require("randomstring");
const _ = require('lodash');
const httpServer = require("http").createServer(app);
const roomService = require('./services/roomService');

const port = process.env.PORT || 3001;

var rooms = [];

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    allowEIO3: true,
  }
});


app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});


io.on("connection", socket => {
  console.log(`User ${socket.id} connected`);
  io.in(socket.id).emit('timer-conn-status', `User ${socket.id} connected`);

  // ***********************************************************
  //                create-room event
  // ***********************************************************
  socket.on('create-room', (length=5) => {
    if (socket.rooms.size < 2) {
      const randomString = randomstring.generate(length);
      socket.join(randomString);
      io.in(randomString).emit('create-room-msg', `Successfully created and joined '${randomString}' room `);
      console.log(`Successfully created and joined '${randomString}' room `);

      // Create room object.
      const room = {
        roomId: randomString,
        duration: 0,
        timerId: undefined,
        currentTime: 0,
        isRunning: false,
      };

      rooms.push(room);

    } else {
      io.in(socket.id).emit('create-room-err-msg', `Error, unable to create room`);
      console.log(`Error, unable to create room`);
    }
  });

  // ***********************************************************
  //                join-room event
  // ***********************************************************
  socket.on('join-room', (roomName=undefined) => {

    if (roomName) {
      socket.join(roomName);

      console.log('Successfully joined room: ' + roomName);
      io.in(socket.id).emit('join-room-msg', `Successfully joined room: '${roomName}'`);

    } else {
      io.in(socket.id).emit('join-room-err-msg', 'Please provide room name.');
    }
  });

  // ***********************************************************
  //                set-timer-duration event
  // ***********************************************************
  socket.on('set-timer-duration', (timerDuration) => {

    if (!isNaN(timerDuration)) {
      console.log('received: ' + timerDuration);
    
      var duration = parseInt(timerDuration, 10);        
      duration = duration > 0 ? duration : 10;

      const room = roomService.findRoom(rooms, socket);
      room.duration = duration;

      io.in(socket.id).emit('timer-duration', duration);
    }
  });

  // ***********************************************************
  //                set-timer-action event
  // ***********************************************************
  socket.on('set-timer-action', (timerAction) => {

    if (isNaN(timerAction)) {
      console.log(timerAction);
      const room = roomService.findRoom(rooms, socket);

      if (timerAction === 'start') {
        startCountdownTimer(room.duration);
      }

      if (timerAction === 'pause') {
        const timerId = room.timerId;
        clearInterval(timerId);
      }

      if (timerAction === 'resume') {
        startCountdownTimer(room.currentTime);
      }

      if (timerAction === 'stop') {
        const timerId = room.timerId;
        clearInterval(timerId);

        rooms = roomService.removeRoom(rooms, socket);
        room.duration = 0;
        io.in(roomService.getRoomId(socket)).emit('set-timer-action', 0);
      }

    } else {
      io.in(socket.id).emit('timer-room-action-err', 'Please provide one of the following timer action: (start, pause, resume or stop)');
    }
  });

  // ***********************************************************
  //                disconnect event
  // ***********************************************************
  socket.on('disconnect', function () {
    console.log('User ' + socket.id + ' disconnected');
    io.in(roomService.getRoomId(socket)).emit('timer-conn-status', `${socket.id} disconnected.`)
 });

 
  // ***********************************************************
  //                        Timer  
  // ***********************************************************
  function startCountdownTimer(duration) {

    const room = roomService.findRoom(rooms, socket);

    if (duration != 0) {
      var timerId = setInterval(function () {
        io.sockets.in(roomService.getRoomId(socket)).emit('timer-countdown', duration);
  
        duration -= 1;
        room.currentTime =  duration;
      }, 1000, duration);
      room.timerId = timerId;
    }
  }
});


instrument(io, {auth: false});
httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
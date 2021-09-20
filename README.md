# socket.io-countdown-timer
Simple real-time countdown timer that allows multiple client connections to update and view the same timer instance on the server.

## Features
- Create or Join a Socket.IO room.
- Set timer duration.
- Multiple clients can Start, Stop, Pause and Resume the same timer instance. Example: Client_A can start a timer_1, and Client_B can view, pause and stop timer_1.

## How to run the project for the first time?
```sh
# To run client:
$ cd client
$ npm i
$ npm run serve

# To run server:
$ cd server
$ npm i
$ npm run api
```

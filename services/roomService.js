const _ = require('lodash');

exports.getRoomId = (socket) => {
  return socket.rooms.size > 1 ? Array.from(socket.rooms)[1] : Array.from(socket.rooms)[0];
};

exports.findRoom = (rooms, socket) => {
  const roomId = this.getRoomId(socket);

  const room = _.find(rooms, function(r) { 
    return r.roomId === roomId ? r.roomId : undefined; 
  });

  return room;
};

exports.removeRoom = (rooms, socket) => {

  const roomId = this.getRoomId(socket);

  return _.remove(rooms, (r) => {
    return r.roomId === roomId;
  });
}
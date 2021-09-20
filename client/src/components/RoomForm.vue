<template>
  <div>
    <div v-if="!showRoomForm">
      <button @click="onShowJoinRoomForm" type="button">Show Join Room</button>
    </div>
    <div v-else>
      <button type="button" @click="createRoom">Create a room</button>
      <br /> <br /> OR <br /><br /> 
      <form>
        <label for="room"
          >Join to Room<br /> 
          <input type="text" v-model="roomName" name="room_name" id="room" />
        </label>
        <button type="button" @click="joinRoom">Set Room Name</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomForm",
  data() {
    return {
      roomName: "",
      showRoomForm: false
    };
  },
  methods: {
    createRoom() {
      this.$socket.emit('create-room', '');
      this.showRoomForm = false;
      this.$emit('onShowJoinRoomForm');
    },
    joinRoom() {
      this.$socket.emit('join-room', this.roomName);
      this.showRoomForm = false;
      this.$emit('onShowJoinRoomForm');
    },
    onShowJoinRoomForm(){
      this.showRoomForm = true;
    }
  },
};
</script>
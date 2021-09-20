<template>
  <div id="home">
    <h4>Room Joined: {{roomMsg}}</h4>
    <div v-if="showJoinRoomForm">
      <room-form  @onShowJoinRoomForm="onShowJoinRoomForm"></room-form>
    </div>
    <div v-if="!showJoinRoomForm && !showTimer">
      <br />
      <br />
      <timer-form @onSetTimerDuration="onSetTimerDuration"></timer-form>
    </div>
    <div v-if="showTimer">
      <br />
      <br />
      <div class="timer">{{time}}</div>
      <timer @onTimerAction="onTimerAction" :is-running="isRunning"></timer>
    </div>
  </div>
</template>

<script>
import Timer from './Timer.vue';
import TimerForm from './TimerForm.vue';
import RoomForm from './RoomForm.vue';

export default {
  name: 'App',
  components: {
    RoomForm,
    TimerForm,
    Timer
  },
  data() {
    return {
      showJoinRoomForm: true,
      showTimer: false,
      roomMsg: '<Empty>',
      time: 0,
      isRunning: false,
    }
  },
  mounted() {
    this.sockets.subscribe('create-room-msg', data => {
      this.roomMsg = data.match(/'(.*?)'/)[1];
    });
    this.sockets.subscribe('join-room-msg', data => {
      this.roomMsg = data.match(/'(.*?)'/)[1];
      alert(data);
    });
    this.sockets.subscribe('timer-countdown', data => {
      this.time = data;
      this.showTimer = true;
      this.showJoinRoomForm = false;
      this.isRunning = true;
    });
    this.sockets.subscribe('set-timer-action', data => {
      this.time = data;
      this.showTimer = false;
      this.showJoinRoomForm = false;
    });
    this.sockets.subscribe('timer-duration', data => {
      this.time = data;
    });
  },
  methods: {
    onShowJoinRoomForm() {
      this.showJoinRoomForm = false;
    },
    onSetTimerDuration() {
      this.showTimer = true;
    },
    onTimerAction (action) {
      if (action === 'stop') {
        this.showTimer = false;
        this.showJoinRoomForm = false;
      }
    }
  }
}
</script>

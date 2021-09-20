<template>
  <div>
    <button v-if="showStartBtn" @click="startTimer">Start</button>
    <button v-if="showPauseBtn" @click="pauseTimer">Pause</button>
    <button v-if="showResumeBtn" @click="resumeTimer">Resume</button>
    <button v-if="showStopBtn" @click="stopTimer">Stop</button>

  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    isRunning: Boolean
  },
  data() {
    return {
      time: 0,
      showStartBtn: this.isRunning ? false: true,
      showPauseBtn: this.isRunning ? true: false,
      showResumeBtn: false,
      showStopBtn: this.isRunning ? true: false
    }
  },
  methods: {
    startTimer() {
      this.$socket.emit('set-timer-action', 'start');
      this.showStartBtn = false;
      this.showPauseBtn = true;
      this.showStopBtn = true;
      this.showResumeBtn = false;
    },
    pauseTimer() {
      this.$socket.emit('set-timer-action', 'pause');
      this.showResumeBtn = true;
      this.showStartBtn = false;
      this.showPauseBtn = false;
      this.showStopBtn = false;
    },
    resumeTimer() {
      this.$socket.emit('set-timer-action', 'resume');
      this.showStartBtn = false;
      this.showPauseBtn = true;
      this.showStopBtn = true;
      this.showResumeBtn = false;
    },
    stopTimer() {
      this.$socket.emit('set-timer-action', 'stop');
      this.showStartBtn = false;
      this.showPauseBtn = false;
      this.showStopBtn = false;
      this.showResumeBtn = false;
      this.$emit('onTimerAction', 'stop');
    }
  }

}
</script>
<template>
<div>
    <div>
      <h2>Timer Duration</h2>
    </div>
    <div>
      <form>
        <label for="min">Minutes<br />
          <input type="number" v-model="minutes" name="time_m" id="min" min="0" max="59">
        </label>
        <label for="sec">Seconds<br />
          <input type="number" v-model="seconds" name="time_s" id="sec" max="59" min="0">
        </label>
        <button type="button" @click="sendTime">Set time</button>
      </form>
    </div>

</div>

</template>
<script>
export default {
  name: "TimeForm",
  data() {
    return {
      minutes: 0,
      seconds: 0,
    };
  },
  methods: {
    sendTime() {
      const secs = (this.minutes * 60) + this.seconds;
      this.$socket.emit('set-timer-duration', secs);
      this.$emit("onSetTimerDuration");
    }
  }
}
</script>

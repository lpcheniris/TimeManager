<template>
  <div class="container">
    <div class="time-picker-container">
      <a-time-picker class="time-picker" v-model="startTime" />
      <a-button
        class="circle-button"
        shape="circle"
        size="large"
        type="primary"
        v-on:click="startClick"
      >Start</a-button>
    </div>
    <div class="time-picker-container">
      <a-time-picker class="time-picker" :value="endTime" />
      <a-button
        class="circle-button"
        shape="circle"
        size="large"
        type="primary"
        v-on:click="endClick"
      >End</a-button>
    </div>
    <div class="timer-container">{{durationText}}</div>
    <div class="submit-container">
      <a-button type="primary" @click="submit" :disabled="!this.endTime">Submit</a-button>
    </div>
  </div>
</template>

<script>
import moment, { duration, months } from "moment";
import timer from "moment-timer";
import numeral from "numeral";

export default {
  name: "Timer",
  data() {
    return {
      startTime: "",
      endTime: "",
      intervelTimer: "",
      durationTime: "",
      durationText: "00:00:00",
      durationHours: 0,
      durationMinutes: 0,
      durationSeconds: 0,
    };
  },
  methods: {
    startClick() {
      this.endTime = "";
      this.startTime = moment();
      this.intervelTimer = null;
      this.intervelTimer = moment.duration(1, "seconds").timer(
        {
          loop: true,
        },
        this.setIntervelTime
      );
    },
    endClick() {
      this.endTime = moment();
      this.intervelTimer.stop();
    },
    setIntervelTime() {
      let duration = moment.duration(moment().diff(this.startTime));
      this.durationTime = duration.seconds();
      this.durationHours = numeral(duration.hours()).format("00");
      this.durationMinutes = numeral(duration.minutes()).format("00");
      this.durationSeconds = numeral(duration.seconds()).format("00");
      this.durationText =
        this.durationHours +
        ":" +
        this.durationMinutes +
        ":" +
        this.durationSeconds;
    },
    submit() {
      let data = {
        startTime: this.startTime.valueOf(),
        endTime: this.endTime.valueOf(),
        durationTime: this.durationTime,
      };
      console.log(data)
    },
  },
};
</script>

<style>
.time-picker {
  min-width: 50%;
}
.circle-button {
  margin-top: 10px;
}
.submit-container {
  text-align: center;
}
.timer-container {
  text-align: center;
  font-size: 38px;
  margin-bottom: 20px;
}
.time-picker-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.links {
  padding-top: 15px;
}
</style>

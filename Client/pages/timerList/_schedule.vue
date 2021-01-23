<template>
  <div class="timerlist-container">
    <div class="schedule-title" v-if="timers.length > 0">
      <div
        class="schedule-name-block"
        :style="{ background: timers[0].plane.color }"
      ></div>
      {{ timers[0].schedule.schedule }}
    </div>
    <div
      :key="timer._id"
      v-for="timer in timers"
      class="timer-item-container"
      :style="{ 'border-color': timer.plane.color }"
    >
      <div class="plane-name">
        <div>{{ timer.comment }}</div>
      </div>
      <p>{{ timer.scheduleule }}</p>
      <p class="duration">{{ transferDuration(timer.durationTime) }}</p>
      <p>
        {{
          transferTime(timer.startTime) + " to " + transferTime(timer.endTime)
        }}
      </p>
    </div>
  </div>
</template>

<script>
import moment, { duration, months } from "moment";
import numeral from "numeral";
import axios from "axios";

export default {
  name: "TimerList",
  data() {
    return {
      timers: [],
    };
  },

  mounted: function () {
    axios({
      method: "get",
      url: "/api/timer/BySchedule/" + this.$nuxt.$route.params.schedule,
    }).then((res) => {
      this.timers = res.data.data;
    });
  },

  methods: {
    transferDuration(time) {
      let hours = numeral(time / 3600).format("00");
      let minutes = numeral((time - hours * 3600) / 60).format("00");
      let seconds = numeral(time - hours * 3600 - minutes * 60).format("00");
      return hours + ":" + minutes + ":" + seconds;
    },
    transferTime(time) {
      return moment(time).format("YY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style>
.schedule-title {
  font-size: 24px;
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px;
}

.duration {
  font-weight: bold;
}
.schedule-name-block {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 8px;
}
.timer-item-container > .plane-name {
  color: 14px;
  display: flex;
  font-weight: bold;
  padding: 10px;
  border-bottom: solid 1px #aaa;
}
.timer-item-container p {
  margin: 10px 15px;
}
.timer-item-container {
  border: solid 2px;
  margin: 20px;
  border-radius: 5px;
}
</style>

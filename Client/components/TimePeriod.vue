<template>
  <div class="time-period-container">
    <a-radio-group :default-value="timePeriods[this.period]" button-style="solid" @change="changeTimePeriod">
      <a-radio-button
        :key="timePeriod.text"
        v-for="timePeriod in timePeriods"
        :value="timePeriod"
      >{{timePeriod.text}}</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
import {isNumber} from "lodash"
export default {
  name: "TimePeriod",
  props: ["defaultPeriodIndex"],
  data() {
    return {
      timePeriods: [
        {
          seconds: 24 * 60 * 60,
          text: "Day",
        },
        {
          seconds: 7 * 24 * 60 * 60,
          text: "Week",
        },
        {
          seconds: 30 * 24 * 60 * 60,
          text: "Month",
        },
      ],
      period: isNumber(this.defaultPeriodIndex) ? this.defaultPeriodIndex: 1
    };
  },
  mounted: function () {
    let timePeriod = this.timePeriods[this.period]
     this.$emit("change", timePeriod);
  },
  methods: {
    changeTimePeriod(e) {
      this.$emit("change", e.target.value);
    },
  },
};
</script>

<style>
.time-period-item {
  flex: 1;
  margin: 10px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
}

.time-period-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>

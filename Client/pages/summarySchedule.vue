<template>
  <div>
    <TimePeriod @change="timePeriodChange" :defaultPeriodIndex="0"></TimePeriod>
    <div class="last-next-container">
      <a-button
        type="primary"
        shape="circle"
        icon="left"
        size="small"
        @click="handleLastDay"
      />
      <div class="date-text">
        <div v-if="this.period == 'Week'">{{ this.currentDate.week() }}</div>
        <div v-if="this.period == 'Month'">
          {{ this.currentDate.month() + 1 }}
        </div>
        <div>{{ currentDateText }}</div>
      </div>
      <a-button
        type="primary"
        shape="circle"
        icon="right"
        size="small"
        @click="handleNextDay"
        :disabled="currentDate.isSameOrAfter(moment())"
      />
    </div>
    <div class="statistic-container">
      <div
        :key="timerGroupByPlane[plane].planeName"
        v-for="plane in Object.keys(timerGroupByPlane)"
      >
        <div class="summary">
          <label
            class="summary-label"
            :style="{ 'background-color': timerGroupByPlane[plane].color }"
          />
          <div class="summary-plane-name">
            {{ plane }}
          </div>
          <div class="summary-plane-time">
            {{ convertSecondsTOTime(timerGroupByPlane[plane].durationTime) }}
          </div>
        </div>
      </div>
    </div>
    <div class="hours-container"></div>
  </div>
</template>
<script>
import TimePeriod from "../components/TimePeriod";
import { merge } from "lodash";
import moment from "moment";
import axios from "axios";
import { convertSecondsTOTime } from "../utils/time";

export default {
  name: "SummarySchdules",
  components: {
    TimePeriod,
  },
  data() {
    return {
      period: "",
      currentDate: moment(),

      timerList: [],
      planeList: [],
      startTime: null,
      endTime: null,
    };
  },
  computed: {
    timerGroupByPlane: function () {
      return merge({}, this.planeList, this.groupTimerList(this.timerList));
    },
    currentDateText: function () {
      let isTimeValiable = this.startTime && this.endTime;
      if (this.period == "Day" && isTimeValiable) {
        return `${moment(Number(this.startTime)).format("YYYY-MM-DD")}`;
      } else if (isTimeValiable) {
        return `${moment(Number(this.startTime)).format(
          "YYYY-MM-DD"
        )} to ${moment(Number(this.endTime)).format("YYYY-MM-DD")}`;
      }
    },
  },

  mounted: function () {
    axios({
      method: "get",
      url: "/api/plane",
    }).then((res) => {
      let data = res.data.data.reduce((r, a) => {
        r[a.name] = a;
        return r;
      }, {});
      this.planeList = data;
    });
    this.loadTimerData();
  },
  methods: {
    moment,
    timePeriodChange(data) {
      this.currentDate = moment();
      this.period = data.text;
      this.setStartAndEndTime();
      this.loadTimerData();
    },
    convertSecondsTOTime,
    setStartAndEndTime() {
      this.startTime = this.currentDate
        .startOf(this.period.toLowerCase())
        .format("x");
      this.endTime = this.currentDate
        .endOf(this.period.toLowerCase())
        .format("x");
    },
    loadTimerData() {
      this.setStartAndEndTime();
      axios({
        method: "get",
        url: `/api/timer/byDate/${this.startTime}/${this.endTime}`,
      }).then((res) => {
        let data = res.data.data;
        this.timerList = data;
      });
    },
    groupTimerList(timerList) {
      let groupByPlane = timerList.reduce((r, a) => {
        r[a.plane.name] = {
          ...r[a.plane.name],
          durationTime: r[a.plane.name]
            ? r[a.plane.name]["durationTime"] + a.durationTime
            : a.durationTime,
        };
        return r;
      }, {});
      return groupByPlane;
    },
    handleLastDay() {
      this.currentDate = this.currentDate.subtract(1, this.period);
      this.loadTimerData();
      this.resetTimerList();
    },
    handleNextDay() {
      this.currentDate = this.currentDate.add(1, this.period);
      this.loadTimerData();
      this.resetTimerList();
    },
    resetTimerList() {
      this.timerList = [];
    },
  },
};
</script>

<style>
.summary-plane-time {
  width: 30%;
}
.summary-plane-name {
  flex: 1;
}
.summary-label {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 10px;
}
.summary {
  margin: 0 10px;
  padding: 5px;
  display: flex;
  align-items: center;
}
.last-next-container .date-text {
  flex: 1;
  text-align: center;
}
.last-next-container {
  display: flex;
  justify-content: space-around;
  margin: 10px 20px;
  align-items: center;
    height: 42px;
}
</style>

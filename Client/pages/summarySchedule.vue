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
    <div class="total-duration">
      <div class="total-progress">
        <a-progress
          type="dashboard"
          :width=120
          :percent="parseInt((totalDuration / calculateTotalPlanDuration()) * 100)"
        />
      </div>
      <label>{{ convertSecondsTOTime(totalDuration) }} </label> 
      <label>{{convertSecondsTOTime(calculateTotalPlanDuration())}}</label>
    </div>
    <div class="statistic-container">
      <div
        :key="timerGroupByPlan[plan].planName"
        v-for="plan in Object.keys(timerGroupByPlan)"
        class="plan-summary"
      >
        <div class="summary">
          <label
            class="summary-label"
            :style="{ 'background-color': timerGroupByPlan[plan].color }"
          />
          <div class="summary-plan-name">
            {{ plan }}
          </div>
          <div class="summary-plan-time">
            <label :style="{ color: timerGroupByPlan[plan].color }">{{
              convertSecondsTOTime(timerGroupByPlan[plan].durationTime)
            }}</label>
            /
            {{
              convertSecondsTOTime(calculateTotalPlanDuration(timerGroupByPlan[plan].duration))
            }}
          </div>
        </div>
        <div class="summary-progress">
          <a-progress
            :stroke-color="timerGroupByPlan[plan].color"
            :percent="calculateProgress(plan)"
          />
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
import { hexToRgb } from "../utils/utils";

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
      planList: [],
      startTime: null,
      endTime: null,
      totalDuration: 0,
    };
  },
  computed: {
    timerGroupByPlan: function () {
      return merge({}, this.planList, this.groupTimerList(this.timerList));
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
      url: "/api/plan",
    }).then((res) => {
      let data = res.data.data.reduce((r, a) => {
        r[a.name] = a;
        return r;
      }, {});
      this.planList = data;
    });
    this.loadTimerData();
  },
  methods: {
    moment,
    convertSecondsTOTime,
    hexToRgb,
    calculateProgress(plan) {
      let planObj = this.timerGroupByPlan[plan];
      return parseInt(planObj.duration
        ? (planObj.durationTime / this.calculateTotalPlanDuration(planObj.duration)) * 100
        : 0);
    },
    timePeriodChange(data) {
      this.currentDate = moment();
      this.period = data.text;
      this.setStartAndEndTime();
      this.loadTimerData();
    },
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
        this.totalDuration = this.calculateTotalDuration(data);
      });
    },
    groupTimerList(timerList) {
      let groupByPlan = timerList.reduce((r, a) => {
        r[a.plan.name] = {
          ...r[a.plan.name],
          durationTime: r[a.plan.name]
            ? r[a.plan.name]["durationTime"] + a.durationTime
            : a.durationTime,
        };
        return r;
      }, {});
      return groupByPlan;
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
    calculateTotalDuration(list) {
      return list.reduce((r, a) => {
        r = r + a.durationTime;
        return r;
      }, 0);
    },
    calculateTotalPlanDuration(oneDayhours = 12.5) {
      let dayPlan =  oneDayhours * 60 * 60
      let weekPlan = dayPlan * 6
      let monthPlan = weekPlan * 4
      let seconds = 0
      if (this.period == "Day") {
        seconds = dayPlan
      } else if (this.period =="Week") {
        seconds = weekPlan
      } else if (this.period == "Month") {
        seconds = monthPlan
      }
      return seconds
    },
  },
};
</script>

<style>
.total-duration {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 10px;
}
.plan-summary {
  margin-bottom: 15px;
}
.summary-plan-name {
  flex: 1;
}
.summary-label {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 10px;
}
.summary {
  margin: 5px 15px 5px 15px;
  display: flex;
  align-items: center;
}
.summary-progress > div {
  margin: auto;
}
.summary-progress {
  padding: 0px 15px;
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

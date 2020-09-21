<template>
  <div>
    <div
      :key="schedule._id"
      v-for="schedule in schedules"
      class="schedule-item-container"
      :style="{'border-color': schedule.plane.color}"
    >
    <nuxt-link :to="'timer/'+schedule.plane._id + '/'+schedule._id">
      <div class="list-title">
        <div class="plane-name">
          <div class="plane-name-block" :style="{'background': schedule.plane.color}"></div>
          <div>{{schedule.plane.name}}</div>
        </div>
        <div
          class="time-period"
          :style="{'color': schedule.plane.color}"
        >{{schedule.timePeriod.text}}</div>
      </div>
      <div class="list-content">
        <div class="time-content">
          <section>{{schedule.schedule}}</section>
          <section class="rest-time" :style="{'color': schedule.plane.color}">
            Rest Time:
            <label>{{schedule | convertRestTime}}</label>
          </section>
        </div>
        <div class="time-content">
          <section>
            Total Time:
            <label>{{ schedule.duration | convertSecondsTOTime}}</label>
          </section>
          <section>
            Done Time:
            <label>{{schedule | convertCompletedTime}}</label>
          </section>
        </div>
     
     
     
      </div>
    </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment, { duration, months } from "moment";
import axios from "axios";
import { convertSecondsTOTime } from "../utils/time";

export default {
  name: "ScheduleList",
  data() {
    return {
      schedules: [],
    };
  },

  mounted: function () {
    axios({
      method: "get",
      url: "/api/schedule/",
    }).then((res) => {
      this.schedules = res.data.data;
    });
  },
  filters: {
    convertSecondsTOTime(time) {
      return convertSecondsTOTime(time);
    },
    convertRestTime(schedule) {
      let totalSeconds = 0;
      schedule.restTime.forEach((v) => {
        totalSeconds = totalSeconds + v.durationTime;
      });
      return convertSecondsTOTime(schedule.duration - totalSeconds);
    },
    convertCompletedTime(schedule) {
      let totalSeconds = 0;
      schedule.restTime.forEach((v)=> {
        totalSeconds = totalSeconds + v.durationTime;
      })
      return convertSecondsTOTime(totalSeconds);
    } 
  },
};
</script>

<style>
.time-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
}

.list-content label {
  font-weight: bold;
  font-size: 16px;
}

.list-content {
  padding: 15px;
  font-weight: normal;
  font-size: 14px;
}

.plane-name-block {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 8px;
}
.plane-name {
  display: flex;
}

.list-title {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px;
  color: 14px;
  border-bottom: solid 1px #aaa;
}

.rest-time {
  font-size: 18px;
}
.schedule-item-container a {
  color: #555;
}
.schedule-item-container p {
  margin: 10px 15px;
}
.schedule-item-container {
  border: solid 2px;
  margin: 20px;
  border-radius: 5px;
}
</style>

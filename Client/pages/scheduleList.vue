<template>
  <div>
    <div :key="schedule._id" v-for="schedule in schedules">
      <div
        class="schedule-item-container"
        :style="{ 'border-color': schedule.plane.color }"
      >
        <nuxt-link :to="'addtimer/' + schedule.plane._id +'/' + schedule._id">
          <div class="list-title">
            <div class="plane-name">
              <div
                class="plane-name-block"
                :style="{ background: schedule.plane.color }"
              ></div>
              <div>{{ schedule.plane.name }}</div>
              <div>
                <a-icon
                  class="done-icon"
                  type="check-circle"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  v-if="schedule.duration <= countRestTime(schedule.restTime)"
                />
              </div>
            </div>
            <div class="time-period" :style="{ color: schedule.plane.color }">
              {{ schedule.timePeriod.text }}
            </div>
          </div>
          <div class="list-content">
            <h4 class="schedule-name">{{ schedule.schedule }}</h4>
            <div class="time-content">
              <section
                class="rest-time"
                :style="{ color: schedule.plane.color }"
              >
                {{
                  schedule.duration > countRestTime(schedule.restTime)
                    ? "Rest Time:"
                    : "Exceed:"
                }}
                <label>{{ convertRestTime(schedule) }}</label>
              </section>
            </div>
            <div class="time-content">
              <section>
                Total Time:
                <label>{{ convertTotalTime(schedule.duration) }}</label>
              </section>
              <section>
                Done Time:
                <label>{{ convertCompletedTime(schedule) }}</label>
              </section>
            </div>
            <section class="foot-section">
              <div>
                <div>Start Time: {{ formatStartTime(schedule.startTime) }}</div>
                <div>End Time: {{ formatEndTime(schedule) }}</div>
              </div>
            </section>
            <div class="handler-wrapper">
              <a-button
                type="primary"
                html-type="submit"
                shape="round"
                v-on:click="handleDone(schedule._id, $event)"
                >Done</a-button
              >
              <a-button
                type="primary"
                html-type="submit"
                shape="round"
                v-on:click="handleFixTime(schedule._id, $event)"
                >Add Time</a-button
              >
               <a-button
                type="primary"
                shape="round"
                v-on:click="handleShowTimer(schedule._id, $event)"
                >Show Timer</a-button
              >
              
            </div>
          </div>
        </nuxt-link>
      </div>
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
    this.loadSechedules();
  },
  methods: {
    loadSechedules() {
      console.log("ok");
      axios({
        method: "get",
        url: "/api/schedule/",
      }).then((res) => {
        this.schedules = res.data.data;
      });
    },
    countRestTime(list) {
      let totalSeconds = 0;
      list.forEach((v) => {
        totalSeconds = totalSeconds + v.durationTime;
      });
      return totalSeconds;
    },
    convertTotalTime(time) {
      return convertSecondsTOTime(time);
    },
    convertRestTime(schedule) {
      let totalSeconds = this.countRestTime(schedule.restTime);
      if (schedule.duration > totalSeconds) {
        return convertSecondsTOTime(schedule.duration - totalSeconds);
      } else {
        return convertSecondsTOTime(totalSeconds - schedule.duration);
      }
    },
    convertCompletedTime(schedule) {
      let totalSeconds = 0;
      schedule.restTime.forEach((v) => {
        totalSeconds = totalSeconds + v.durationTime;
      });
      return convertSecondsTOTime(totalSeconds);
    },
    formatStartTime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    formatEndTime(schedule) {
      return moment(schedule.startTime)
        .add(schedule.timePeriod.seconds, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    handleDone(scheduleID, event) {
      event.preventDefault();
      this.$confirm({
        title: "Do you Want to done the schedule?",
        onOk() {
          axios({
            method: "put",
            url: "/api/schedule/" + scheduleID,
          }).then((res) => {
            this.$message.success("Successfully!");
            this.loadSechedules();
          });
        },
      });
    },
    handleFixTime(scheduleId, event) {
      event.preventDefault();
      this.$router.push("/fixtimer/"+scheduleId)
    },
    handleShowTimer(scheduleId, event) {
      event.preventDefault();
       axios({
            method: "get",
            url: "/api/timer/length/" + scheduleId,
          }).then((res) => {
            if(res.data.dataSize == 0) {
              this.$message.success("No Data!");
            } else {
               this.$router.push("/timerList/"+scheduleId)
            }
        });
    }
  },
};
</script>

<style>
.ant-modal-confirm .ant-modal-confirm-btns {
  float: none;
  text-align: center;
}

.handler-wrapper {
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.schedule-name {
  font-size: 14px;
}

.foot-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.done-icon {
  font-size: 24px;
  margin-left: 10px;
}
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

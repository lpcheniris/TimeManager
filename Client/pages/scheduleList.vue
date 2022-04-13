<template>
  <div>
    <div class="search-container">
      <a-switch
        un-checked-children="Not Done"
        checked-children="Done"
        :value="isDoneSwitch"
        @change="isDoneChange"
      />
    </div>
    <div :key="schedule._id" v-for="schedule in schedules">
      <div
        class="schedule-item-container"
        :style="{ 'border-color': schedule.plan.color }"
      >
        <nuxt-link :to="'addtimer/' + schedule.plan._id + '/' + schedule._id">
          <div
            class="list-title"
            :style="{ 'border-color': schedule.plan.color }"
          >
            <div class="plan-name">
              <div
                class="plan-name-block"
                :style="{ background: schedule.plan.color }"
              ></div>
              <div>{{ schedule.plan.name }}</div>
            </div>
            <div class="time-period" :style="{ color: schedule.plan.color }">
              {{ schedule.timePeriod.text }}
              <div class="icon-wrraper">
                <a-icon
                  type="check-circle"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  v-show="schedule.isDone"
                />
              </div>
            </div>
          </div>
          <div class="list-content">
            <h4 class="schedule-name">{{ schedule.schedule }}</h4>
            <div class="time-content">
              <section
                class="rest-time"
                :style="{ color: schedule.plan.color }"
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
            <section class="start-end-time-section">
              <div>
                <div>Start Time: {{ formatStartTime(schedule.startTime) }}</div>
                <div>End Time: {{ formatEndTime(schedule) }}</div>
              </div>
            </section>
            <section>
              <div class="list-rate-container">
                <span>Importance:</span>
                <a-rate
                  :value="schedule.importance"
                  :allowClear="false"
                  disabled
                />
              </div>
              <div class="list-rate-container">
                <span>Emergency:</span>
                <a-rate
                  :value="schedule.emergency"
                  :allowClear="false"
                  disabled
                />
              </div>
            </section>
            <div class="handler-wrapper">
              <a-button
                type="primary"
                html-type="submit"
                shape="round"
                size="small"
                v-on:click="handleDone(schedule._id, $event)"
                >Done</a-button
              >
              <a-button
                type="primary"
                html-type="submit"
                shape="round"
                size="small"
                v-on:click="handleFixTime(schedule._id, $event)"
                >Add Time</a-button
              >
              <a-button
                type="primary"
                shape="round"
                size="small"
                v-on:click="handleShowTimer(schedule._id, $event)"
                >Show Timer</a-button
              >
              <a-button
                type="primary"
                shape="round"
                size="small"
                v-on:click="handleDeleteSchedule(schedule._id, $event)"
                >Delete</a-button
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
      isDoneSwitch: false,
    };
  },

  mounted: function () {
    this.loadSechedules();
  },
  methods: {
    isDoneChange(checked) {
      this.isDoneSwitch = checked;
      this.loadSechedules({ isDone: checked });
    },
    loadSechedules(param) {
      let data = {isDone: this.isDoneSwitch, ...param}
      axios({
        method: "get",
        url: "/api/schedule",
        params: data,
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
      let _this = this;
      this.$confirm({
        title: "Do you Want to done the schedule?",
        onOk() {
          axios({
            method: "put",
            url: "/api/schedule/" + scheduleID,
          }).then((res) => {
            _this.$message.success("Successfully!");
            _this.loadSechedules();
          });
        },
      });
    },
    handleFixTime(scheduleId, event) {
      event.preventDefault();
      this.$router.push("/fixtimer/" + scheduleId);
    },
    handleShowTimer(scheduleId, event) {
      event.preventDefault();
      axios({
        method: "get",
        url: "/api/timer/length/" + scheduleId,
      }).then((res) => {
        if (res.data.dataSize == 0) {
          this.$message.success("No Data!");
        } else {
          this.$router.push("/timerList/" + scheduleId);
        }
      });
    },
    handleDeleteSchedule(scheduleId, event) {
      event.preventDefault();
      let _this = this;
      this.$confirm({
        title: "Do you Want to done the schedule?",
        onOk() {
          axios({
            method: "delete",
            url: "/api/schedule/" + scheduleId,
          }).then(() => {
            _this.$message.success("Delete Data Successfully!");
            _this.loadSechedules();
          });
        },
      });
    },
  },
};
</script>

<style>
.search-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.time-period .icon-wrraper {
  font-size: 16px;
  margin-left: 5px;
}
.time-period {
  display: flex;
}
.list-rate-container span {
  margin-right: 10px;
}
.list-rate-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

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

.start-end-time-section {
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

.plan-name-block {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 8px;
}
.plan-name {
  display: flex;
}

.list-title {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px;
  color: 14px;
  border-bottom: solid 1px;
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
  border: solid 1px;
  margin: 20px;
  border-radius: 5px;
}
</style>

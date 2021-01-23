<template>
  <div class="timer-container">
    <div class="plane-title" v-if="schedule.plane">
      <div
        class="plane-name-block"
        :style="{ background: schedule.plane.color }"
      ></div>
      {{ schedule.plane.name }}
    </div>
    <a-form class="form-container" :form="timerForm">
      <a-form-item class="schedule-container">
        <a-input
          placeholder="Schedule"
          v-decorator="[
            'schedule',
            {
              rules: [
                { required: true, message: 'Please input your Schedule!' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="Comment"
          v-decorator="[
            'comment',
            {
              rules: [
                { required: true, message: 'Please input your Comment!' },
              ],
            },
          ]"
        />
      </a-form-item>

      <a-form-item class="time-picker-container">
        <a-time-picker
          class="time-picker"
          :minuteStep="10"
          :secondStep="30"
          v-decorator="[
            'startTime',
            {
              rules: [
                { required: true, message: 'Please select your Start Time!' },
                {
                  message: 'Start Time after End Time',
                  validator: handleTimeValidate,
                },
              ],
            },
          ]"
          @change="handleStartTime"
        />
      </a-form-item>

      <a-form-item class="time-picker-container">
        <a-time-picker
          class="time-picker"
          :minuteStep="10"
          :secondStep="30"
          v-decorator="[
            'endTime',
            {
              rules: [
                { required: true, message: 'Please select your End Time!' },
                {
                  message: 'Start Time after End Time',
                  validator: handleTimeValidate,
                },
              ],
            },
          ]"
          @change="handleEndTime"
        />
      </a-form-item>

      <div class="duration-container">{{ durationText }}</div>

      <div class="submit-container">
        <a-button type="primary" html-type="submit" @click="handleSubmit"
          >Submit</a-button
        >
      </div>
    </a-form>
  </div>
</template>

<script>
import moment, { duration, months } from "moment";
import timer from "moment-timer";
import numeral from "numeral";
import axios from "axios";

import {
  convertTimePeriodToSeconds,
  convertTimePeriodToString,
  handleTimeError,
} from "../../utils/time";

export default {
  name: "FixTimer",
  data() {
    return {
      durationTime: "",
      durationText: "00:00:00",
      schedule: {},
      startTime: "",
      endTime: "",
    };
  },
  beforeCreate() {
    this.timerForm = this.$form.createForm(this, { name: "timer form" });
  },
  mounted: function () {
    this.loadSchedule(this.$nuxt.$route.params.schedule);
  },
  methods: {
    moment,
    loadSchedule(schesuleId) {
      axios({
        method: "get",
        url: "/api/schedule/" + schesuleId,
      }).then((res) => {
        this.schedule = res.data.data;
        this.timerForm.setFieldsValue({ schedule: this.schedule.schedule });
      });
    },
    handleStartTime(startTime, startTimeString) {
      this.startTime = startTime;
      if (!!this.endTime) {
        this.durationText = convertTimePeriodToString(startTime, this.endTime);
        this.durationTime = convertTimePeriodToSeconds(startTime, this.endTime);
      }
    },
    handleEndTime(endTime, endTimeString) {
      this.endTime = endTime;
      if (!!this.startTime) {
        this.durationText = convertTimePeriodToString(this.startTime, endTime);
        this.durationTime = convertTimePeriodToSeconds(this.startTime, endTime);
      }
    },
    handleTimeValidate(rule, value, callBack) {
      if (this.startTime && this.endTime) {
        let error = handleTimeError(this.startTime, this.endTime);
        if (error) {
          callBack(error);
        } else {
          callBack();
        }
      }
    },
    resetTimer() {
      this.durationTime = "";
      this.durationText = "00:00:00";
    },
    handleSubmit() {
      this.timerForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data = {
            ...values,
            startTime: values.startTime.format("x"),
            endTime: values.endTime.format("x"),
            durationTime: this.durationTime,
            plane: this.schedule.plane,
          };
          axios({
            method: "post",
            url: "/api/timer",
            data: data,
          })
            .then(() => {
              this.$message.success("Successfully!");
              this.timerForm.resetFields();
              this.resetTimer();
            })
            .catch(function (error) {
              this.$message.error("I'm sorry!");
            });
        }
      });
    },
  },
};
</script>

<style>
.plane-title {
  font-size: 24px;
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px;
}

.schedule-name-block {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 8px;
}

.submit-container {
  display: flex;
  justify-content: center;
}

.time-picker {
  width: 100%;
}

.ant-btn-circle.ant-btn-lg,
.ant-btn-circle-outline.ant-btn-lg {
  min-width: 40px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.circle-button {
  margin-top: 10px;
}

.duration-container {
  text-align: center;
  font-size: 38px;
  margin-bottom: 20px;
}

.ant-time-picker-input[disabled] {
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.75);
}

.schedule-container {
  margin: 20px 0 30px;
}

.time-picker-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  text-align: center;
}
.form-container {
  width: 128px;
  min-width: 50%;
  margin: auto;
}
.timer-container {
  margin: 0 auto;
}
</style>

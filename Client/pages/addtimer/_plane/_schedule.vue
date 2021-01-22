<template>
  <div class="timer-container">
    <Plane
      :defaultPlane="activePlane"
      @change="planeChange"
      @initValue="(planeId) => initPlane(planeId)"
    ></Plane>
    <a-form class="form-container" :form="timerForm">
      <a-form-item class="schedule-container">
        <a-select
          placeholder="Schedule"
          v-decorator="['schedule', { rules: [{ required: true, message: 'Please input your schedule!'}] }]"
        >
          <a-select-option
            :key="schedule._id"
            v-for="schedule in schedules"
            :value="schedule._id"
          >{{schedule.schedule}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input
        placeholder="Comment"
        v-decorator="['comment', 
        { rules: [{ required: true, message: 'Please input your Comment!'}] }]"
        />
      </a-form-item>

      <a-form-item class="time-picker-container">
        <a-time-picker
          class="time-picker"
          :minuteStep=10
          :secondStep=30
          :default-open-value="moment('00:00:00', 'HH:mm:ss')"
          disabled
          v-decorator="[
          'startTime',
          { rules: [{ required: true, message: 'Please select your Start Time!' }] },
        ]"
        />
        <a-button
          class="circle-button"
          shape="circle"
          size="large"
          type="primary"
          v-on:click="startTimer"
        >Start</a-button>
      </a-form-item>

      <a-form-item class="time-picker-container">
        <a-time-picker
          class="time-picker"
          :minuteStep=10
          :secondStep=30
          :default-open-value="moment('00:00:00', 'HH:mm:ss')"
          disabled
          v-decorator="[
          'endTime',
          { rules: [{ required: true, message: 'Please select your End Time!' }] },
        ]"
        />
        <a-button
          class="circle-button"
          shape="circle"
          size="large"
          type="primary"
          v-on:click="endTimer"
        >End</a-button>
      </a-form-item>

      <div class="duration-container">{{durationText}}</div>

      <div class="submit-container">
        <a-button type="primary" html-type="submit" @click="handleSubmit">Submit</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import moment, { duration, months } from "moment";
import timer from "moment-timer";
import numeral from "numeral";
import axios from "axios";
import Plane from "../../../components/Plane";

export default {
  name: "Timer",
  components: {
    Plane,
  },
  data() {
    return {
      intervelTimer: "",
      durationTime: "",
      durationText: "00:00:00",
      durationHours: 0,
      durationMinutes: 0,
      durationSeconds: 0,
      activePlane: "",
      schedule: "",
      schedules: [],
    };
  },
  beforeCreate() {
    this.timerForm = this.$form.createForm(this, { name: "timer form" });
  },
  mounted: function () {
    if (!!this.$nuxt.$route.params.plane) {
      let plane = this.$nuxt.$route.params.plane;
      this.activePlane = plane;
    }
  },
  methods: {
    moment,
    initPlane(planeId) {
      if (!!this.activePlane) {
        if (!!this.$nuxt.$route.params.schedule) {
          this.refreshSchedule(this.activePlane, true);
        } else {
          this.refreshSchedule(this.activePlane, false);
        }
      } else {
        this.planeChange(planeId);
      }
    },
    startTimer() {
      this.timerForm.setFieldsValue({ endTime: "" });
      let time = moment();
      this.timerForm.setFieldsValue({ startTime: time });
      this.validateTimer();
      this.intervelTimer = moment.duration(1, "seconds").timer(
        {
          loop: true,
        },
        this.setIntervelTime
      );
    },
    endTimer() {
      this.validateTimer();
      let time = moment();
      this.timerForm.setFieldsValue({ endTime: time });
      this.setIntervelTime(time);
    },

    validateTimer() {
      if (!!this.intervelTimer) {
        this.intervelTimer.stop();
      }
    },
    planeChange(palneId) {
      this.activePlane = palneId;
      this.refreshSchedule(palneId, false);
    },
    refreshSchedule(planeId, fromRoute = false) {
      this.schedules = [];
      axios({
        method: "get",
        url: "/api/schedule/byPlaneId/" + planeId,
      }).then((res) => {
        this.schedules = res.data.data;
        if (fromRoute) {
          let schedule = this.$nuxt.$route.params.schedule;
          this.timerForm.setFieldsValue({ schedule: schedule });
        } else {
          this.timerForm.setFieldsValue({ schedule: "" });
        }
      });
    },
    setIntervelTime(time) {
      let startTime = this.timerForm.getFieldValue("startTime");
      let duration = moment.duration(moment().diff(startTime));
      this.durationTime = duration.seconds()+duration.hours()*60*60+duration.minutes()*60;
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
    resetTimer() {
      this.durationTime= ""
      this.durationText= "00:00:00"
      this.durationHours= 0
      this.durationMinutes= 0
      this.durationSeconds= 0
    },
    handleSubmit() {
      this.timerForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data = {
            ...values,
            startTime: values.startTime.format("x"),
            endTime: values.endTime.format("x"),
            durationTime: this.durationTime,
            plane: this.activePlane,
          };
          axios({
            method: "post",
            url: "/api/timer",
            data: data,
          }).then(() => {
            this.$message.success("Successfully!");
            this.timerForm.resetFields();
            this.resetTimer()
          }).catch(function (error) {
            this.$message.error("I'm sorry!");
          });
        }
      });
    },
  },
};
</script>

<style>
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

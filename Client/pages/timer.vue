<template>
  <div class="container">
    <div class="plane-container">
      <div
        class="plane-item"
        :key="plane._id"
        v-for="plane in planes"
        v-on:click="() => focusPlane(plane._id)"
      >
        <div
          class="plane-color-container"
          :style="{'border-color': activePlane == plane._id ? plane.color : '#fff' }"
        >
          <div class="plane-color" :style="{background: plane.color}"></div>
        </div>
        <p :style="{'color': activePlane == plane._id ? plane.color : '#777' }">{{plane.name}}</p>
      </div>
    </div>

    <a-form class="form-container" :form="timerForm">
      <a-form-item class="event-container">
        <a-input
          placeholder="Event"
          v-decorator="['event', { rules: [{ required: true, message: 'Please input your event!'}] }]"
        />
      </a-form-item>

      <a-form-item class="time-picker-container">
        <a-time-picker
          class="time-picker"
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

      <div class="timer-container">{{durationText}}</div>

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

export default {
  name: "Timer",
  data() {
    return {
      intervelTimer: "",
      durationTime: "",
      durationText: "00:00:00",
      durationHours: 0,
      durationMinutes: 0,
      durationSeconds: 0,
      planes: [],
      activePlane: "Soft Skills",
      event: "",
    };
  },
  beforeCreate() {
    this.timerForm = this.$form.createForm(this, { name: "validate form" });
  },
  mounted: function () {
    axios({
      method: "get",
      url: "api/plane/",
    }).then((res) => {
      this.planes = res.data.data;
      this.activePlane = this.planes[0]._id;
    });
  },
  methods: {
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
    focusPlane(palneId) {
      this.activePlane = palneId;
    },
    setIntervelTime(time) {
      let startTime = this.timerForm.getFieldValue("startTime");
      let duration = moment.duration(moment().diff(startTime));
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
    handleSubmit() {
      this.timerForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data = {
            ...values,
            durationTime: this.durationTime,
            plane: this.activePlane,
          };
          axios({
            method: "post",
            url: "/api/timer",
            data: data,
          }).then(() => {
            this.timerForm.resetFields();
          });
        }
      });
    },
  },
};
</script>

<style>
.plane-item div {
  border-radius: 3px;
}

.plane-item > p {
  text-align: center;
}

.plane-color-container {
  width: 58px;
  height: 58px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 2px;
}

.plane-color {
  width: 50px;
  height: 50px;
}

.plane-item {
  flex: 1;
  margin: 10px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
}

.plane-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.submit-container {
  display: flex;
  justify-content: center;
}

.time-picker {
  width: 100%;
}

.circle-button {
  margin-top: 10px;
}

.ant-time-picker-input[disabled] {
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.75);
}

.timer-container {
  text-align: center;
  font-size: 38px;
  margin-bottom: 20px;
}

.event-container {
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
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.links {
  padding-top: 15px;
}
</style>

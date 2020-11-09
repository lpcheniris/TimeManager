<template>
  <div class="add-schedule-container">
    <Plane @change="planeChange" @initValue="(v) => (this.plane = v)"></Plane>
    <TimePeriod
      @change="timePeriodChange"
      @initValue="(v) => (this.timePeriod = v)"
    ></TimePeriod>
    <a-form class="form-container" :form="addScheduleForm">
      <a-form-item class="schedule-container">
        <a-input
          id="createSchedule"
          placeholder="Schedule"
          v-decorator="[
            'schedule',
            {
              rules: [
                { required: true, message: 'Please input your schedule!' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item class="time-picker-container">
        <a-time-picker
          placeholder="Duration"
          class="time-picker"
          valueFormat="HH:mm:ss"
          v-decorator="[
            'duration',
            {
              rules: [
                { required: true, message: 'Please select your Duration!' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item class="time-picker-container">
        <a-date-picker
          class="time-picker"
          :disabled-date="disabledDate"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Start Time"
          v-decorator="[
            'startTime',
            {
              rules: [
                { required: true, message: 'Please select your Start Time!' },
              ],
              initialValue: moment(),
            },
          ]"
        />
      </a-form-item>
      <div class="submit-container">
        <a-button type="primary" html-type="submit" @click="handleSubmit"
          >Submit</a-button
        >
      </div>
    </a-form>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Plane from "../components/Plane";
import TimePeriod from "../components/TimePeriod";
import { convertTimeTOSeconds } from "../utils/time";

export default {
  name: "AddSchedule",
  components: {
    Plane,
    TimePeriod,
  },
  data() {
    return {
      plane: "",
      timePeriod: "",
    };
  },
  beforeCreate() {
    this.addScheduleForm = this.$form.createForm(this, {
      name: "schedule form",
    });
  },
  methods: {
    moment,
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().subtract(1, "day").endOf("day");
    },
    planeChange(planeId) {
      this.plane = planeId;
    },
    timePeriodChange(timePeriod) {
      this.timePeriod = timePeriod;
    },
    handleSubmit() {
      this.addScheduleForm.validateFieldsAndScroll((err, values) => {
        let duration = convertTimeTOSeconds(values.duration);
        if (!err) {
          let data = {
            duration,
            schedule: values.schedule,
            startTime: values.startTime.format("x"),
            timePeriod: this.timePeriod,
            plane: this.plane,
          };
          axios({
            method: "post",
            url: "/api/schedule",
            data: data,
          })
            .then(() => {
              this.$message.success("Successfully!");
              this.addScheduleForm.resetFields();
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
.ant-time-picker-input[disabled] {
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.75);
}

.time-picker {
  width: 100%;
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
.submit-container {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="add-schedule-container">
    <Plan @change="planChange" @initValue="(v) => (this.plan = v)"></Plan>
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
          :minuteStep="10"
          :secondStep="60"
          :default-open-value="moment('00:00:00', 'HH:mm:ss')"
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
              initialValue: moment().add(1, 'days').startOf('day'),
            },
          ]"
        />
      </a-form-item>
      <div class="rate-wrapper">
         <div class="rate-container">
        <label>Importance:</label>
        <a-rate :value="importance" @change="handleImportanceRateChange" :allowClear="false" />
      </div>
      <div class="rate-container">
        <label>Emergency:</label>
        <a-rate :value="emergency" @change="handleeMergencyRateChange" :allowClear="false" />
      </div>
      </div>
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
import Plan from "../components/Plan";
import TimePeriod from "../components/TimePeriod";
import { convertTimeTOSeconds } from "../utils/time";

export default {
  name: "AddSchedule",
  components: {
    Plan,
    TimePeriod,
  },
  data() {
    return {
      plan: "",
      timePeriod: "",
      importance: 1,
      emergency: 1,
    };
  },
  beforeCreate() {
    this.addScheduleForm = this.$form.createForm(this, {
      name: "schedule form",
    });
  },
  methods: {
    moment,
    handleeMergencyRateChange(v){
      this.emergency = v
    },
    handleImportanceRateChange(v){
      this.importance = v
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().subtract(1, "day").endOf("day");
    },
    planChange(planId) {
      this.plan = planId;
    },
    timePeriodChange(timePeriod) {
      this.timePeriod = timePeriod;
    },
    handleSubmit() {
      const _this = this;
      this.addScheduleForm.validateFieldsAndScroll((err, values) => {
        let duration = convertTimeTOSeconds(values.duration);
        if (!err) {
          let data = {
            duration,
            schedule: values.schedule,
            startTime: values.startTime.format("x"),
            timePeriod: this.timePeriod,
            plan: this.plan,
            importance: this.importance,
            emergency: this.emergency,
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
              _this.$message.error(error.response.data.errors[0].msg);
            });
        }
      });
    },
  },
};
</script>

<style>
.rate-wrapper {
  margin-bottom: 20px;
}
.rate-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}
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
  width: 230px;
  margin: auto;
}
.submit-container {
  display: flex;
  justify-content: center;
}
</style>

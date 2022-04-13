<template>
  <div>
    <div class="last-next-container">
      <a-button
        type="primary"
        shape="circle"
        icon="left"
        size="small"
        @click="handleLastDay"
      />
      <div class="date-text">
        <div>{{ currentDateText }}</div>
      </div>
      <a-button
        type="primary"
        shape="circle"
        icon="right"
        size="small"
        @click="handleNextDay"
        :disabled="currentDate && currentDate.format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')"
      />
    </div>
    <div class="count-container">
      <div
        class="count-item"
        :key="taskItem.task"
        v-for="taskItem in taskTimes"
      >
        <div>{{ taskItem.task }}</div>
        <div>{{ taskItem.count }} Times</div>
      </div>
    </div>
    <div class="calendar-container">
      <a-calendar :fullscreen="true" :header-render="headerRender" :value="currentDate">
        <div
          class="task-date-label"
          slot="dateCellRender"
          slot-scope="value"
          :style="{ 'background-color': calculateTaskColor(value) }"
          v-if="calculateTaskDisplay(value)"
        />
      </a-calendar>
    </div>
    <DiaryList :startTime="startTime" :endTime="endTime"/>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { convertSecondsTOTime } from "../utils/time";
import _ from "lodash";
import DiaryList from "./diaryList.vue"

export default {
  name: "taskCalenderStatistics",
  components: {
    DiaryList
  },
  data() {
    return {
      startTime: null,
      endTime: null,
      taskCalendarListByMonth: [],
      tasks: [],
      currentDate: moment(),
      period: "month"
    };
  },
  computed: {
    taskTimes: function () {
      let taskObject = {};
    
        this.tasks.forEach((v, i) => {
          taskObject[v._id] = {
            task: v.task,
            count: 0,
          };
        });
        this.taskCalendarListByMonth.forEach((v, i) => {
          v.tasks.forEach((taskId) => {
            if (_.includes(Object.keys(taskObject), taskId)) {
              taskObject[taskId].count += 1;
            }
          });
        });
      
      return taskObject;
    },
    currentDateText: function () {
      let isTimeValiable = this.startTime && this.endTime;
      if (isTimeValiable) {
        return `${moment(Number(this.startTime)).format(
          "YYYY-MM-DD"
        )} to ${moment(Number(this.endTime)).format("YYYY-MM-DD")}`;
      }
      return "";
    },
  },
  mounted: function () {
    this.loadTaskCalendarData();
    axios({
      method: "get",
      url: "/api/task/",
    }).then((res) => {
      this.tasks = res.data.data;
    });
  },
  methods: {
    moment,
    handleLastDay() {
      this.currentDate.subtract(1, this.period);
      // this.currentDate = this.currentDate.subtract(1, this.period);
      this.loadTaskCalendarData();
    },
    handleNextDay() {
      this.currentDate = this.currentDate.add(1, this.period);
      this.loadTaskCalendarData();
    },
    setStartAndEndTime() {
      let newCurrentDate = this.currentDate.format("YYYY-MM-DD")
      this.startTime = moment(newCurrentDate).startOf("month")
      this.endTime = moment(newCurrentDate).endOf("month")
    },
    loadTaskCalendarData() {
      this.setStartAndEndTime();
      axios({
        method: "get",
        url: `/api/taskcalendar/byDateRange/${this.startTime.format("x")}/${this.endTime.format("x")}`,
      }).then((res) => {
        this.taskCalendarListByMonth = res.data.data;
      });
    },
    checkTaskValiable() {
      return this.tasks.length && this.taskCalendarListByMonth.length;
    },
    calculateTaskColor(date) {
      if (this.checkTaskValiable()) {
        let taskList = _.find(this.taskCalendarListByMonth, (v) => {
          return (
            moment(v.date).format("YYYY-MM-DD") == date.format("YYYY-MM-DD")
          );
        });
        let planTaskLength = this.tasks.length;
        let taskListLength = taskList ? taskList.tasks.length : 0;
        let opacity = planTaskLength
          ? taskListLength / planTaskLength + 0.1
          : 0.1;
        return `rgb(90, 20, 140, ${opacity})`;
      }
      return `rgba(90, 20, 140, 0.1)`
    },
    calculateTaskDisplay(date) {
      return date.isBefore(this.endTime) && date.isAfter(this.startTime);
    },
    headerRender() {
      return null;
    },
  },
};
</script>

<style>
.ant-fullcalendar-fullscreen .ant-fullcalendar-date:hover { 
   background: #fff;
}
.ant-fullcalendar-fullscreen .ant-fullcalendar-selected-day .ant-fullcalendar-date {
    background: #fff;
}
.ant-fullcalendar-selected-day .ant-fullcalendar-date {
  background-color: #fff;
}
.last-next-container {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.ant-fullcalendar-fullscreen .ant-fullcalendar-column-header {
  padding-right: 18px;
}
.ant-fullcalendar-fullscreen .ant-fullcalendar-value {
  text-align: center;
}
.ant-fullcalendar .ant-fullcalendar-content {
  height: auto;
}
.ant-fullcalendar-fullscreen .ant-fullcalendar-date {
  border-top: 0;
  height: auto;
}
.task-date-label {
  width: 100%;
  height: 20px;
  border-radius: 3px;
}
.calendar-container {
  padding: 10px;
}
.count-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom: 1px solid rgb(90, 20, 140, 0.8);
  margin: 5px 10px;
}
.count-container {
  margin-bottom: 30px;
}
</style>

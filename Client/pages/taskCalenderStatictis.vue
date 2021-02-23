<template>
  <div>
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
      <a-calendar :fullscreen="true" :header-render="headerRender">
        <div
          class="task-date-label"
          slot="dateCellRender"
          slot-scope="value"
          :style="{ 'background-color': calculateTaskColor(value) }"
          v-if="calculateTaskDisplay(value)"
        ></div>
      </a-calendar>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { convertSecondsTOTime } from "../utils/time";
import _ from "lodash";

export default {
  name: "taskCalenderStatictis",
  data() {
    return {
      startTime: moment().startOf("month"),
      endTime: moment().endOf("month"),
      taskCalendarListByMonth: [],
      tasks: [],
    };
  },
  computed: {
    taskTimes: function () {
      let taskObject = {};
      if (this.checkTaskValiable()) {
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
      }
      return taskObject;
    },
  },
  mounted: function () {
    axios({
      method: "get",
      url: `/api/taskcalendar/byDateRange/${this.startTime.format(
        "x"
      )}/${this.endTime.format("x")}`,
    }).then((res) => {
      this.taskCalendarListByMonth = res.data.data;
    });
    axios({
      method: "get",
      url: "/api/task/",
    }).then((res) => {
      this.tasks = res.data.data;
    });
  },
  methods: {
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
        let planeTaskLength = this.tasks.length;
        let taskListLength = taskList ? taskList.tasks.length : 0;
        let opacity = planeTaskLength ? (taskListLength / planeTaskLength) + 0.2 : 0.2
        console.log((taskListLength / planeTaskLength))

        return `rgba(100, 149, 237, ${opacity})`
      }
    },
    calculateTaskDisplay(date) {
      return date.isBefore(this.endTime) && date.isAfter(this.startTime)
    },
    headerRender() {
      return null;
    },
  },
};
</script>

<style>
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
  /* border: 1px  solid; */
}
.calendar-container {
  padding: 10px;
}
.count-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom: 1px solid #ccc;
  margin: 5px 10px;
}
.count-container {
  height: 300px;
}
</style>

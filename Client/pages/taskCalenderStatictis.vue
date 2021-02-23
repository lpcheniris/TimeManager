<template>
  <div>
      <div class="count-container">
       <div class="count-item" :key="taskItem.task" v-for="taskItem in taskTimes">
           <div>{{ taskItem.task }}</div>
           <div>{{ taskItem.count}} Times</div>
       </div>
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
      startTime: moment().subtract(100, "day"),
      endTime: moment(),
      taskCalendarListByMonth: [],
      tasks: [],
    };
  },
  computed: {
    taskTimes: function () {
      let taskObject = {};
      if (this.tasks.length && this.taskCalendarListByMonth.length) {
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
  methods: {},
};
</script>

<style>
.count-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    border-bottom: 1px solid #ccc;
    margin: 5px 10px;
}
</style>

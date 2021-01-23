<template>
  <div class="taskcalendar-container">
    <div class="today">{{ today }}</div>
    <a-checkbox-group class="task" v-model="taskisDone" @change="onChange">
      <a-row>
        <a-col :key="task._id" v-for="task in tasks">
          <a-checkbox :value="task._id">
            {{ task.task }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>

    <div class="button-container">
      <a-button
        :disabled="!isModify"
        type="primary"
        html-type="submit"
        @click="handleSubmit"
        >Submit</a-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { convertTimeTOSeconds } from "../utils/time";
import addSchedule from "./addSchedule.vue";

export default {
  components: { addSchedule },
  name: "TaskCalendar",
  data() {
    return {
      today: moment().format("YYYY-MM-DD"),
      tasks: [],
      taskisDone: [],
      isModify: false,
    };
  },
  mounted: function () {
    axios({
      method: "get",
      url: "/api/task/",
    }).then((res) => {
      this.tasks = res.data.data;
    });
    axios({
      method: "get",
      url: "/api/taskcalendar/byDate/" + moment(this.today).format("x"),
    }).then((res) => {
      if (res.data.data) {
        this.taskisDone = res.data.data.tasks;
      }
    });
  },

  methods: {
    onChange(checkedValues) {
      this.taskisDone = checkedValues;
      this.isModify = true;
    },
    handleSubmit() {
      axios({
        method: "post",
        url: "/api/taskcalendar",
        data: {
          tasks: this.taskisDone,
          date: moment(this.today).format("x"),
        },
      })
        .then(() => {
          this.$message.success("Successfully!");
          this.addScheduleForm.resetFields();
        })
        .catch(function (error) {
          this.$message.error("I'm sorry!");
        });
    },
  },
};
</script>

<style>
.button-container {
  padding: 10px;
  text-align: center;
}
.task .ant-col {
  padding-bottom: 10px;
}
.task {
  padding: 20px;
  min-height: 300px;
}
.today {
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  color: #655759;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  color: #655759;
  padding: 20px 0px 10px 20px;
  border-bottom: 1px solid;
}
.taskcalendar-container {
  display: flex;
  flex-direction: column;
}
</style>

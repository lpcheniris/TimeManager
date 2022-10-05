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
    <div class="mood-curve">
      <h3>Mood Curve</h3>

      <a-slider
        :value="moodCurve"
        :min="1"
        :max="10"
        :step="1"
        @change="onMoodCurveChange"
      />

    </div>
    <div class="button-container">
      <a-button
        :disabled="!isModify"
        type="primary"
        html-type="submit"
        @click="handleTaskSubmit"
        >Submit</a-button
      >
    </div>

    <div class="diary-container">
      <a-textarea
        :auto-size="{ minRows: 5, maxRows: 10 }"
        v-model="diary"
        @change="onDiaryChange"
      >
      </a-textarea>
      <div class="button-container">
        <a-button
          :disabled="!isDiaryModify"
          type="primary"
          html-type="submit"
          @click="handleDiarySubmit"
          >Submit</a-button
        >
      </div>
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
      diary: "",
      isDiaryModify: false,
      moodCurve: 1,
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
        this.moodCurve = res.data.data.moodCurve;
      }
    });
    axios({
      method: "get",
      url: "/api/diary/byDate/" + moment(this.today).format("x"),
    }).then((res) => {
      let data = res.data.data;
      if (data) {
        this.diary = data.diary;
      }
    });
  },

  methods: {
    onChange(checkedValues) {
      this.taskisDone = checkedValues;
      this.isModify = true;
    },
    onDiaryChange(e) {
      this.diary = e.target.value;
      this.isDiaryModify = true;
    },
    onMoodCurveChange(value) {
      this.moodCurve = value;
      this.isModify = true;
    },
    handleTaskSubmit() {
      axios({
        method: "post",
        url: "/api/taskcalendar",
        data: {
          tasks: this.taskisDone,
          date: moment(this.today).format("x"),
          moodCurve: this.moodCurve
        },
      })
        .then(() => {
          this.$message.success("Successfully!");
          this.isModify = false;
        })
        .catch(function (error) {
          this.$message.error("I'm sorry!");
        });
    },
    handleDiarySubmit() {
      axios({
        method: "post",
        url: "/api/diary",
        data: {
          diary: this.diary,
          date: moment(this.today).format("x"),
        },
      })
        .then(() => {
          this.$message.success("Successfully!");
          this.isDiaryModify = false;
        })
        .catch(function (error) {
          this.$message.error("I'm sorry!");
        });
    },
  },
};
</script>

<style>
.mood-curve {
  padding: 20px;
}
.diary-container {
  margin: 30px 10px 20px;
}

.button-container {
  padding: 10px;
  text-align: center;
}
.task .ant-col {
  padding-bottom: 10px;
}
.task {
  padding: 20px;
  min-height: 200px;
}
.today {
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  color: rgb(90, 20, 140);
  padding: 20px 0px 10px 20px;
  border-bottom: 1px solid;
}
.taskcalendar-container {
  display: flex;
  flex-direction: column;
}
</style>

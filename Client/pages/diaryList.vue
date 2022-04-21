<template>
  <div>
    <div :key="diaryItem._id" v-for="diaryItem in diarys">
      <div class="diary-item-container">
        <div class="diary-time">
          {{ moment(diaryItem.date).format("MM-DD") }}
        </div>
        <div class="diary-content">
          <pre>{{ diaryItem.diary }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "DiaryList",
  props: ["startTime", "endTime"],
  data() {
    return {
      diarys: [],
      diaryStartTime: this.startTime,
      diaryEndTime: this.endTime,
    };
  },
  mounted: function () {
    this.loadDiarys();
  },
  watch: {
    startTime(newVal) {
      this.diaryStartTime = newVal;
      this.loadDiarys();
    },
    endTime(newVal) {
      this.diaryEndTime = newVal;
      this.loadDiarys();
    },
  },
  methods: {
    moment,
    loadDiarys() {
      if (this.diaryStartTime && this.diaryEndTime) {
        axios({
          method: "get",
          url:
            "/api/diary/byDateRange/" +
            this.diaryStartTime +
            "/" +
            this.diaryEndTime,
        }).then((res) => {
          this.diarys = res.data.data;
        });
      }
    },
  },
};
</script>

<style>
.diary-content pre {
  word-wrap: break-word;
  white-space: break-spaces;
}
.diary-content {
  padding: 10px;
}
.diary-time {
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid rgb(90, 20, 140, 0.8);
}
.diary-item-container {
  border: solid 2px;
  margin: 20px;
  border-radius: 5px;
  border: 1px solid rgb(90, 20, 140, 0.8);
}
</style>

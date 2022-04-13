<template>
  <div>
    <div :key="diaryItem._id" v-for="diaryItem in diarys">
      <div class="diary-item-container">
        {{ moment(diaryItem.date).format("MM-DD") }}
        {{ diaryItem.diary }}
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
</style>

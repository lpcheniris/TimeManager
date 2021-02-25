<template>
  <div class="plan-container">
    <div
      class="plan-item"
      :key="plan._id"
      v-for="plan in plans"
      v-on:click="() => changePlan(plan._id)"
    >
      <div
        class="plan-color-container"
        :style="{'border-color': activePlan == plan._id ? plan.color : '#fff' }"
      >
        <div class="plan-color" :style="{background: plan.color}"></div>
      </div>
      <p :style="{'color': activePlan == plan._id ? plan.color : '#777' }">{{plan.name}}</p>
    </div>
  </div>
</template>

<script>
import moment, { duration, months } from "moment";
import timer from "moment-timer";
import numeral from "numeral";
import axios from "axios";

export default {
  name: "Plan",
  data() {
    return {
      plans: [],
      activePlan: "",
    };
  },
  props: ["defaultPlan"],
  mounted: function () {
    axios({
      method: "get",
      url: "/api/plan/",
    }).then((res) => {
      this.plans = res.data.data;
      this.activePlan = this.defaultPlan || this.plans[0]._id;
      this.$emit("initValue", this.plans[0]._id )
    });
  },
  methods: {
    changePlan(palneId) {
      this.activePlan = palneId;
      this.$emit("change", palneId)
    },
  },
};
</script>

<style>
.plan-item div {
  border-radius: 3px;
}

.plan-item > p {
  text-align: center;
}

.plan-color-container {
  width: 58px;
  height: 58px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 2px;
}

.plan-color {
  width: 50px;
  height: 50px;
}

.plan-item {
  flex: 1;
  margin: 10px 0;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
}

.plan-container {
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  justify-content: space-around;
  height: 135px;
}
</style>

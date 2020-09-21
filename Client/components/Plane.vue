<template>
  <div class="plane-container">
    <div
      class="plane-item"
      :key="plane._id"
      v-for="plane in planes"
      v-on:click="() => changePlane(plane._id)"
    >
      <div
        class="plane-color-container"
        :style="{'border-color': activePlane == plane._id ? plane.color : '#fff' }"
      >
        <div class="plane-color" :style="{background: plane.color}"></div>
      </div>
      <p :style="{'color': activePlane == plane._id ? plane.color : '#777' }">{{plane.name}}</p>
    </div>
  </div>
</template>

<script>
import moment, { duration, months } from "moment";
import timer from "moment-timer";
import numeral from "numeral";
import axios from "axios";

export default {
  name: "Plane",
  data() {
    return {
      planes: [],
      activePlane: "",
    };
  },
  props: ["defaultPlane"],
  mounted: function () {
    axios({
      method: "get",
      url: "/api/plane/",
    }).then((res) => {
      this.planes = res.data.data;
      this.activePlane = this.defaultPlane || this.planes[0]._id;
      this.$emit("initValue", this.planes[0]._id )
    });
  },
  methods: {
    changePlane(palneId) {
      this.activePlane = palneId;
      this.$emit("change", palneId)
    },
  },
};
</script>

<style>
.plane-item div {
  border-radius: 3px;
}

.plane-item > p {
  text-align: center;
}

.plane-color-container {
  width: 58px;
  height: 58px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 2px;
}

.plane-color {
  width: 50px;
  height: 50px;
}

.plane-item {
  flex: 1;
  margin: 10px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
}

.plane-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  height: 135px;
}
</style>

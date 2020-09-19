<template>
  <div class="add-schedule-container">
   <Plane @change="planeChange"></Plane>
   <TimePeriod @change="timePeriodChange"></TimePeriod>
  </div>
</template>

<script>
import Plane from "../components/Plane"
import TimePeriod from "../components/TimePeriod"
export default {
  name: "AddSchedule",
  components: {
    Plane,
    TimePeriod
  },
  data() {
    return {
      plane: "",
      timePeriod: "",
    }
  },
  methods: {
    planeChange(planeId) {
      this.plane = planeId
    },
    timePeriodChange(timePeriod) {
      this.timePeriod = timePeriod
    }
  }

};
</script>

<style>
.add-schedule-container {
  min-height: 100vh;
}

</style>

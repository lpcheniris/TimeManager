<template>
  <div>
    <Timer></Timer>
    <TimerList></TimerList>
  </div>
</template>

<script>
import Timer from "./timer";
import TimerList from "./timerList";

export default {
  components: {
    Timer,
    TimerList,
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.links {
  padding-top: 15px;
}
</style>

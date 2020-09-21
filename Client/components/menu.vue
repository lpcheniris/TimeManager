<template>
    <section class="menu-container">
      <nuxt-link to="/timer" class="menu-button">Add Timer</nuxt-link>
      <div class="add-schedule-button-container">
        <nuxt-link to="/addSchedule" class="add-schedule-button">+</nuxt-link>
        <div class="add-schedule-button-bg"></div>
      </div>
      <nuxt-link to="scheduleList" class="menu-button">Schdule List</nuxt-link>
    </section>
</template>

<script>

export default {
  name: "Menu",
};
</script>

<style>
.add-schedule-button {
  width: 70px;
  height: 70px;
  font-size: 38px;
  background: #6495ed;
  border-radius: 35px;
  text-align: center;
  color: #fff;
  display: inline-block;
  border: #ffffff solid 5px;
  position: relative;
  z-index: 1;
}
.add-schedule-button-bg {
  background: cornflowerblue;
  height: 46px;
  width: 74px;
  position: absolute;
  bottom: 0;
  left: -2px;
}
.add-schedule-button-container {
  height: 80px;
  position: relative;
}

.menu-container {
  height: 46px;
  text-align: center;
  display: flex;
  align-items: flex-end;
  background-color:rgba(0,0,0,0);
}
.menu-button {
  flex: 1;
  padding: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background: cornflowerblue;
  height: 46px;
}
</style>

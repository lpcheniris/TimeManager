<template>
  <section class="menu-container">
    <nuxt-link to="/taskcalendar" class="menu-button">
      <div class="menu-item">
        <a-icon type="unordered-list" class="menu-icon" />
        <label>Task</label>
      </div>
    </nuxt-link>
    <nuxt-link to="/taskCalenderStatistics" class="menu-button">
      <div class="menu-item">
        <a-icon type="calendar" class="menu-icon" />
        <label>Calendar</label>
      </div>
    </nuxt-link>
    <div class="add-schedule-button-container">
      <nuxt-link to="/addSchedule" class="add-schedule-button">+</nuxt-link>
      <div class="add-schedule-button-bg"></div>
    </div>
    <nuxt-link to="/scheduleList" class="menu-button">
      <div class="menu-item">
        <a-icon type="snippets" class="menu-icon "/>
        <label>Schdules</label>
      </div>
    </nuxt-link>
    <nuxt-link to="/summarySchedule" class="menu-button">
      <div class="menu-item">
        <a-icon type="bar-chart" class="menu-icon" />
        <label>Progress</label>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style>
.menu-icon {
  font-size: 14px;
}
.add-schedule-button {
  width: 70px;
  height: 70px;
  font-size: 38px;
  background: rgb(90, 20, 140);
  border-radius: 35px;
  text-align: center;
  color: #fff;
  display: inline-block;
  border: #ffffff solid 5px;
  position: relative;
  z-index: 1;
}
.add-schedule-button-bg {
  background: rgb(90, 20, 140);
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
  background: rgb(90, 20, 140);
}

.menu-item {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.menu-button ::selection {
  color: #fff;
}

.menu-button {
  flex: 1;
  padding: 8px 5px;
  color: #fff;
  background: rgb(90, 20, 140);
  height: 46px;
}
</style>

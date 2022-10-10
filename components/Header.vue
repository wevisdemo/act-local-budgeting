<template>
  <div>
    <div class="menu d-flex justify-content-between align-items-center">
      <div>
        <img :src="logo" alt="" width="70" />
      </div>
      <div>
        <NuxtLink class="box text-3" to="/">หน้าหลัก</NuxtLink>
        <NuxtLink class="box text-3" to="/dashboard">สำรวจข้อมูล</NuxtLink>
        <NuxtLink class="box text-3" to="/story">งบ อบจ. สำคัญอย่างไร</NuxtLink>
        <NuxtLink class="box text-3" to="/conclusion">สรุปภาพรวม</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("~/assets/images/logo.svg"),
    };
  },
};
</script>

<style lang="scss" scoped>
.menu {
  background: #000;
  color: #bfc5cb;
  padding: 0 10px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  .box {
    border: 1px solid #3a3a42;
    padding: 5px;
    color: #bfc5cb;
    margin: 0 5px;
  }
}
</style>
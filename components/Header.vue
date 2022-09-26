<template>
  <div>
    <div class="menu d-flex justify-content-between align-items-center">
      <div>
        <img :src="logo" alt="" width="70" />
      </div>
      <div>
        <a href="/#" class="box text-3">หน้าหลัก</a>
        <a href="/#" class="box text-3">สำรวจข้อมูล</a>
        <a href="/story" class="box text-3">งบ อบจ. สำคัญอย่างไร</a>
        <a href="/conclusion" class="box text-3">สรุปภาพรวม</a>
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
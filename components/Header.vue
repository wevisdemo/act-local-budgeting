<template>
  <div>
    <div
      class="menu d-flex justify-content-between align-items-center"
      id="menu-wrapper"
    >
      <div>
        <a href="http://actai.co" target="_blank" rel="noopener noreferrer">
          <img :src="logo" alt="" width="70" class="logo"
        /></a>
      </div>
      <div class="text-right text-sm-left menu-list">
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
      lastScrollTop: 0,
    };
  },
  created() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    if (process.client) window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > this.lastScrollTop) {
        document.getElementById("menu-wrapper").style.top = "-100px";
      } else {
        document.getElementById("menu-wrapper").style.top = "0";
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
    },
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
  transition: 0.5s;
  .box {
    border: 1px solid #3a3a42;
    padding: 5px;
    color: #bfc5cb;
    margin: 0 5px;
    display: inline-block;

    @media #{$mq-mini-mobile} {
      margin-bottom: 2px;
      font-size: 11px;
    }
  }
}

.menu-list {
  @media #{$mq-mini-mobile} {
    width: 250px;
  }
}
</style>
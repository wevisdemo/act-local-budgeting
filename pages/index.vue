<template>
  <div>
    <Header />
    <Intro />
  </div>
</template>

<script>
import Intro from "../components/Intro.vue";
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
  },
  components: { Intro },
};
</script>

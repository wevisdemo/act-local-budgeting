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
  head() {
    return {
      meta: [
        {
          hid: "og-image",
          property: "og:image",
          content:
            "https://d365h3igfpfyap.cloudfront.net/og-image/og_image.jpg",
        },
        {
          hid: "twitter:image",
          name: "twitter:image:src",
          content:
            "https://d365h3igfpfyap.cloudfront.net/og-image/og_image.jpg",
        },
      ],
    };
  },
  components: { Intro },
};
</script>

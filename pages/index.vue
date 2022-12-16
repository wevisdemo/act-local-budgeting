<template>
  <div>
    <Header />
    <Intro />
    <WvCookieConsent
      policyUrl="https://docs.google.com/document/d/1QugAyqUlUWW2lF4mf6aun_oV6F17P_cwuJEDekdDH2w/edit"
      :cookieOptions="cookieOptions"
      :onAccept="onCookieAccept"
    />
  </div>
</template>

<script>
import Intro from "../components/Intro.vue";
import WvCookieConsent from "@wevisdemo/ui/vue2/cookie-consent";

export default {
  data() {
    return {
      cookieOptions: ["Performance"],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
  },
  methods: {
    onCookieAccept(option) {
      if (option["Performance"]) {
        (function (c, l, a, r, i, t, y) {
          c[a] =
            c[a] ||
            function () {
              (c[a].q = c[a].q || []).push(arguments);
            };
          t = l.createElement(r);
          t.async = 1;
          t.src = "https://www.clarity.ms/tag/" + i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "ez2v661rxi");
      }
    },
  },
  components: { Intro, WvCookieConsent },
};
</script>

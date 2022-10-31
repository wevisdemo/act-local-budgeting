const BASE_URL = 'http://localbudgeting.actai.co/'
const array = [];
for (var i = 0; i < 51; i++) {
  for (var j = 0; j < 51; j++) {
    array.push("/ogimage/" + i + "-" + j);
  }
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ผ่างบเมือง ให้งบประมาณเมือง…เป็นเรื่องตรวจสอบได้',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: 'ผ่างบเมือง ให้งบประมาณเมือง…เป็นเรื่องตรวจสอบได้' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ผ่างบเมือง ให้งบประมาณเมือง…เป็นเรื่องตรวจสอบได้ '
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'ร่วมกันตรวจสอบงบประมาณรายจ่ายของ อบจ. บ้านเรา และทำให้งบประมาณเมืองเป็นเรื่องที่ทุกคนตรวจสอบได้'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: "og-image",
        property: "og:image",
        content:
          BASE_URL + 'og_image.png'
      },
      {
        hid: "twitter:image",
        name: "twitter:image:src",
        content:
          BASE_URL + 'og_image.png'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'ผ่างบเมือง ให้งบประมาณเมือง…เป็นเรื่องตรวจสอบได้ '
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'ร่วมกันตรวจสอบงบประมาณรายจ่ายของ อบจ. บ้านเรา และทำให้งบประมาณเมืองเป็นเรื่องที่ทุกคนตรวจสอบได้'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },

      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: BASE_URL
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'http://localbudgeting.actai.co/favicon.png' }
    ]
  },

  // generate: {
  //   dir: 'dist/act-local-budgeting',
  // },

  router: {
    base: '/act-local-budgeting/',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.scss',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './plugins/vue-slick-carousel.js' },
    { src: './plugins/vue-dragscroll.js', mode: 'client' },
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    icons: {
      solid: ['faStar', 'faChevronDown', 'faArrowDown', 'faArrowRight']
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],
  styleResources: {
    scss: ['~/assets/styles/variables.scss'],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}

import Vue from 'vue'
import VueSlickCarousel from 'vue-slick-carousel'
import LottieAnimation from 'lottie-web-vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
 
Vue.use(VueMoment, {
    moment,
})
Vue.use(LottieAnimation);
Vue.component('VueSlickCarousel', VueSlickCarousel)
<template>
  <div>
    <img :src="sector_tua_pai" width="100%" alt="" v-if="title == 'บริหารงานทั่วไป'" />
    <img :src="sector_kwam_sa_ngop" width="100%" alt="" v-else-if="title == 'การรักษาความสงบภายใน'" />
    <img :src="sector_kan_suk_sa" width="100%" alt="" v-else-if="title == 'การศึกษา'" />
    <img :src="sector_satharanasook" width="100%" alt="" v-else-if="title == 'สาธารณสุข'" />
    <img :src="sector_sang_khom_song_khor" width="100%" alt="" v-else-if="title == 'สังคมสงเคราะห์'" />
    <img :src="sector_kaha_chumchon" width="100%" alt="" v-else-if="title == 'เคหะและชุมชน'" />
    <img :src="sector_kwam_khem_khang" width="100%" alt="" v-else-if="title == 'สร้างความเข้มแข็งของชุมชน'" />
    <img :src="sector_sassana_wattanatham" width="100%" alt="" v-else-if="title == 'การศาสนา วัฒนธรรม และนันทนาการ'" />
    <img :src="sector_yotha" width="100%" alt="" v-else-if="title == 'อุตสาหกรรมและการโยธา'" />
    <img :src="sector_kam_kaset" width="100%" alt="" v-else-if="title == 'การเกษตร'" />
    <img :src="sector_kan_phanich" width="100%" alt="" v-else-if="title == 'การพาณิชย์'" />
    <img :src="sector_klang" width="100%" alt="" v-else-if="title == 'งบกลาง'" />
  </div>
</template>


<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
        sector_kaha_chumchon: require("~/assets/images/sector/sector_kaha_chumchon.svg"),
        sector_kam_kaset: require("~/assets/images/sector/sector_kam_kaset.svg"),
        sector_kan_phanich: require("~/assets/images/sector/sector_kan_phanich.svg"),
        sector_kan_suk_sa: require("~/assets/images/sector/sector_kan_suk_sa.svg"),
        sector_klang: require("~/assets/images/sector/sector_klang.svg"),
        sector_kwam_khem_khang: require("~/assets/images/sector/sector_kwam_khem_khang.svg"),
        sector_kwam_sa_ngop: require("~/assets/images/sector/sector_kwam_sa_ngop.svg"),
        sector_sang_khom_song_khor: require("~/assets/images/sector/sector_sang_khom_song_khor.svg"),
        sector_sassana_wattanatham: require("~/assets/images/sector/sector_sassana_wattanatham.svg"),
        sector_satharanasook: require("~/assets/images/sector/sector_satharanasook.svg"),
        sector_tua_pai: require("~/assets/images/sector/sector_tua_pai.svg"),
        sector_yotha: require("~/assets/images/sector/sector_yotha.svg"),
    };
  },
};
</script>
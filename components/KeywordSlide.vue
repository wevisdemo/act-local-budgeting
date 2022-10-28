<template>
  <div>
    <VueSlickCarousel
      v-bind="slickOptionsKw"
      class="work-card-wrapper-2"
      v-if="data.length > 0"
    >
      <div class="px-1" v-for="(item, i) in data" :key="'task-list-' + i">
        <div class="task-box">
          <b-row no-gutters>
            <b-col cols="12" class="">
              <p class="text-3 mb-0 font-weight-bold">
                {{ item.task }}
              </p></b-col
            >
          </b-row>
          <p class="text-1 my-1">
            <formatNumber :data="item.total" />
          </p>
          <p class="text-4 mb-1">
            {{ ((item.total / total) * 100).toFixed(2) }}% ของค่าใช้จ่ายทั้งหมด
          </p>

          <div style="background: #ccc">
            <div
              class="bg-black"
              :style="{
                width: ((item.total / total) * 100).toFixed(1) + '%',
                height: '10px',
              }"
            ></div>
          </div>
          <b-row class="mt-2">
              <b-col cols="6">
                <div class="border-grey">                <p class="text-4 font-weight-bold mb-1">แผนงาน :</p>

                <img
                  :src="sector_mini_1"
                  width="25"
                  alt=""
                  v-if="item.plan == 'บริหารงานทั่วไป'"
                />
                <img
                  :src="sector_mini_2"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'การรักษาความสงบภายใน'"
                />
                <img
                  :src="sector_mini_3"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'การศึกษา'"
                />
                <img
                  :src="sector_mini_4"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'สาธารณสุข'"
                />
                <img
                  :src="sector_mini_5"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'สังคมสงเคราะห์'"
                />
                <img
                  :src="sector_mini_6"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'เคหะและชุมชน'"
                />
                <img
                  :src="sector_mini_7"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'สร้างความเข้มแข็งของชุมชน'"
                />
                <img
                  :src="sector_mini_8"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'การศาสนา วัฒนธรรม และนันทนาการ'"
                />
                <img
                  :src="sector_mini_9"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'อุตสาหกรรมและการโยธา'"
                />
                <img
                  :src="sector_mini_10"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'การเกษตร'"
                />
                <img
                  :src="sector_mini_11"
                  width="25"
                  alt=""
                  v-else-if="item.plan == 'การพาณิชย์'"
                />
                <img :src="sector_mini_12" width="25" alt="" v-else />
                <p class="text-4 mb-1">{{ item.plan }}</p>
                <p class="text-4 mb-1 grey">{{ item.area }}</p></div>
              </b-col>
            <b-col cols="6" class="pl-0">
              <p class="text-4 font-weight-bold mb-1">ประเภทรายจ่าย :</p>
              <img
                :src="klang_mini_1"
                width="25"
                alt=""
                v-if="item.type == 'งบรายจ่ายอื่น'"
              />
              <img
                :src="klang_mini_2"
                width="25"
                alt=""
                v-else-if="item.type == 'งบเงินอุดหนุน'"
              />
              <img
                :src="klang_mini_3"
                width="25"
                alt=""
                v-else-if="item.type == 'งบลงทุน'"
              />
              <img
                :src="klang_mini_4"
                width="25"
                alt=""
                v-else-if="item.type == 'งบดำเนินงาน'"
              />
              <img
                :src="klang_mini_5"
                width="25"
                alt=""
                v-else-if="item.type == 'งบบุคลากร'"
              />
              <img :src="klang_mini_6" width="25" alt="" v-else />
              <p class="text-4 mb-1">{{ item.type }}</p>
            </b-col>
          </b-row>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    total: Number,
  },
  data() {
    return {
      sector_mini_1: require("~/assets/images/mini_icon/sector_mini_1.svg"),
      sector_mini_2: require("~/assets/images/mini_icon/sector_mini_2.svg"),
      sector_mini_3: require("~/assets/images/mini_icon/sector_mini_3.svg"),
      sector_mini_4: require("~/assets/images/mini_icon/sector_mini_4.svg"),
      sector_mini_5: require("~/assets/images/mini_icon/sector_mini_5.svg"),
      sector_mini_6: require("~/assets/images/mini_icon/sector_mini_6.svg"),
      sector_mini_7: require("~/assets/images/mini_icon/sector_mini_7.svg"),
      sector_mini_8: require("~/assets/images/mini_icon/sector_mini_8.svg"),
      sector_mini_9: require("~/assets/images/mini_icon/sector_mini_9.svg"),
      sector_mini_10: require("~/assets/images/mini_icon/sector_mini_10.svg"),
      sector_mini_11: require("~/assets/images/mini_icon/sector_mini_11.svg"),
      sector_mini_12: require("~/assets/images/mini_icon/sector_mini_12.svg"),
      klang_mini_1: require("~/assets/images/mini_icon/klang_mini_1.svg"),
      klang_mini_2: require("~/assets/images/mini_icon/klang_mini_2.svg"),
      klang_mini_3: require("~/assets/images/mini_icon/klang_mini_3.svg"),
      klang_mini_4: require("~/assets/images/mini_icon/klang_mini_4.svg"),
      klang_mini_5: require("~/assets/images/mini_icon/klang_mini_5.svg"),
      klang_mini_6: require("~/assets/images/mini_icon/klang_mini_6.svg"),
      slickOptionsKw: {
        focusOnSelect: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 500,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.task-box {
  background: #e9e9e9;
  padding: 20px;
  max-width: 280px;
  width: 100%;
  height: 285px;
}

.border-grey {
  border-right: 1px solid #bfc1c0;
  padding-right: 5px;
}
</style>
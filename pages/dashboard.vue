<template>
  <div>
    <Header />
    <div class="bg-blue-a white-a">
      <div class="p-4">
        <p class="text-1 m-0">
          ในปี
          <b-form-select
            v-model="selected"
            :options="options"
            class="year-select text-2 white-a font-weight-bold"
          ></b-form-select>
        </p>
        <h4 class="header-4 mt-2">
          องค์การบริหารส่วนจังหวัด (อบจ.) <br />
          จำนวน 76 แห่ง ของประเทศไทย
        </h4>
        <div class="d-flex justify-content-center mt-3">
          <div class="ml-5">
            <h5 class="header-5 font-weight-bold">
              จัดสรรงบประมาณผ่านข้อบัญญัติงบประมาณฯ ทั้งหมด
            </h5>
            <h1 class="header-1">56,005 ล้านบาท</h1>
          </div>
        </div>
      </div>
      <div class="position-relative">
        <p class="text-2 white-a m-0 tab-desc">
          โดยสามารถจำแนกค่าใช้จ่ายออกตาม:
        </p>
        <b-tabs align="right" lazy nav-class="main-tab pr-5" no-fade>
          <b-tab title="แผนงาน" active title-item-class="tab-header">
            <div class="text-1 bg-white py-4 black">
              <div class="d-flex justify-content-center">
                <div
                  class="d-flex mx-1"
                  v-for="(item, i) in work_type"
                  :key="i"
                >
                  <div
                    class="work-type-square mr-2"
                    :style="{ backgroundColor: item.color }"
                  ></div>
                  <p class="text-3 mr-1">{{ item.percent }}%</p>
                  <p class="text-3 font-weight-bold">{{ item.name }}</p>
                </div>
              </div>

              <p class="text-3 text-center">รายละเอียด 11 แผน</p>

              <div>
                <VueSlickCarousel
                  v-bind="slickOptions"
                  class="work-card-wrapper"
                >
                  <div class="work-card" v-for="item in 5">
                    <b-row>
                      <b-col cols="8">
                        <p class="text-1 font-weight-bold">
                          แผนงานบริหารงานทั่วไป
                        </p>
                        <h4 class="header-4">9,832 ล้านบาท (17.6%)</h4>
                        <p class="text-3 m-0">
                          งบประมาณที่เกี่ยวข้องกับการบริหารจัดการทั่วไป
                          ภายในองค์กรของ อบจ. เช่น เงินเดือนพนักงาน
                          เงินสำหรับใช้จ่ายสิ่งวัสดุอุปกรณ์ต่าง ๆ ขององค์กร
                          เงินจัดกิจกรรมเพื่อพัฒนาศักยภาพภายในองค์กร เป็นต้น
                        </p>
                      </b-col>
                      <b-col cols="4"
                        ><img width="100%" :src="work_type_1" alt=""
                      /></b-col>
                    </b-row>
                  </div>
                </VueSlickCarousel>
              </div>
            </div>
          </b-tab>
          <b-tab title="ประเภทงบ" title-item-class="tab-header">
            <div class="text-1 bg-white py-4 black">
              <div class="d-flex justify-content-center">
                <div
                  class="d-flex mx-1"
                  v-for="(item, i) in work_type"
                  :key="i"
                >
                  <div
                    class="work-type-square mr-2"
                    :style="{ backgroundColor: item.color }"
                  ></div>
                  <p class="text-3 mr-1">{{ item.percent }}%</p>
                  <p class="text-3 font-weight-bold">{{ item.name }}</p>
                </div>
              </div>

              <p class="text-3 text-center">รายละเอียด 21 แผน</p>

              <div>
                <VueSlickCarousel
                  v-bind="slickOptions"
                  class="work-card-wrapper"
                >
                  <div class="work-card" v-for="item in 5">
                    <b-row>
                      <b-col cols="8">
                        <p class="text-1 font-weight-bold">
                          แผนงานบริหารงานทั่วไป
                        </p>
                        <h4 class="header-4">9,832 ล้านบาท (17.6%)</h4>
                        <p class="text-3 m-0">
                          งบประมาณที่เกี่ยวข้องกับการบริหารจัดการทั่วไป
                          ภายในองค์กรของ อบจ. เช่น เงินเดือนพนักงาน
                          เงินสำหรับใช้จ่ายสิ่งวัสดุอุปกรณ์ต่าง ๆ ขององค์กร
                          เงินจัดกิจกรรมเพื่อพัฒนาศักยภาพภายในองค์กร เป็นต้น
                        </p>
                      </b-col>
                      <b-col cols="4"
                        ><img width="100%" :src="work_type_1" alt=""
                      /></b-col>
                    </b-row>
                  </div>
                </VueSlickCarousel>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div class="bg-blue-a white-a">
      <div class="p-4">
        <h4 class="header-4 font-weight-bold">
          ลองมาส่องงบจังหวัดที่คุณสนใจกันดีกว่า
        </h4>
        <p class="text-1 mt-2">
          ปี
          <b-form-select
            v-model="selected"
            :options="options"
            class="year-select text-2 white-a font-weight-bold"
          ></b-form-select>
          อบจ.
          <b-form-select
            v-model="selected"
            :options="options"
            class="year-select text-2 white-a font-weight-bold"
          ></b-form-select
          >ใช้งบประมาณไปกับอะไรบ้าง?
        </p>
      </div>
      <div class="position-relative">
        <p class="text-2 white-a m-0 tab-desc">เลือกวิธีสำรวจ:</p>
        <b-tabs align="right" lazy nav-class="main-tab pr-5" no-fade>
          <b-tab
            title="สำรวจผ่านโครงสร้าง"
            active
            title-item-class="tab-header"
          >
            <div class="text-1 bg-black py-4 white-a">
              <div class="text-center my-5">
                <h4 class="header-4 font-weight-bold">
                  จัดสรรงบประมาณทั้งหมดในภาพรวม
                </h4>
                <h1 class="header-1">6,005 ล้านบาท</h1>
              </div>

              <div class="text-center pb-4">
                <p class="text-2 mb-1">จำแนกค่าใช้จ่ายตาม</p>
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    id="btn-radios-1"
                    v-model="selected_type"
                    :options="type"
                    :aria-describedby="ariaDescribedby"
                    name="radios-btn-default"
                    buttons
                    class="black expense-type"
                  ></b-form-radio-group>
                </b-form-group>
              </div>

              <div class="d-flex justify-content-center">
                <div
                  class="d-flex mx-1"
                  v-for="(item, i) in work_type"
                  :key="i"
                >
                  <div
                    class="work-type-square mr-2"
                    :style="{ backgroundColor: item.color }"
                  ></div>
                  <p class="text-3 mr-1">{{ item.percent }}%</p>
                  <p class="text-3 font-weight-bold">{{ item.name }}</p>
                </div>
              </div>

              <p class="text-3 text-center mt-5">รายละเอียด 11 แผน</p>

              <div>
                <VueSlickCarousel
                  v-bind="slickOptions"
                  class="work-card-wrapper-2"
                >
                  <div v-for="item in 5">
                    <div class="work-card black">
                      <b-row class="align-items-center">
                        <b-col cols="8">
                          <p class="text-1 font-weight-bold m-0">
                            แผนงานบริหารงานทั่วไป
                          </p>
                          <h4 class="header-4">9,832 ล้านบาท (17.6%)</h4>
                        </b-col>
                        <b-col cols="4"
                          ><img width="100%" :src="work_type_1" alt=""
                        /></b-col>
                      </b-row>
                    </div>
                    <div class="bg-white p-4">
                      <p class="text-2 blue-a font-weight-bold m-0">
                        มี XX รายการงบภายใต้แผนงาน
                      </p>
                      <p class="text-2 blue-a m-0">
                        (สัดส่วน % เทียบเฉพาะรายการในแผนงานเดียวกัน)
                      </p>
                      <hr />

                      <div v-for="item in 5">
                        <p class="text-2 black font-weight-bold m-0">
                          ควบคุมภายในและการตรวจสอบภายใน
                        </p>
                        <p class="text-3 black m-0">xx,xxxx ล้านบาท (xx%)</p>
                        <div class="bg-black w-50 test mb-4"></div>
                      </div>
                    </div>
                  </div>
                </VueSlickCarousel>
              </div>

              <div class="mt-5 text-center">
                <a
                  href="#"
                  target="_blank"
                  class="link-btn text-3"
                  rel="noopener noreferrer"
                  >สำรวจเอกสารงบประมาณฉบับจริง</a
                >
              </div>
              <div class="mt-5 text-center">
                <a
                  href="#"
                  target="_blank"
                  class="link-btn text-3"
                  rel="noopener noreferrer"
                  >Download ข้อบัญญัติรายจ่าย อบจ.</a
                >
              </div>
            </div>
          </b-tab>
          <b-tab title="สำรวจผ่านคำสำคัญ" title-item-class="tab-header" active>
            <div class="text-2 bg-white py-4 black">
              <div style="width: 600px" class="mx-auto text-center">
                <p>
                  เห็นโครงสร้างงบ อบจ. กันไปแล้ว หลายคนอาจจะยังจินตนาการไม่ออก
                  ว่างบแต่ละแผนงานเกี่ยวข้องกับชีวิตเราเรื่องไหนบ้าง
                </p>

                <p>
                  ถ้าอย่างนั้น... ลองเปลี่ยนมาสำรวจงบ อบจ.
                  จาก<b>สิ่งที่เราสนใจ</b>กันดีกว่า
                </p>

                <p class="text-3 blue-a">
                  กด + เพื่อสำรวจคำสำคัญภายใต้หัวข้อที่คุณสนใจ
                </p>
              </div>
              <b-row class="m-0">
                <b-col
                  sm="4"
                  v-for="(item, i) in keyword"
                  :key="i"
                  class="mb-3"
                >
                  <div
                    class="bg-blue-a test2 px-3 pt-3 lime-b"
                    :style="{
                      backgroundImage: `url(${require('@/assets/images/keywordgroup_' +
                        (i + 1) +
                        '.svg')})`,
                    }"
                  >
                    <p class="m-0 font-weight-bold">{{ item.text }}</p>
                  </div>
                  <b-button
                    v-b-toggle="'collapse-' + (i + 1)"
                    variant="primary"
                    class="
                      keyword-collapse
                      w-100
                      bg-blue-a
                      text-right text-1
                      lime-b
                    "
                    >+</b-button
                  >
                  <b-collapse :id="'collapse-' + (i + 1)">
                    <b-card>
                    <b-row>
                      <b-col cols="4" v-for="item in 6"><div class="test3 text-3 white-b p-2 text-center mb-3">ระบบประปา</div></b-col>
                    </b-row>
                    </b-card>
                  </b-collapse></b-col
                >
              </b-row>

              <div class="mt-5 text-center">
                <a
                  href="#"
                  target="_blank"
                  class="link-btn text-3"
                  rel="noopener noreferrer"
                  >สำรวจเอกสารงบประมาณฉบับจริง</a
                >
              </div>
              <div class="mt-5 text-center">
                <a
                  href="#"
                  target="_blank"
                  class="link-btn text-3"
                  rel="noopener noreferrer"
                  >Download ข้อบัญญัติรายจ่าย อบจ.</a
                >
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div class="bg-blue-a p-4">
      <div class="pao-header-box mb-5">
        <div class="content bg-lime-b">
          <p class="text-1 font-weight-bold m-0 blue-a">
            รายการงบที่น่าจับตาของ อบจ. เชียงใหม่
          </p>
        </div>
      </div>
      <p class="text-1 white-b font-weight-bold">
        5 อันดับรายการที่ใช้จ่ายเงิน<u>เยอะ</u>ที่สุด
      </p>
      <div class="overflow-auto drag-wrapper" v-dragscroll>
        <div class="d-flex flex-nowrap">
          <img
            :src="project_card_sample"
            v-for="item in 5"
            alt=""
            class="mr-3"
          />
        </div>
      </div>
      <p class="text-1 white-b font-weight-bold mt-5">
        5 อันดับรายการที่ใช้จ่ายเงิน<u>น้อย</u>ที่สุด
      </p>
      <div class="overflow-auto drag-wrapper" v-dragscroll>
        <div class="d-flex flex-nowrap">
          <img
            :src="project_card_sample"
            v-for="item in 5"
            alt=""
            class="mr-3"
          />
        </div>
      </div>
      <b-row class="mx-0 mt-5">
        <b-col
          sm="10"
          class="
            text-2
            bg-black
            text-right
            p-3
            white-b
            d-flex
            align-items-center
          "
        >
          <div>
            <p>
              แผนงบประมาณของ<span class="lime-b">อบจ. เชียงใหม่</span>
              ประกอบด้วยโครงการอีกมากมายที่เกี่ยวข้องกับความเป็นอยู่ของพวกเรา
            </p>
            <p class="m-0">
              ทุกคนสามารถเข้าใช้เครื่องมือ ACT Ai
              เพื่อสืบค้นข้อมูลโครงการจัดซื้ดจัดจ้างภาครัฐ และตรวจสอบความโปร่งใส
              ของรายละเอียดโครงการ งบประมาณ และบริษัทชนะการประมูล
            </p>
          </div>
        </b-col>
        <b-col sm="2" class="bg-white-a p-3 red text-center">
          <img :src="logo" alt="" />
          <p class="text-2 mb-0 font-weight-bold mt-2">เข้าสู่เครื่องมือ</p>
        </b-col>
      </b-row>
    </div>
    <div
      class="
        grid-wrapper
        h-100vh
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <div class="content text-2 white-b text-center">
        <p class="text-1 font-weight-bold">หลังตรวจสอบแล้ว…เราทำอะไรได้บ้าง?</p>

        <p>
          องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย) หรือ ACT ได้พัฒนาเครื่องมือ
          <b> Corruption Watch</b> ในรูปแบบ Line Official Account
          เพื่อสนับสนุนการร่วมจับตาและส่งข้อมูลเหตุสงสัยทุจริตคอรร์รัปชัน<br /><br />
          <span class="orange-b">หากพบประเด็นน่าสงสัย</span
          >เกี่ยวกับแผนงบประมาณในจังหวัดของคุณ สามารถช่วยกัน
          <span class="lime-b font-weight-bold"
            >ส่งเบาะแสเหตุสงสัยการทุจริตคอร์รัปชัน</span
          >
          มาได้ที่ LINE Official Account จับตาไม่ให้ใครโกง
        </p>

        <img :src="corruption_watch" class="my-4" width="186" alt="" />

        <p class="m-0 font-weight-bold">@corruptionwatch</p>
        <p>และติดตามสรุปการรายงานเหตุสงสัยการทุจริต ได้ที่ Corruption Watch</p>
      </div>
    </div>
    <div
      class="h-100vh choose-wrapper d-flex flex-column justify-content-between"
    >
      <div class="p-3 d-flex justify-content-center align-items-center h-100">
        <div>
          <div class="header-box mb-5">
            <div class="content bg-blue-a">
              <p class="text-1 font-weight-bold m-0 white-a">
                คลิกเลือก เพื่อไปต่อ
              </p>
            </div>
          </div>
          <div class="d-flex flex-column flex-md-row justify-content-center">
            <a href="/act-local-budgeting/story">
              <div class="box-1 pointer mx-3">
                <h4 class="header-4 blue-a ml-4 mb-3 font-weight-bold">
                  งบ อบจ.<br />
                  สำคัญกับชีวิตเรา<br />
                  อย่างไร?
                </h4>
              </div>
            </a>
            <a href="/act-local-budgeting/conclusion">
              <div class="box-2 pointer mx-3 mt-3 mt-md-0">
                <h4 class="header-4 white-a ml-4 mb-3 font-weight-bold">
                  สรุปภาพรวมงบ อบจ.
                </h4>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="gradient"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 2565,
      selected_type: "แผนงาน",
      options: [
        { value: 2565, text: 2565 },
        { value: 2564, text: 2564 },
      ],
      type: [
        { text: "แผนงาน", value: "แผนงาน" },
        { text: "ประเภทงบ", value: "ประเภทงบ" },
      ],
      work_type: [
        { name: "ด้านบริหารทั่วไป", color: "#F2A8EE", percent: 18.6 },
        { name: "ด้านบริการชุมชน", color: "#89E26A", percent: 18.6 },
        { name: "ด้านเศรษฐกิจ", color: "#FF8540", percent: 18.6 },
        { name: "ด้านการดำเนินงานอื่น", color: "#4A4E5E", percent: 18.6 },
      ],

      keyword: [
        {
          text: "โครงสร้างพื้นฐาน/สิ่งอำนวยความสะดวก",
          bg: "~/assets/images/keywordgroup_1.svg",
        },
        { text: "วัสดุ/อุปกรณ์", bg: "./assets/images/keywordgroup_2.svg" },
        { text: "กิจกรรม", bg: "./assets/images/keywordgroup_3.svg" },
        { text: "บุคลากร/กลุ่มคน", bg: "./assets/images/keywordgroup_4.svg" },
        { text: "สถานที่", bg: "./assets/images/keywordgroup_5.svg" },
        {
          text: "สวัสดิการ/คุณภาพชีวิต",
          bg: "./assets/images/keywordgroup_6.svg",
        },
        { text: "ค่าใช้จ่ายอื่น ๆ", bg: "./assets/images/keywordgroup_7.svg" },
      ],
      work_type_1: require("~/assets/images/work_type_1.svg"),
      corruption_watch: require("~/assets/images/corruption_watch.png"),
      project_card_sample: require("~/assets/images/project_card_sample.svg"),
      logo: require("~/assets/images/logo.svg"),
      slickOptions: {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        dots: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
.collapse .card-body {
  background-color: #0056a6;
  padding: 0 1.25rem 1.25rem;
}

.collapse .card {
  border: none;
}

.tab-header {
  width: 250px;
  text-align: center;

  font-size: 24px;
  font-weight: bold;
}

.tab-header a {
  background: #dae2e3;
  color: rgba(34, 34, 36, 0.45);
  border-radius: 0 !important;
}

.tab-header .active {
  color: #181f1c;
}

.expense-type label {
  width: 225px;
  border-radius: 0;
  background: #3b413e;
  color: #000;
  font-weight: bold;
  border: none;
  padding: 10px;
}

.expense-type .active {
  width: 225px;
  border-radius: 0;
  background: #ffffff !important;
  color: #000 !important;
  font-weight: bold;
  border: none;
  padding: 10px;
}
</style>

<style lang="scss" scoped>
.grid-wrapper {
  background: url("~/assets/images/bg_grid_tile.svg"), #181f1c;
  background-size: 20px;

  .content {
    max-width: 600px;
  }
}

.year-select {
  width: 96px;
  border: 1px solid #e5fbff;
  background: transparent;
  border-radius: 0;
}

.tab-desc {
  position: absolute;
  left: 30%;
  top: 10px;
}

.work-type-square {
  width: 15px;
  height: 15px;
}

.work-card-wrapper {
  max-width: 600px;
  margin: auto;
}

.work-card-wrapper-2 {
  max-width: 780px;
  margin: auto;
}

.work-card {
  background: #f2a8ee;
  box-shadow: 1px 1px 12px 2px rgba(24, 31, 28, 0.15);
  padding: 25px;
}

.test {
  height: 20px;
}

.link-btn {
  background: #181f1c;
  color: #fffef5;
  border: 1px solid #fffef5;
  border-radius: 5px;
  padding: 10px 25px;
}

.choose-wrapper {
  background-image: url("~/assets/images/bg_grid_blue.svg");
  position: relative;
  .header-box {
    border: 1px solid #0056a6;
    padding: 10px;
    width: fit-content;
    margin: auto;

    .content {
      padding: 10px;
    }
  }
  .gradient {
    width: 100%;
    height: 270px;
    background: linear-gradient(
      0deg,
      rgba(0, 86, 166, 0.8) -5.74%,
      rgba(255, 255, 255, 0) 100%
    );
    mix-blend-mode: multiply;
  }
}

.box-1 {
  background-image: url("~/assets/images/box_light.svg");
  width: 457.85px;
  height: 330.08px;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;

  @media #{$mq-mobile} {
    width: 280px;
    height: 201.86px;
  }
}

.box-1:hover,
.box-2:hover {
  background-image: url("~/assets/images/box_hover.svg");

  h4 {
    color: $blue-a !important;
  }
}

.box-2 {
  background-image: url("~/assets/images/folder_dark.svg");
  width: 457.85px;
  height: 330.08px;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;

  @media #{$mq-mobile} {
    width: 280px;
    height: 201.86px;
  }
}

.pao-header-box {
  border: 1px solid #e0fd6a;
  padding: 10px;
  width: fit-content;
  margin: auto;

  .content {
    padding: 10px;
  }
}

.drag-wrapper::-webkit-scrollbar {
  display: none;
}

.test2 {
  height: 175px;
  background-size: contain;
  background-repeat: no-repeat;
}

.keyword-collapse {
  border: 0;
  border-radius: 0;
}

.test3 {
  border: 1px solid #fffef5;
}
</style>
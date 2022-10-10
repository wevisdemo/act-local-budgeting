<template>
  <div>
    <div class="pao-header-box mb-5">
      <div class="content bg-lime-b">
        <p class="text-1 font-weight-bold m-0 blue-a">
          รายการงบที่น่าจับตาของ อบจ. {{province}}
        </p>
      </div>
    </div>
    <template v-if="total != 0">
      <p class="text-1 white-b font-weight-bold">
        5 อันดับรายการที่ใช้จ่ายเงิน<u>เยอะ</u>ที่สุด
      </p>
      <div class="overflow-auto drag-wrapper" v-dragscroll v-if="tasks.length > 0">
        <div class="d-flex flex-nowrap task-wrapper">
          <div
            class="task-box mr-3"
            v-for="(item, i) in tasks.slice(0, 5).sort(function (a, b) {
              return b.total - a.total;
            })"
            :key="'task-list-' + i"
          >
            <b-row>
              <b-col cols="3"
                ><div class="trophy">
                  <p class="text-4 mb-0 text-center font-weight-bold pt-1">
                    {{ i + 1 }}
                  </p>
                </div></b-col
              >
              <b-col cols="9" class="pl-1">
                <p class="text-3 mb-0 font-weight-bold">
                  {{ item.task }}
                </p></b-col
              >
            </b-row>
            <p class="text-1 my-1">
              {{
                parseInt(item.total.toString().substring(0,item.total.toString().length - 5)).toLocaleString()
              }}
              ล้านบาท
            </p>
            <p class="text-4 mb-1">
              {{ ((item.total / total) * 100).toFixed(1) }}%
              ของค่าใช้จ่ายทั้งหมด
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
            <b-row>
              <b-col cols="6">
                <p class="text-4 font-weight-bold mb-1">แผนงาน :</p>
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
                <p class="text-4 mb-1 grey">{{ item.area }}</p>
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
                <p class="text-4 mb-1">{{ item.plan }}</p>
                <p class="text-4 mb-1 grey">{{ item.area }}</p>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <p class="text-1 white-b font-weight-bold mt-5">
        5 อันดับรายการที่ใช้จ่ายเงิน<u>น้อย</u>ที่สุด
      </p>
      <div class="overflow-auto drag-wrapper" v-dragscroll v-if="tasks.length > 0">
        <div class="d-flex flex-nowrap task-wrapper">
          <div
            class="task-box mr-3"
            v-for="(item, i) in tasks.slice(0, 5).sort(function (a, b) {
              return a.total - b.total;
            })"
            :key="'task-list-' + i"
          >
            <b-row>
              <b-col cols="3"
                ><div class="trophy">
                  <p class="text-4 mb-0 text-center font-weight-bold pt-1">
                    {{ i + 1 }}
                  </p>
                </div></b-col
              >
              <b-col cols="9" class="pl-1">
                <p class="text-3 mb-0 font-weight-bold">
                  {{ item.task }}
                </p></b-col
              >
            </b-row>
            <p class="text-1 my-1">
              {{
                parseInt(item.total.toString().substring(0,item.total.toString().length - 5)).toLocaleString()
              }}
              ล้านบาท
            </p>
            <p class="text-4 mb-1">
              {{ ((item.total / total) * 100).toFixed(1) }}%
              ของค่าใช้จ่ายทั้งหมด
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
            <b-row>
              <b-col cols="6">
                <p class="text-4 font-weight-bold mb-1">แผนงาน :</p>
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
                <p class="text-4 mb-1 grey">{{ item.area }}</p>
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
      </div>
    </template>
    <div>
      <p class="text-1 white-b my-5 font-weight-bold">
        ข้อมูลอื่นๆของจังของอบจ. {{province}}
      </p>
      <b-row v-if="pao.chiefExecutives != null">
        <b-col sm="7">
          <div class="bg-lime-b p-3 w-fit">
            <p class="text-1 font-weight-bold m-0">รายได้ของอบจ.</p>
          </div>
          <div class="bg-black white-b p-3">
            <h3
              class="header-3 text-center font-weight-bold"
              v-if="pao.population != null"
            >
              {{
                parseInt(
                  pao.population.toString().substring(0,pao.population.toString().length - 5)
                ).toLocaleString()
              }}
              ล้านบาท
            </h3>
            <div class="d-flex w-100" v-if="pao != null">
              <div
                v-for="(item, i) in pao.incomes"
                :key="'income+' + i"
                class="bg-white-a"
                :style="{
                  width: ((item.total / total) * 100).toFixed(1) + '%',
                  height: '50px',
                }"
              ></div>
              <div
                v-for="(item, i) in pao.incomes"
                :key="'income-' + i"
                class="bg-white-a"
                :style="{
                  width: ((item.total / total) * 100).toFixed(1) + '%',
                  height: '50px',
                }"
                :class="{
                  'bg-white-a': i == 0,
                  'bg-blue-a': i == 1,
                  'bg-pink': i == 2,
                }"
              ></div>
            </div>
            <div>
              <div class="d-flex justify-content-around my-3">
                <div
                  v-for="(item, i) in pao.incomes"
                  :key="'income+' + i"
                  class="black"
                >
                  <div
                    :class="{
                      'bg-white-a': i == 0,
                      'bg-blue-a': i == 1,
                      'bg-pink': i == 2,
                    }"
                    class="font-weight-bold"
                  >
                    {{ item.type }}
                  </div>
                  <p class="my-1 white-b">
                    {{
                      parseInt(
                        item.total.toString().substring(0,item.total.toString().length - 5)
                      ).toLocaleString()
                    }}
                    ล้านบาท
                  </p>
                </div>
              </div>
            </div>
            <hr style="border-top: 1px solid #fff" />
            <b-row v-if="pao.population != null">
              <b-col sm="5">
                <p class="text-3 font-weight-bold mb-1">จำนวนประชากร</p>
                <p class="text-3 mb-1">
                  {{ pao.population.toLocaleString() }} คน
                </p>
                <p class="text-4 m-0">
                  ข้อมูลจากกรมการปกครอง โดยไม่นับรวมประชากรแฝง
                </p>
              </b-col>
              <b-col sm="7">
                <p class="text-3 font-weight-bold mb-1">
                  งบประมาณเฉลี่ยต่อหัวเทียบกับ 76 จังหวัด
                </p>
                <div id="chart">
                  <apexchart
                    type="scatter"
                    height="60"
                    :options="chartOptions"
                    :series="series"
                    :key="testKey"
                  ></apexchart>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="5">
          <div class="bg-lime-b p-3 w-fit">
            <p class="text-1 font-weight-bold m-0">ผู้บริหาร</p>
          </div>
          <div class="bg-black white-b p-3">
            <b-row>
              <b-col sm="8">
                <p class="text-2 font-weight-bold lime">
                  {{ pao.chiefExecutives[0].name }}
                </p>
                <p class="text-3 font-weight-bold">ตำแหน่ง</p>
                <p class="text-3">นายกองค์การบริหารส่วนจังหวัดเชียงใหม่</p>
                <p class="text-3 font-weight-bold">วันที่ดำรงตำแหน่ง</p>
                <p class="text-3">{{ pao.chiefExecutives[0].inOffice }}</p>
              </b-col>
              <b-col sm="4"
                ><img :src="pao.chiefExecutives[0].photoUrl" alt=""
              /></b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row class="mx-0 mt-5">
      <b-col
        sm="10"
        class="text-2 bg-black text-right p-3 white-b d-flex align-items-center"
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
        <img :src="logo" alt="" class="mb-1" />
        <div>
          <a
            target="_blank"
            :href="pao.actAiUrl"
            class="text-2 mb-0 font-weight-bold mt-2 red"
            >เข้าสู่เครื่องมือ</a
          >
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    year: Number,
    province: String,
  },
  data() {
    return {
      total: 0,
      testKey: 0,
      tasks: [],
      pao: [],
      budgetPerCapita: [],
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
      logo: require("~/assets/images/logo.svg"),
      series: [
        {
          name: "SAMPLE A",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 100,
          type: "scatter",
          zoom: {
            enabled: false,
            type: "xy",
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          tickAmount: 1,
          labels: {
            formatter: function (val) {
              return "฿" + parseInt(val).toLocaleString();
            },
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          tickAmount: 1,
          display: false,
          labels: {
            show: false,
          },
        },
        grid: {
          show: false,
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
      },
    };
  },
  watch: {
    year: {
      handler(newValue, oldValue) {
        this.getData(this.year, this.province);
      },
    },
    province: {
      handler(newValue, oldValue) {
        this.getData(this.year, this.province);
      },
    },
  },
  mounted() {
    this.getData(this.year, this.province);
  },
  methods: {
    getData(y, p) {
      fetch("data/" + y + "/pao-" + p + ".json")
        .then((response) => response.json())
        .then((data) => {
          this.tasks = data.tasks;
          this.total = data.total;
          this.pao = data.pao;
          this.pao.incomes.sort(function (a, b) {
            return b.total - a.total;
          });
          //console.log(this.pao);
          //console.log(this.pao.incomes.length);
        });

      this.testKey++;

      fetch("data/2565/nation-wide.json")
        .then((response) => response.json())
        .then((data) => {
          let result = data.budgetPerCapita;

          result.forEach((element) => {
            this.budgetPerCapita.push([parseInt(element.amount.toFixed()), 0]);
          });

          this.series[0].data = this.budgetPerCapita;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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

.task-box {
  background: #e9e9e9;
  padding: 20px;
  max-width: 280px;
  width: 100%;
}

.trophy {
  background-image: url("~/assets/images/trophy_desktop.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 40px;
  width: 40px;
}

.task-wrapper {
  width: 1400px;
}

.bg-pink {
  background: #ff2581;
}
</style>
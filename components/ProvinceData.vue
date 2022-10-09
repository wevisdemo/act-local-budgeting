<template>
  <div>
    <div class="text-1 bg-black py-4 white-a">
      <div class="text-center my-5">
        <h4 class="header-4 font-weight-bold">จัดสรรงบประมาณทั้งหมดในภาพรวม</h4>
        <h1 class="header-1">
          {{ parseInt(total.toString().substring(0, 5)).toLocaleString() }}
          ล้านบาท
        </h1>
      </div>

      <div class="text-center pb-4" v-if="total != 0">
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

      <template v-if="selected_type == 'แผนงาน'">
        <div class="d-flex justify-content-center" v-if="total != 0">
          <div class="d-flex mx-1" v-for="(item, i) in work_type" :key="i">
            <div
              class="work-type-square mr-2"
              :style="{ backgroundColor: item.color }"
            ></div>
            <p class="text-3 mr-1">
              {{ ((item.total / total) * 100).toFixed(1) }}%
            </p>
            <p class="text-3 font-weight-bold">{{ item.name }}</p>
          </div>
        </div>

        <div class="d-flex w-100" v-if="total != 0">
          <template class="d-flex mx-1" v-for="(item2, i) in work_type">
            <div
              v-for="(item3, j) in item2.plans"
              :style="{
                maxWidth: ((item3.total / total) * 100).toFixed(1) + '%',
              }"
              class="w-100"
              :key="'type-' + i + j"
            >
              <div
                @click="selectWorkPlan(item3.plan)"
                class="work-type-square big black w-100 mr-2"
                :style="{
                  backgroundColor: item2.color,
                }"
                :key="j"
              >
                <h5 class="header-5 mr-1" v-if="j == 0">
                  {{ ((item3.total / total) * 100).toFixed(1) }}%
                </h5>
              </div>
            </div>
          </template>
        </div>

        <p class="my-5 text-2 text-center" v-if="total != 0">
          รายละเอียดแผนงาน
        </p>

        <div v-if="total != 0">
          <VueSlickCarousel
            v-bind="slickOptions"
            class="work-card-wrapper-2"
            ref="workplanprovince"
            v-if="groupedByAreaSlide.length > 0"
          >
            <div
              v-for="(item, i) in groupedByAreaSlide"
              :key="'province-slide-' + i"
            >
              <div
                class="work-card black"
                :style="{
                  backgroundColor: item.color,
                }"
              >
                <b-row class="align-items-center">
                  <b-col cols="8">
                    <p class="text-1 font-weight-bold m-0">
                      {{ item.plan }}
                    </p>
                    <h4 class="header-4">
                      {{
                        parseInt(
                          item.total.toString().substring(0, 4)
                        ).toLocaleString()
                      }}
                      ล้านบาท ({{ ((item.total / total) * 100).toFixed(1) }}%)
                    </h4>
                  </b-col>
                  <b-col cols="4"
                    ><img
                      width="100%"
                      :src="require(`@/assets/images/work_type_${i + 1}.svg`)"
                      alt=""
                  /></b-col>
                </b-row>
              </div>
              <div class="bg-white p-4">
                <p class="text-2 blue-a font-weight-bold m-0">
                  มี
                  {{
                    tasks.filter(
                      (x) => x.area == item.name && x.plan == item.plan
                    ).length
                  }}
                  รายการงบภายใต้แผนงาน
                </p>
                <p class="text-2 blue-a m-0">
                  (สัดส่วน % เทียบเฉพาะรายการในแผนงานเดียวกัน)
                </p>
                <hr />

                <div class="test">
                  <div
                    v-for="(item2, j) in tasks
                      .filter((x) => x.area == item.name && x.plan == item.plan)
                      .sort(function (a, b) {
                        return b.total - a.total;
                      })"
                    :key="'province-task-' + j"
                  >
                    <p class="text-2 black font-weight-bold m-0">
                      {{ item2.task }}
                    </p>
                    <p class="text-3 black m-0">
                      {{
                        parseInt(
                          item2.total.toString().substring(0, 4)
                        ).toLocaleString()
                      }}
                      ล้านบาท ({{ ((item2.total / total) * 100).toFixed(1) }}%)
                    </p>
                    <div
                      class="bg-black task-chart mb-4"
                      :style="{
                        maxWidth:
                          ((item2.total / total) * 100).toFixed(1) + '%',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </template>
      <template v-else>
        <div class="d-flex justify-content-center">
          <div class="d-flex mx-1" v-for="(item, i) in groupedByType" :key="i">
            <div
              class="work-type-square mr-2"
              :style="{ backgroundColor: item.color }"
            ></div>
            <p class="text-3 mr-1">
              {{ ((item.total / total) * 100).toFixed(1) }}%
            </p>
            <p class="text-3 font-weight-bold">{{ item.type }}</p>
          </div>
        </div>

        <div class="d-flex w-100">
          <div
            v-for="(item3, j) in groupedByType"
            :style="{
              maxWidth: ((item3.total / total) * 100).toFixed(1) + '%',
            }"
            class="w-100"
            :key="'type-' + j"
          >
            <div
            @click="selectWorkType(item3.type)"
              class="work-type-square big w-100 mr-2"
              :style="{
                backgroundColor: item3.color,
              }"
              :key="j"
            >
              <h5 class="header-5 mr-1">
                {{ ((item3.total / total) * 100).toFixed(1) }}%
              </h5>
            </div>
          </div>
        </div>

        <p class="my-5 text-2 text-center">รายละเอียดแผนงาน</p>

        <div>
          <VueSlickCarousel
            v-bind="slickOptions"
            class="work-card-wrapper-2"
            ref="worktypeprovince"
            v-if="groupedByType.length > 0"
          >
            <div
              v-for="(item, i) in groupedByType"
              :key="'province-slide-' + i"
            >
              <div
                class="work-card black"
                :style="{
                  backgroundColor: item.color,
                }"
              >
                <b-row class="align-items-center">
                  <b-col cols="8">
                    <p class="text-1 font-weight-bold m-0">
                      {{ item.type }}
                    </p>
                    <h4 class="header-4">
                      {{
                        parseInt(
                          item.total.toString().substring(0, 4)
                        ).toLocaleString()
                      }}
                      ล้านบาท ({{ ((item.total / total) * 100).toFixed(1) }}%)
                    </h4>
                  </b-col>
                  <b-col cols="4"
                    ><img
                      width="100%"
                      :src="require(`@/assets/images/klang_${item.id}.svg`)"
                      alt=""
                  /></b-col>
                </b-row>
              </div>
              <div class="bg-white p-4">
                <p class="text-2 blue-a font-weight-bold m-0">
                  มี
                  {{ tasks.filter((x) => x.type == item.type).length }}
                  รายการงบภายใต้แผนงาน
                </p>
                <p class="text-2 blue-a m-0">
                  (สัดส่วน % เทียบเฉพาะรายการในแผนงานเดียวกัน)
                </p>
                <hr />

                <div class="test">
                  <div
                    v-for="(item2, j) in tasks
                      .filter((x) => x.type == item.type)
                      .sort(function (a, b) {
                        return b.total - a.total;
                      })"
                    :key="'province-task-' + j"
                  >
                    <p class="text-2 black font-weight-bold m-0">
                      {{ item2.task }}
                    </p>
                    <p class="text-3 black m-0">
                      {{
                        parseInt(
                          item2.total.toString().substring(0, 4)
                        ).toLocaleString()
                      }}
                      ล้านบาท ({{ ((item2.total / total) * 100).toFixed(1) }}%)
                    </p>
                    <div
                      class="bg-black task-chart mb-4"
                      :style="{
                        maxWidth:
                          ((item2.total / total) * 100).toFixed(1) + '%',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </VueSlickCarousel></div
      ></template>

      <div class="mt-5 text-center"  v-if="total != 0">
        <a
          :href="pao.budgetingDocUrl"
          target="_blank"
          class="link-btn text-3"
          rel="noopener noreferrer"
          >สำรวจเอกสารงบประมาณฉบับจริง</a
        >
      </div>
      <div class="mt-5 text-center">
        <a
          href="https://docs.google.com/spreadsheets/d/1hyNpUsSRriL0XhP89HtEO9S0uU2IOQz33cvxT5GwIeU/edit#gid=0"
          target="_blank"
          class="link-btn text-3"
          rel="noopener noreferrer"
          >Download ข้อบัญญัติรายจ่าย อบจ.</a
        >
      </div>
    </div>
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
      selected_type: "แผนงาน",
      groupedByArea: [],
      groupedByType: [],
      groupedByAreaSlide: [],
      pao: [],
      tasks: [],
      work_type: [
        { name: "ด้านบริหารทั่วไป", color: "#F2A8EE", total: 0, plans: [] },
        { name: "ด้านบริการชุมชน", color: "#89E26A", total: 0, plans: [] },
        { name: "ด้านเศรษฐกิจ", color: "#FF8540", total: 0, plans: [] },
        { name: "ด้านการดำเนินงานอื่น", color: "#4A4E5E", total: 0, plans: [] },
      ],
      type: [
        { text: "แผนงาน", value: "แผนงาน" },
        { text: "ประเภทงบ", value: "ประเภทงบ" },
      ],
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
      this.groupedByAreaSlide = [];
      this.total_work_type = 0;

      fetch("/data/" + y + "/pao-" + p + ".json")
        .then((response) => response.json())
        .then((data) => {
          this.total = data.total;
          this.groupedByArea = data.groupedByArea;
          this.groupedByType = data.groupedByType;
          this.tasks = data.tasks;
          this.pao = data.pao;

          let result = this.groupedByArea.map((a) => a.plans);

          this.work_type.forEach((element, i) => {
            this.work_type[i].plans = result[i];
            this.work_type[i].total = this.groupedByArea[i].total;
          });

          this.work_type.map((x, i, ref) => {
            x.plans.map((y) => {
              y.color = x.color;
              y.name = x.name;
            });
          });

          result.forEach((element) => {
            this.total_work_type += element.length;

            element.forEach((element2) => {
              this.groupedByAreaSlide.push(element2);
            });
          });

          let bg = "";

          this.groupedByType.map((x, i, ref) => {
            if (x.type == "งบบุคลากร") bg = "#208FDF";
            else if (x.type == "งบดำเนินงาน") bg = "#EC6440";
            else if (x.type == "งบลงทุน") bg = "#F1E6D7";
            else if (x.type == "งบเงินอุดหนุน") bg = "#253472";
            else if (x.type == "งบกลาง") bg = "#FFB930";
            else bg = "#A80C7C";
            x.id = i + 1;
            x.color = bg;
          });

          this.groupedByType.sort(function (a, b) {
            return b.total - a.total;
          });
        });
    },
    selectWorkPlan(index) {
      const i = this.groupedByAreaSlide.map((e) => e.plan).indexOf(index);
      this.$refs.workplanprovince.goTo(i);
    },
    selectWorkType(index) {
      const i = this.groupedByType.map((e) => e.type).indexOf(index);
      this.$refs.worktypeprovince.goTo(i);
    },
  },
};
</script>

<style lang="scss" scoped>
.work-type-square {
  width: 15px;
  height: 15px;
  overflow: hidden;
}
.big {
  height: 200px;
  border: 4px solid #000000;
  cursor: pointer;
  padding: 12px;
}

.big:hover {
  border: 4px solid #fff;
}

.work-card-wrapper-2 {
  max-width: 780px;
  margin: auto;
}

.work-card {
  box-shadow: 1px 1px 12px 2px rgba(24, 31, 28, 0.15);
  padding: 25px;
}

.task-chart {
  height: 20px;
}

.test {
  max-height: 420px;
  overflow: hidden;
}

.link-btn {
  background: #181f1c;
  color: #fffef5;
  border: 1px solid #fffef5;
  border-radius: 5px;
  padding: 10px 25px;
}
</style>
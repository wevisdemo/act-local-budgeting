<template>
  <div>
    <div class="pao-header-box mb-5">
      <div class="content bg-lime-b">
        <p class="text-1 font-weight-bold m-0 blue-a">
          รายการงบที่น่าจับตาของ อบจ. {{ province }}
        </p>
      </div>
    </div>
    <template>
      <div
        class="
          text-1
          white-b
          font-weight-bold
          d-flex
          justify-content-between
          mb-3
        "
      >
        <span> 5 อันดับรายการที่ใช้จ่ายเงิน<u>เยอะ</u>ที่สุด</span>
        <img :src="drag" alt="" class="d-block d-lg-none"/>
      </div>
      <div
        class="overflow-auto drag-wrapper"
        v-dragscroll
        v-if="tasks.length > 0"
      >
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
                parseInt(
                  item.total
                    .toString()
                    .substring(0, item.total.toString().length - 3)
                ).toLocaleString()
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
      <div class="text-center py-5 text-2 white-b" v-else>ไม่พบข้อมูล</div>
      <div
        class="
          text-1
          white-b
          font-weight-bold
          d-flex
          justify-content-between
          mb-3
          mt-5
        "
      >
        <span> 5 อันดับรายการที่ใช้จ่ายเงิน<u>น้อย</u>ที่สุด</span>
        <img :src="drag" alt="" class="d-block d-lg-none"/>
      </div>
      <div
        class="overflow-auto drag-wrapper"
        v-dragscroll
        v-if="tasks.length > 0"
      >
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
                parseInt(
                  item.total
                    .toString()
                    .substring(0, item.total.toString().length - 3)
                ).toLocaleString()
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
      <div class="text-center py-5 text-2 white-b" v-else>ไม่พบข้อมูล</div>
    </template>
    <div>
      <p class="text-1 white-b my-5 font-weight-bold">
        ข้อมูลอื่นๆของจังของอบจ. {{ province }}
      </p>
      <b-row v-if="pao != null">
        <b-col sm="7">
          <div class="bg-lime-b p-3 w-fit">
            <p class="text-1 font-weight-bold m-0">รายได้ของอบจ.</p>
          </div>
          <div class="bg-black white-b p-3">
            <h3
              class="header-3 text-center font-weight-bold"
              v-if="total_income != 0"
            >
              {{
                parseInt(
                  total
                    .toString()
                    .substring(0, total_income.toString().length - 3)
                ).toLocaleString()
              }}
              ล้านบาท
            </h3>
            <div class="d-flex w-100" v-if="pao != null">
              <div
                v-if="pao.incomes.length > 0"
                v-for="(item, i) in pao.incomes"
                :key="'income-' + i"
                class="bg-white-a"
                :style="{
                  width: ((item.total / total) * 100).toFixed(1) + '%',
                  height: '50px',
                }"
                :class="{
                  'bg-white-a black': i == 0,
                  'bg-blue-a white-b': i == 1,
                  'bg-pink black': i == 2,
                }"
              >
                <span class="text-4 p-2"
                  >{{ ((item.total / total) * 100).toFixed() }}%</span
                >
              </div>
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
                      'bg-blue-a white-b': i == 1,
                      'bg-pink': i == 2,
                    }"
                    class="font-weight-bold text-center"
                  >
                    {{ item.type }}
                  </div>
                  <p class="my-1 white-b">
                    {{
                      parseInt(
                        item.total
                          .toString()
                          .substring(0, item.total.toString().length - 3)
                      ).toLocaleString()
                    }}
                    ล้านบาท
                  </p>
                </div>
              </div>
            </div>
            <div class="text-right">
              <template v-for="(item, i) in pao.incomes" v-if="isShow">
                <p
                  v-for="(item2, j) in item.categories"
                  :key="'extra-' + i + j"
                  class="white-b m-0"
                >
                  {{ item2.category }}
                  <span class="pink"
                    >{{ ((item2.total / total) * 100).toFixed(3) }}%</span
                  >
                </p></template
              >
              <p class="mb-0 mt-4 pink pointer" @click="showExtraIncomeDetails">
                {{ isShow ? "ย่อลง -" : "หมวดรายได้เพิ่มเติม +" }}
              </p>
            </div>
            <hr style="border-top: 1px solid #fff" />
            <b-row v-if="pao.population != null">
              <b-col sm="5">
                <p class="text-3 font-weight-bold mb-1">
                  <img :src="population_logo" alt="" /> จำนวนประชากร
                </p>
                <p class="text-3 mb-1">
                  {{ pao.population.toLocaleString() }} คน
                </p>
                <p class="text-4 m-0">
                  ข้อมูลจากกรมการปกครอง โดยไม่นับรวมประชากรแฝง
                </p>
              </b-col>
              <b-col sm="7">
                <!-- <p class="text-3 font-weight-bold mb-1">
                  <img :src="person_logo" alt="" /> งบประมาณเฉลี่ยต่อหัวเทียบกับ
                  76 จังหวัด
                </p>
                <div id="chart">
                  <apexchart
                  v-if="budgetPerCapita.length > 0"
                    type="scatter"
                    height="60"
                    :options="chartOptions"
                    :series="series"
                    :key="testKey"
                  ></apexchart>
                </div> -->
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="5">
          <div class="bg-lime-b p-3 w-fit">
            <p class="text-1 font-weight-bold m-0">ผู้บริหาร</p>
          </div>
          <template v-for="(item, i) in pao.chiefExecutives">
            <div class="bg-black white-b" :key="'pao-info-' + i">
              <b-row no-gutters>
                <b-col sm="8" class="p-3">
                  <p class="text-2 font-weight-bold lime">
                    {{ item.name }}
                  </p>
                  <p class="text-3 font-weight-bold m-0">ตำแหน่ง</p>
                  <p class="text-3">
                    นายกองค์การบริหารส่วนจังหวัดเ{{ province }}
                  </p>
                  <p class="text-3 font-weight-bold m-0">วันที่ดำรงตำแหน่ง</p>
                  <p class="text-3">{{ item.inOffice }}</p>
                </b-col>
                <b-col
                  sm="4"
                  class="
                    bg-lime
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  ><div
                    class="pao-img"
                    :style="{
                      backgroundImage: `url(${pao.chiefExecutives[0].photoUrl})`,
                    }"
                  ></div
                ></b-col>
              </b-row>

              <b-collapse :id="'collapse-pao-' + i" class="mt-2">
                <div class="bg-black p-3">
                  <p class="text-3 white-b">ข้อมูลบัญชีทรัพย์สิน</p>
                  <template
                    v-if="item.ownAccount != null && item.spouseAccount != null"
                  >
                  <div class="d-flex">
                    <p class="text-3 font-weight-bold">ยอดรวม</p>
                    <div class="d-flex mx-1">
                      <div class="work-type-square mx-2 bg-lime"></div>
                      <p class="text-3 font-weight-bold m-0">ผู้ยื่น</p>
                      <div class="work-type-square mx-2 bg-blue-a"></div>
                      <p class="text-3 font-weight-bold m-0">คู่สมรส</p>
                    </div>
                  </div>

                 
                    <div class="pao-acc-box">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมรายได้ต่อปี</p>
                        <p class="m-0">
                          {{
                            item.ownAccount.income +
                              item.spouseAccount.income ==
                            0
                              ? 0
                              : parseInt(
                                  (
                                    item.ownAccount.income +
                                    item.spouseAccount.income
                                  )
                                    .toString()
                                    .substring(
                                      0,
                                      (
                                        item.ownAccount.income +
                                        item.spouseAccount.income
                                      ).toString().length - 3
                                    )
                                ).toLocaleString()
                          }}
                          ล้านบาท
                        </p>
                      </div>
                      <div class="d-flex mt-3">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.income /
                                  (item.ownAccount.income +
                                    item.spouseAccount.income)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.income /
                                  (item.ownAccount.income +
                                    item.spouseAccount.income)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                    </div>
                    <div class="pao-acc-box bg-transparent">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมรายจ่ายต่อปี</p>
                        <p class="m-0">
                          {{
                            item.ownAccount.expense +
                              item.spouseAccount.expense ==
                            0
                              ? 0
                              : parseInt(
                                  (
                                    item.ownAccount.expense +
                                    item.spouseAccount.expense
                                  )
                                    .toString()
                                    .substring(
                                      0,
                                      (
                                        item.ownAccount.expense +
                                        item.spouseAccount.expense
                                      ).toString().length - 3
                                    )
                                ).toLocaleString()
                          }}
                          ล้านบาท
                        </p>
                      </div>
                      <div class="d-flex mt-3">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.expense /
                                  (item.ownAccount.expense +
                                    item.spouseAccount.expense)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.expense /
                                  (item.ownAccount.expense +
                                    item.spouseAccount.expense)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                    </div>
                    <div class="pao-acc-box">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">
                          การเสียภาษีเงินได้บุคคลธรรมดาในรอบปีภาษีที่ผ่านมา
                        </p>
                        <p class="m-0">
                          {{
                            item.ownAccount.taxed + item.spouseAccount.taxed ==
                            0
                              ? 0
                              : parseInt(
                                  (
                                    item.ownAccount.taxed +
                                    item.spouseAccount.taxed
                                  )
                                    .toString()
                                    .substring(
                                      0,
                                      (
                                        item.ownAccount.taxed +
                                        item.spouseAccount.taxed
                                      ).toString().length - 3
                                    )
                                ).toLocaleString()
                          }}
                          ล้านบาท
                        </p>
                      </div>
                      <div class="d-flex mt-3">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.taxed /
                                  (item.ownAccount.taxed +
                                    item.spouseAccount.taxed)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.taxed /
                                  (item.ownAccount.taxed +
                                    item.spouseAccount.taxed)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                    </div>
                    <div class="pao-acc-box bg-transparent">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมทรัพย์สินทั้งสิ้น</p>
                        <p class="m-0">
                          {{
                            item.ownAccount.asset + item.spouseAccount.asset ==
                            0
                              ? 0
                              : parseInt(
                                  (
                                    item.ownAccount.asset +
                                    item.spouseAccount.asset
                                  )
                                    .toString()
                                    .substring(
                                      0,
                                      (
                                        item.ownAccount.asset +
                                        item.spouseAccount.asset
                                      ).toString().length - 3
                                    )
                                ).toLocaleString()
                          }}
                          ล้านบาท
                        </p>
                      </div>
                      <div class="d-flex mt-3">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.asset /
                                  (item.ownAccount.asset +
                                    item.spouseAccount.asset)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.asset /
                                  (item.ownAccount.asset +
                                    item.spouseAccount.asset)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                    </div>
                    <div class="pao-acc-box">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมหนี้สินทั้งสิ้น</p>
                        <p class="m-0">
                          {{
                            item.ownAccount.debt + item.spouseAccount.debt == 0
                              ? 0
                              : parseInt(
                                  (
                                    item.ownAccount.debt +
                                    item.spouseAccount.debt
                                  )
                                    .toString()
                                    .substring(
                                      0,
                                      (
                                        item.ownAccount.debt +
                                        item.spouseAccount.debt
                                      ).toString().length - 3
                                    )
                                ).toLocaleString()
                          }}
                          ล้านบาท
                        </p>
                      </div>
                      <div class="d-flex mt-3">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.debt /
                                  (item.ownAccount.debt +
                                    item.spouseAccount.debt)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.debt /
                                  (item.ownAccount.debt +
                                    item.spouseAccount.debt)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                    </div>
                  </template>
                  <template v-else>   <p class="text-3 white-b text-center py-5">ไม่พบข้อมูลบัญชีทรัพย์สิน</p></template>
                  <div class="d-flex justify-content-between mt-5">
                    <a
                      :href="item.fillingUrl"
                      target="_blank"
                      class="pao-link"
                      rel="noopener noreferrer"
                      >ดูข้อมูลประวัติการยื่นบัญชีทรัพย์สิน
                      <img :src="arrow_link" class="ml-3" alt=""
                    /></a>
                    <a
                      href="https://ele.dla.go.th/public/appointment.do"
                      target="_blank"
                      class="pao-link"
                      rel="noopener noreferrer"
                      >สืบค้นเพิ่มเติมเกี่ยวกับ นายก อบจ.
                      <img :src="arrow_link" class="ml-3" alt=""
                    /></a>
                  </div>
                </div>
              </b-collapse>
              <b-button
                v-b-toggle="'collapse-pao-' + i"
                class="collapse-pao-btn"
              >
                <div
                  class="d-flex justify-content-between w-100 px-1 when-closed"
                >
                  <p class="m-0">ข้อมูลรายได้เพิ่มเติม</p>
                  <p class="m-0">+</p>
                </div>
                <div
                  class="d-flex justify-content-between w-100 px-1 when-opened"
                >
                  <p class="m-0">ย่อลง</p>
                  <p class="m-0">-</p>
                </div></b-button
              >
            </div>
          </template>
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
      total_income: 0,
      isShow: false,
      tasks: [],
      pao: [],
      budgetPerCapita: [],
      extraIncome: [],
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
      population_logo: require("~/assets/images/population_logo.svg"),
      person_logo: require("~/assets/images/person_logo.svg"),
      drag: require("~/assets/images/drag.svg"),
      logo: require("~/assets/images/logo.svg"),
      arrow_link: require("~/assets/images/arrow_link.svg"),
      series: [
        {
          name: "SAMPLE A",
          data: [],
        },
      ],
      chartOptions: {
        colors: ["#FFFFFF"],
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
        tooltip: {
          enabled: false,
        },
      },
    };
  },
  watch: {
    year: {
      handler(newValue, oldValue) {
        this.getDataForChart();
        this.getData(this.year, this.province);
      },
    },
    province: {
      handler(newValue, oldValue) {
        this.getDataForChart();
        this.getData(this.year, this.province);
      },
    },
  },
  mounted() {
    this.getData(this.year, this.province);
  },
  methods: {
    getData(y, p) {
      this.total_income = 0;

      fetch("data/" + y + "/pao-" + p + ".json")
        .then((response) => response.json())
        .then((data) => {
          this.tasks = data.tasks;
          this.total = data.total;
          this.pao = data.pao;
          this.pao.incomes.sort(function (a, b) {
            return b.total - a.total;
          });
          let total_income = this.pao.incomes.map((a) => a.total);
          total_income.forEach((element) => {
            this.total_income += element;
          });
        });
    },
    getDataForChart() {
      fetch("data/2565/nation-wide.json")
        .then((response) => response.json())
        .then((data) => {
          let result = data.budgetPerCapita;

          result.forEach((element) => {
            this.budgetPerCapita.push({
              x: parseInt(element.amount.toFixed()),
              y: 0,
              fillColor: "#FFFFFF",
            });
          });

          this.series[0].data = this.budgetPerCapita;
        });
    },
    showExtraIncomeDetails() {
      if (!this.isShow) this.isShow = true;
      else this.isShow = false;
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

.pink {
  color: #ff2581;
}

.pao-img {
  width: 146px;
  height: 146px;
  border: 2px solid #181f1c;
  border-radius: 50%;
  background-position: center;
}

.work-type-square {
  width: 15px;
  height: 15px;
}

.pao-acc-box {
  background: #262e2c;
  padding: 10px;
  margin-bottom: 10px;
}

.collapse-pao-btn {
  width: 100%;
  background: #181f1c;
  color: #a6bfff;
  border: none;
  padding: 10px;
}

.pao-link {
  color: #e5fbff;
  text-decoration: none;
}
</style>
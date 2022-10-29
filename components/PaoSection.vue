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
        <img :src="drag" alt="" class="drag-icon" />
      </div>
      <div
        class="overflow-auto drag-wrapper"
        v-dragscroll
        v-if="tasks.length > 0"
      >
        <div class="d-flex flex-nowrap task-wrapper">
          <div
            class="task-box mr-3"
            v-for="(item, i) in tasksDesc"
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
              <formatNumber :data="item.total" />
            </p>
            <p class="text-4 mb-1">
              {{ ((item.total / total) * 100).toFixed(2) }}%
              ของรายจ่ายทั้งหมด
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
        <img :src="drag" alt="" class="drag-icon" />
      </div>
      <div
        class="overflow-auto drag-wrapper"
        v-dragscroll
        v-if="tasks.length > 0"
      >
        <div class="d-flex flex-nowrap task-wrapper">
          <div
            class="task-box mr-3"
            v-for="(item, i) in tasksAsc"
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
              <formatNumber :data="item.total" />
            </p>
            <p class="text-4 mb-1">
              {{ ((item.total / total) * 100).toFixed(2) }}%
              ของรายจ่ายทั้งหมด
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
      </div>
      <div class="text-center py-5 text-2 white-b" v-else>ไม่พบข้อมูล</div>
    </template>
    <div>
      <p class="text-1 white-b my-5 font-weight-bold">
        ข้อมูลอื่น ๆ ของอบจ. {{ province }}
      </p>
      <b-row v-if="pao != null">
        <b-col lg="7">
          <div class="d-flex justify-content-between align-items-end">
            <div class="bg-lime-b p-3 w-fit">
              <p class="text-1 font-weight-bold m-0">รายได้ของอบจ.</p>
            </div>
            <div>
              <img :src="info" alt="" id="info" />
              <b-popover target="info" triggers="hover"  placement="topleft">
                <p class="text-3 m-0">
                   <b>รายได้ของ อบจ.</b> <br/>
แบ่งโดยแหล่งที่มาอย่างคร่าว ๆ ได้ดังนี้ <br/>
 <b>รายได้ที่จัดเก็บเอง</b> <br/>
 <ul class="m-0">
  <li>รายได้จากภาษีอากร เช่น ภาษียาสูบ น้ำมัน ก๊าซ ปิโตรเลียม</li>
  <li>รายได้ที่ไม่ใช่ภาษี เช่น ค่าธรรมเนียม ค่าปรับ ใบอนุญาต ฯลฯ </li>
 </ul>
 <b>รายได้จากภาษีที่รัฐบาลจัดเก็บแล้วจัดสรรให้</b>
รายได้จากภาษีที่รัฐบาลจัดเก็บแล้วจัดสรรให้ เช่น ภาษีรถยนต์ ค่าภาคหลวงแร่ ภาษีมูลค่าเพิ่ม ตาม พ.ร.บ. ฯลฯ <br/>
 <b>รายได้ที่รัฐบาลอุดหนุนให้</b><br/>
 <ul class="m-0">
  <li>เงินอุดหนุนทั่วไป</li>
  <li>เงินอุดหนุนเฉพาะกิจ</li>
 </ul>
                </p>
              </b-popover>
            </div>
          </div>
          <div class="bg-black white-b p-3" v-if="hasDataPao">
            <h3
              class="header-3 text-center font-weight-bold"
              v-if="total_income != 0"
            ><span class="font-weight-normal">ประมาณการรายได้</span><br class="d-inline d-sm-none">
              <template v-if="total != 0 && total != null">
                {{
                  total >= 1000000
                    ? parseInt(
                        total
                          .toFixed()
                          .toString()
                          .substring(
                            0,
                            total_income.toFixed().toString().length - 6
                          )
                      ).toLocaleString() + " ล้านบาท"
                    : parseInt(total.toString()).toLocaleString() + " บาท"
                }}
              </template>
              <template v-else> 0 บาท </template>
            </h3>
            <div class="d-flex w-100 overflow-hidden" v-if="pao != null">
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
                  'bg-pink white-b': i == 2,
                }"
              >
                <span class="text-4 p-1"
                  >{{ ((item.total / total) * 100).toFixed(2) }}%</span
                >
              </div>
            </div>
            <div>
              <div
                class="
                  d-flex
                  justify-content-between
                  flex-column flex-sm-row
                  my-3
                "
              >
                <div
                  v-for="(item, i) in pao.incomes"
                  :key="'income+' + i"
                  class="black"
                >
                  <div class="d-flex">
                    <div
                      :class="{
                        'bg-white-a': i == 0,
                        'bg-blue-a white-b': i == 1,
                        'bg-pink': i == 2,
                      }"
                      class="work-type-square"
                    ></div>
                    <p
                      class="
                        text-4
                        m-0
                        white-b
                        font-weight-bold
                        d-inline-block
                        ml-2
                      "
                    >
                      {{ item.type }}
                    </p>
                  </div>
                  <p class="my-1 white-b ml-4">
                    (<formatNumber :data="item.total" />)
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
                  <span
                    :class="{
                      'white-a': i == 0,
                      'blue-a': i == 1,
                      pink: i == 2,
                    }"
                    >{{ ((item2.total / total) * 100).toFixed(2) }}%</span
                  >
                </p></template
              >
              <p class="mb-0 mt-4 pink pointer" @click="showExtraIncomeDetails">
                {{ isShow ? "ย่อลง -" : "รายละเอียด +" }}
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
                  รวบรวมและคำนวณข้อมูล ณ ปี 2565
                </p>
              </b-col>
              <b-col sm="7">
                <p class="text-3 font-weight-bold mb-1 mt-3 mt-sm-0">
                  <img :src="person_logo" alt="" />
                  งบประมาณเฉลี่ยต่อหัวเทียบกับจังหวัดทั้งหมดที่มีการสำรวจในปีนั้น
                  ๆ 76 จังหวัด
                </p>
                <p class="m-0 lime" v-if="budget_province != 0">
                  {{ parseInt(budget_province).toLocaleString() }}
                  บาท/คน/ปี
                </p>
                <div style="height: 50px">
                  <canvas id="line-chart"></canvas>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="bg-black white-b p-5 text-center" v-else><p class="m-0 text-1 font-weight-bold">ไม่พบข้อมูล</p></div>
        </b-col>
        <b-col lg="5" class="mt-3 mt-lg-0">
          <div class="bg-lime-b p-3 w-fit">
            <p class="text-1 font-weight-bold m-0">ผู้บริหาร</p>
          </div>
          <template v-for="(item, i) in pao.chiefExecutives">
            <div class="bg-black white-b" :key="'pao-info-' + i">
              <b-row no-gutters>
                <b-col sm="7" class="p-3">
                  <p class="text-2 font-weight-bold lime">
                    {{ item.name }}
                  </p>
                  <p class="text-3 font-weight-bold m-0">ตำแหน่ง</p>
                  <p class="text-3">
                    นายกองค์การบริหารส่วนจังหวัด{{ province }}
                  </p>
                  <p class="text-3 font-weight-bold m-0">วันที่ดำรงตำแหน่ง</p>
                  <p class="text-3">{{ item.inOffice }}</p> 
                </b-col>
                <b-col
                  sm="5"
                  class="
                    bg-lime
                    d-flex
                    justify-content-center
                    align-items-center
                    p-3 p-sm-0
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
                  <template v-if="item.ownAccount != null">
                    <div class="d-flex">
                      <p class="text-3 font-weight-bold">ยอดรวม</p>
                      <div class="d-flex mx-1">
                        <div class="work-type-square mx-2 bg-lime"></div>
                        <p class="text-3 font-weight-bold m-0">ผู้ยื่น</p>
                        <div
                          class="work-type-square mx-2 bg-blue-a"
                          v-if="item.spouseAccount != null"
                        ></div>
                        <p
                          class="text-3 font-weight-bold m-0"
                          v-if="item.spouseAccount != null"
                        >
                          คู่สมรส
                        </p>
                      </div>
                    </div>

                    <div class="pao-acc-box">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมรายได้ต่อปี</p>
                        <p class="m-0">
                          <formatNumber :data="acc_data[2]" />
                        </p>
                      </div>
                      <div class="d-flex mt-3" id="popover-income">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.income /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          v-if="item.spouseAccount != null"
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.income /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                      <b-popover
                        target="popover-income"
                        triggers="hover"
                        placement="bottom"
                  custom-class="pao-popover-wrapper"
                      >
                        <p class="text-4 text-center font-weight-bold m-0">
                          รวมรายได้ต่อปี
                        </p>
                        <p class="text-3 text-center m-0">
                          <formatNumber :data="acc_data[2]" />
                        </p>
                        <hr class="my-2" style="border-color: #ec6440" />
                        <b-row style="width: 200px">
                          <b-col cols="5">
                            <p class="text-4 m-0">ผู้ยื่น</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.ownAccount.income"
                          /></b-col>
                        </b-row>
                        <b-row
                          style="width: 200px"
                          v-if="item.spouseAccount != null"
                        >
                          <b-col cols="5">
                            <p class="text-4 m-0">คู่สมรส</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.spouseAccount.income"
                          /></b-col>
                        </b-row>
                      </b-popover>
                    </div>
                    <div class="pao-acc-box bg-transparent">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมรายจ่ายต่อปี</p>
                        <p class="m-0">
                          <formatNumber :data="acc_data[3]" />
                        </p>
                      </div>
                      <div class="d-flex mt-3" id="popover-exp">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.expense /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          v-if="item.spouseAccount != null"
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.expense /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                      <b-popover
                        target="popover-exp"
                        triggers="hover"
                        placement="bottom"
                  custom-class="pao-popover-wrapper"
                      >
                        <p class="text-4 text-center font-weight-bold m-0">
                          รวมรายจ่ายต่อปี
                        </p>
                        <p class="text-3 text-center m-0">
                          <formatNumber :data="acc_data[3]" />
                        </p>
                        <hr class="my-2" style="border-color: #ec6440" />
                        <b-row style="width: 200px">
                          <b-col cols="5">
                            <p class="text-4 m-0">ผู้ยื่น</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.ownAccount.expense"
                          /></b-col>
                        </b-row>
                        <b-row
                          style="width: 200px"
                          v-if="item.spouseAccount != null"
                        >
                          <b-col cols="5">
                            <p class="text-4 m-0">คู่สมรส</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.spouseAccount.expense"
                          /></b-col>
                        </b-row>
                      </b-popover>
                    </div>
                    <div class="pao-acc-box">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">
                          การเสียภาษีเงินได้บุคคลธรรมดาในรอบปีภาษีที่ผ่านมา
                        </p>
                        <p class="m-0">
                          <formatNumber :data="acc_data[4]" />
                        </p>
                      </div>
                      <div class="d-flex mt-3" id="popover-tax">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.taxed /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          class="bg-blue-a"
                          v-if="item.spouseAccount != null"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.taxed /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                      <b-popover
                        target="popover-tax"
                        triggers="hover"
                        placement="bottom"
                  custom-class="pao-popover-wrapper"
                      >
                        <p class="text-4 text-center font-weight-bold m-0">
                          การเสียภาษาเงินได้บุคคลธรรมดาในรอบปีภาษีที่ผ่านมา
                        </p>
                        <p class="text-3 text-center m-0">
                          <formatNumber :data="acc_data[4]" />
                        </p>
                        <hr class="my-2" style="border-color: #ec6440" />
                        <b-row style="width: 200px">
                          <b-col cols="5">
                            <p class="text-4 m-0">ผู้ยื่น</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.ownAccount.taxed"
                          /></b-col>
                        </b-row>
                        <b-row v-if="item.spouseAccount != null">
                          <b-col cols="5">
                            <p class="text-4 m-0">คู่สมรส</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.spouseAccount.taxed"
                          /></b-col>
                        </b-row>
                      </b-popover>
                    </div>
                    <div class="pao-acc-box bg-transparent">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมทรัพย์สินทั้งสิ้น</p>
                        <p class="m-0">
                          <formatNumber :data="acc_data[0]" />
                        </p>
                      </div>
                      <div class="d-flex mt-3" id="popover-asset">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.asset /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          v-if="item.spouseAccount != null"
                          class="bg-blue-a"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.asset /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                      <b-popover
                        target="popover-asset"
                        triggers="hover"
                        placement="bottom"
                  custom-class="pao-popover-wrapper"
                      >
                        <p class="text-4 text-center font-weight-bold m-0">
                          รวมทรัพย์สินทั้งสิ้น
                        </p>
                        <p class="text-3 text-center m-0">
                          <formatNumber :data="acc_data[0]" />
                        </p>
                        <hr class="my-2" style="border-color: #ec6440" />
                        <b-row style="width: 200px">
                          <b-col cols="5">
                            <p class="text-4 m-0">ผู้ยื่น</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.ownAccount.asset"
                          /></b-col>
                        </b-row>
                        <b-row
                          style="width: 200px"
                          v-if="item.spouseAccount != null"
                        >
                          <b-col cols="5">
                            <p class="text-4 m-0">คู่สมรส</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.spouseAccount.asset"
                          /></b-col>
                        </b-row>
                      </b-popover>
                    </div>
                    <div class="pao-acc-box">
                      <div
                        class="d-flex white-b text-3 justify-content-between"
                      >
                        <p class="m-0">รวมหนี้สินทั้งสิ้น</p>
                        <p class="m-0">
                          <formatNumber :data="acc_data[1]" />
                        </p>
                      </div>
                      <div class="d-flex mt-3" id="popover-debt">
                        <div
                          class="bg-lime"
                          :style="{
                            width:
                              (
                                (item.ownAccount.debt / Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                        <div
                          class="bg-blue-a"
                          v-if="item.spouseAccount != null"
                          :style="{
                            width:
                              (
                                (item.spouseAccount.debt /
                                  Math.max(...acc_data)) *
                                100
                              ).toFixed() + '%',
                            height: '19px',
                          }"
                        ></div>
                      </div>
                      <b-popover
                        target="popover-debt"
                        triggers="hover"
                        placement="bottom"
                  custom-class="pao-popover-wrapper"
                      >
                        <p class="text-4 text-center font-weight-bold m-0">
                          รวมหนี้สินทั้งสิ้น
                        </p>
                        <p class="text-3 text-center m-0">
                          <formatNumber :data="acc_data[1]" />
                        </p>
                        <hr class="my-2" style="border-color: #ec6440" />
                        <b-row style="width: 200px">
                          <b-col cols="5">
                            <p class="text-4 m-0">ผู้ยื่น</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.ownAccount.debt"
                          /></b-col>
                        </b-row>
                        <b-row
                          style="width: 200px"
                          v-if="item.spouseAccount != null"
                        >
                          <b-col cols="5">
                            <p class="text-4 m-0">คู่สมรส</p></b-col
                          >
                          <b-col cols="7" class="text-right">
                            <formatNumber :data="item.spouseAccount.debt"
                          /></b-col>
                        </b-row>
                      </b-popover>
                    </div>
                  </template>
                  <template v-else>
                    <p class="text-3 white-b text-center py-5">
                      ไม่พบข้อมูลบัญชีทรัพย์สิน
                    </p></template
                  >
                  <div
                    class="
                      d-flex
                      flex-column flex-sm-row
                      justify-content-between
                      mt-5
                    "
                  >
                    <a
                      :href="item.fillingUrl"
                      target="_blank"
                      class="pao-link text-3"
                      rel="noopener noreferrer"
                      >ดูข้อมูลประวัติการยื่นบัญชีทรัพย์สิน
                      <img :src="arrow_link" class="ml-3" alt=""
                    /></a>
                    <a
                      :href="'https://www.google.com/search?q=' + item.name"
                      target="_blank"
                      class="pao-link text-3 mt-3 mt-sm-0"
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
                  class="d-flex justify-content-between w-100 px-1 when-closed font-weight-bold"
                >
                  <p class="m-0">ข้อมูลเพิ่มเติม</p>
                  <p class="m-0">+</p>
                </div>
                <div
                  class="d-flex justify-content-between w-100 px-1 when-opened font-weight-bold"
                >
                  <p class="m-0">ย่อลง</p>
                  <p class="m-0">-</p>
                </div></b-button
              >
            </div>
          </template>
          <div class="bg-black white-b p-5 text-center" v-if="!hasDataChief"><p class="m-0 text-1 font-weight-bold">ไม่พบข้อมูล</p></div>
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
            แผนงบประมาณของ<span class="lime-b">อบจ. {{ province }}</span>
            ประกอบด้วยโครงการอีกมากมายที่เกี่ยวข้องกับความเป็นอยู่ของพวกเรา
          </p>
          <p class="m-0">
            ทุกคนสามารถเข้าใช้เครื่องมือ ACT Ai
            เพื่อสืบค้นข้อมูลโครงการจัดซื้ดจัดจ้างภาครัฐ และตรวจสอบความโปร่งใส
            ของรายละเอียดโครงการ งบประมาณ และบริษัทชนะการประมูล
          </p>
        </div>
      </b-col>
      <b-col sm="2" class="bg-white-a red text-center">
        <a
          target="_blank"
          :href="pao.actAiUrl"
          class="text-2 mb-0 font-weight-bold mt-2 red pao-link-act"
        >
          <div class="p-3">
            <img :src="logo" alt="" class="mb-1" />
            <div>เข้าสู่เครื่องมือ <img :src="linkicon_red" alt="" /></div>
          </div>
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  props: {
    year: Number,
    province: String,
  },
  data() {
    return {
      line_chart: {},
      total: 0,
      testKey: 0,
      total_income: 0,
      budget_province: 0,
      isShow: false,
      hasDataPao: false,
      hasDataChief: false,
      tasks: [],
      tasksAsc: [],
      tasksDesc: [],
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
      linkicon_red: require("~/assets/images/linkicon_red.svg"),
      info: require("~/assets/images/info.svg"),
      series: [],
      bgcolor: [],
      data_result: [],
      chartOptions: {
        colors: [],
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
      acc_data: [],
    };
  },
  watch: {
    year: {
      handler(newValue, oldValue) {
        this.getData(this.year, this.province);
        //this.update();
      },
    },
    province: {
      handler(newValue, oldValue) {
        this.getData(this.year, this.province);
        this.update(newValue, oldValue);
      },
    },
    hasDataPao: {
      handler(newValue, oldValue) {
        if (newValue) {
          setTimeout(() => {
            this.chartConstructor();
          }, 1000);
        }
      },
    },
  },
  created() {
    this.getData(this.year, this.province);
    this.getDataForChart();
  },
  mounted() {
    setTimeout(() => {
      this.chartConstructor();
    }, 1000);
  },

  methods: {
    setDiffDate(date) {
      var startMomentObject = this.$moment(date.split(" - ")[0], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
      var startObject = startMomentObject.toDate();
      var endtMomentObject = this.$moment(date.split(" - ")[1], "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
      var endObject = endtMomentObject.toDate();

      var dateResult = this.$moment(endObject).diff(
        this.$moment(startObject),
        "years"
      );

      return dateResult + " ปี";
    },
    update(newp, oldp) {
      let newindex = this.data_result.findIndex((object) => {
        return object.name === newp;
      });

      let oldindex = this.data_result.findIndex((object) => {
        return object.name === oldp;
      });

      this.line_chart.data.datasets.map((dataset) => {
        dataset.backgroundColor[oldindex] = "rgba(255, 255, 255, 0.1)";
        dataset.backgroundColor[newindex] = "#E0FD6A";
      });

      this.line_chart.update();

      let budget_province = this.data_result.filter(
        (x) => x.name == this.province
      );

      if (budget_province.length > 0)
        this.budget_province = budget_province[0].amount.toFixed();
      else this.budget_province = 0;
    },
    chartConstructor(type, data, options) {
      const chart_element = document.getElementById("line-chart");

      if (chart_element != null) {
        this.line_chart = new Chart(chart_element, {
          type: "scatter",
          data: {
            datasets: [
              {
                label: "Scatter Dataset",
                data: this.series,
                backgroundColor: this.bgcolor,
                pointRadius: 5,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  display: false,
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    // Include a dollar sign in the ticks
                    fontColor: "white",
                    callback: function (value, index, ticks) {
                      return "฿" + parseInt(value).toLocaleString();
                    },
                  },
                },
              ],
            },
            tooltips: {
              enabled: false,
            },
          },
        });
      }
    },
    getData(y, p) {
      this.total_income = 0;
      this.acc_data = [];

      fetch("data/" + y + "/pao-" + p + ".json")
        .then((response) => response.json())
        .then((data) => {
          this.tasks = data.tasks;
          this.total = data.total;
          this.pao = data.pao;
          this.pao.incomes.sort(function (a, b) {
            return b.total - a.total;
          });

          if (this.pao.incomes.length > 0) this.hasDataPao = true;
          else this.hasDataPao = false;
          if (this.pao.chiefExecutives.length > 0) this.hasDataChief = true;
          else this.hasDataChief = false;

          let total_income = this.pao.incomes.map((a) => a.total);
          total_income.forEach((element) => {
            this.total_income += element;
          });
          this.tasksAsc = this.tasks
            .sort(function (a, b) {
              return a.total - b.total;
            })
            .slice(0, 5);
          this.tasksDesc = this.tasks
            .sort(function (a, b) {
              return b.total - a.total;
            })
            .slice(0, 5);

          if (this.pao.chiefExecutives.length > 0) {
            //console.log(this.pao.chiefExecutives[0].ownAccount);
            if (this.pao.chiefExecutives[0].ownAccount != null) {
              for (const property in this.pao.chiefExecutives[0].ownAccount) {
                this.acc_data.push(
                  this.pao.chiefExecutives[0].ownAccount[property]
                );
              }
            }
          }

          if (this.pao.chiefExecutives[0].spouseAccount != null) {
            Object.entries(this.pao.chiefExecutives[0].spouseAccount).forEach(
              ([key, value], index) => {
                this.acc_data[index] += value;
              }
            );
          }
        });
    },
    getDataForChart() {
      fetch("data/2565/nation-wide.json")
        .then((response) => response.json())
        .then((data) => {
          this.data_result = data.budgetPerCapita;

          this.data_result.forEach((element) => {
            this.budgetPerCapita.push({
              x: element.amount,
              y: 0,
            });

            this.bgcolor.push("rgba(255, 255, 255, 0.1)");
          });

          let budget_province = this.data_result.filter(
            (x) => x.name == this.province
          );

          if (budget_province.length > 0)
            this.budget_province = budget_province[0].amount.toFixed();
          else this.budget_province = 0;

          let a = this.data_result.findIndex((object) => {
            return object.name === this.province;
          });

          this.bgcolor[a] = "#E0FD6A";
          this.series = this.budgetPerCapita;
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
  background-repeat: no-repeat;
  background-size: 100%;
  // @media #{$mq-mini-mobile} {
  //   width: 96px;
  //   height: 96px;
  // }
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

.pao-link-act {
  color: #ed1c24;
  text-decoration: none;
}
.drag-icon {
  display: none;
  @media only screen and (max-width: 1440px) {
    display: block;
  }
}

.border-grey {
  border-right: 1px solid #bfc1c0;
  padding-right: 5px;
}

#info {
  @media #{$mq-mini-mobile} {
    width: 20px;
  }
}
</style>
<template>
  <div>
    <!-- <Header /> -->
    <div class="bg-blue-a white-a">
      <div class="p-4">
        <p class="text-1 m-0">
          ในปี
          <b-form-select
            v-model="selected"
            :options="options"
            class="year-select text-2 white-a font-weight-bold"
            @change="getNationWideData"
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
            <h1 class="header-1">
              {{
                parseInt(
                  total_nationwide.toString().substring(0, 5)
                ).toLocaleString()
              }}
              ล้านบาท
            </h1>
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
                  <p class="text-3 mr-1">
                    {{ ((item.total / total_nationwide) * 100).toFixed(1) }}%
                  </p>
                  <p class="text-3 font-weight-bold">{{ item.name }}</p>
                </div>
              </div>

              <div class="d-flex w-100">
                <template class="d-flex mx-1" v-for="(item2, i) in work_type">
                  <div
                    v-for="(item3, j) in item2.plans"
                    :style="{
                      maxWidth:
                        ((item3.total / total_nationwide) * 100).toFixed(1) +
                        '%',
                    }"
                    class="w-100"
                    :key="'type-' + i + j"
                  >
                    <div
                      @click="selectWorkPlan(item3.plan)"
                      class="work-type-square big w-100 mr-2"
                      :style="{
                        backgroundColor: item2.color,
                      }"
                      :key="j"
                    >
                      <h5 class="header-5 mr-1" v-if="j == 0">
                        {{
                          ((item3.total / total_nationwide) * 100).toFixed(1)
                        }}%
                      </h5>
                    </div>
                  </div>
                </template>
              </div>

              <p class="text-3 text-center mt-5">
                รายละเอียด
                {{ total_work_type }}
                แผน
              </p>

              <div v-if="groupedByAreaSlide.length > 0">
                <VueSlickCarousel
                  v-bind="slickOptions"
                  class="work-card-wrapper"
                  ref="workplan"
                >
                  <div
                    class="work-card"
                    v-for="(item, i) in groupedByAreaSlide"
                    :key="'slide-' + i"
                    :style="{
                      backgroundColor: item.color,
                    }"
                  >
                    <b-row>
                      <b-col cols="8">
                        <p class="text-1 font-weight-bold">
                          {{ item.plan }}
                        </p>
                        <h4 class="header-4">
                          {{
                            parseInt(
                              item.total.toString().substring(0, 4)
                            ).toLocaleString()
                          }}
                          ล้านบาท ({{
                            ((item.total / total_nationwide) * 100).toFixed(1)
                          }}%)
                        </h4>
                        <p class="text-3 m-0">
                          {{ work_type_desc[i].desc }}
                        </p>
                      </b-col>
                      <b-col cols="4"
                        ><img
                          width="100%"
                          :src="
                            require(`@/assets/images/work_type_${i + 1}.svg`)
                          "
                          alt=""
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
                  v-for="(item, i) in groupedByType"
                  :key="i"
                >
                  <div
                    class="work-type-square mr-2"
                    :style="{ backgroundColor: item.color }"
                  ></div>
                  <p class="text-3 mr-1">
                    {{ ((item.total / total_nationwide) * 100).toFixed(1) }}%
                  </p>
                  <p class="text-3 font-weight-bold">{{ item.type }}</p>
                </div>
              </div>

              <div class="d-flex w-100">
                <div
                  v-for="(item3, j) in groupedByType"
                  :style="{
                    maxWidth:
                      ((item3.total / total_nationwide) * 100).toFixed(1) + '%',
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
                      {{ ((item3.total / total_nationwide) * 100).toFixed(1) }}%
                    </h5>
                  </div>
                </div>
              </div>

              <p class="text-3 text-center mt-5">
                รายละเอียด
                {{ groupedByType.length }}
                แผน
              </p>

              <div>
                <VueSlickCarousel
                  v-bind="slickOptions"
                  class="work-card-wrapper"
                  ref="worktype"
                  v-if="groupedByType.length > 0"
                >
                  <div
                    class="work-card"
                    v-for="(item, i) in groupedByType"
                    :key="'slide-' + i"
                    :style="{
                      backgroundColor: item.color,
                    }"
                  >
                    <b-row>
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
                          ล้านบาท ({{
                            ((item.total / total_nationwide) * 100).toFixed(1)
                          }}%)
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
                </VueSlickCarousel>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div class="bg-blue-a white-a">
      <div class="px-4 py-5">
        <h4 class="header-4 font-weight-bold">
          ลองมาส่องงบจังหวัดที่คุณสนใจกันดีกว่า
        </h4>
        <p class="text-1 mt-2">
          ปี
          <b-form-select
            v-model="selected_year_province"
            :options="options"
            class="year-select text-2 white-a font-weight-bold"
          ></b-form-select>
          อบจ.
          <b-form-select
            v-model="selected_province"
            :options="provinces"
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
            title-item-class="tab-header"
            active
          >
            <template v-if="selected_province != ''">
              <ProvinceData
                :year="selected_year_province"
                :province="selected_province"
              />
            </template>
          </b-tab>
          <b-tab
            title="สำรวจผ่านคำสำคัญ"
            title-item-class="tab-header"
            :disabled="selected_province == ''"
          >
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
                <b-col sm="4" class="mb-3">
                  <template v-for="(item, i) in keyword.slice(0, 3)">
                    <div class="mb-3" :key="i">
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
                        v-b-toggle="'collapse-set-1-' + (i + 1)"
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
                      <b-collapse :id="'collapse-set-1-' + (i + 1)">
                        <b-card>
                          <b-row>
                            <b-col
                              cols="4"
                              v-for="(item2, j) in item.list"
                              :key="'kw-' + j"
                              ><div
                                class="
                                  test3
                                  text-3
                                  white-b
                                  p-2
                                  text-center
                                  mb-3
                                "
                                @click="showKeywordResult(item2)"
                              >
                                {{ item2 }}
                              </div></b-col
                            >
                          </b-row>
                        </b-card>
                      </b-collapse>
                    </div>
                  </template>
                </b-col>
                <b-col sm="4" class="mb-3">
                  <template v-for="(item, i) in keyword.slice(3, 5)">
                    <div class="mb-3" :key="i">
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
                        v-b-toggle="'collapse-set-2-' + (i + 1)"
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
                      <b-collapse :id="'collapse-set-2-' + (i + 1)">
                        <b-card>
                          <b-row>
                            <b-col
                              cols="4"
                              v-for="(item2, j) in item.list"
                              :key="'kw-' + j"
                              ><div
                                class="
                                  test3
                                  text-3
                                  white-b
                                  p-2
                                  text-center
                                  mb-3
                                "
                                @click="showKeywordResult(item2)"
                              >
                                {{ item2 }}
                              </div></b-col
                            >
                          </b-row>
                        </b-card>
                      </b-collapse>
                    </div>
                  </template>
                </b-col>
                <b-col sm="4" class="mb-3">
                  <template v-for="(item, i) in keyword.slice(5, 7)">
                    <div class="mb-3" :key="i">
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
                        v-b-toggle="'collapse-set-3-' + (i + 1)"
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
                      <b-collapse :id="'collapse-set-3-' + (i + 1)">
                        <b-card>
                          <b-row>
                            <b-col
                              cols="4"
                              v-for="(item2, j) in item.list"
                              :key="'kw-' + j"
                              ><div
                                class="
                                  test3
                                  text-3
                                  white-b
                                  p-2
                                  text-center
                                  mb-3
                                "
                                @click="showKeywordResult(item2)"
                              >
                                {{ item2 }}
                              </div></b-col
                            >
                          </b-row>
                        </b-card>
                      </b-collapse>
                    </div>
                  </template>
                </b-col>
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
                href="https://docs.google.com/spreadsheets/d/1hyNpUsSRriL0XhP89HtEO9S0uU2IOQz33cvxT5GwIeU/edit#gid=0"
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
    <template v-if="selected_province != ''">
      <div class="bg-blue-a p-4">
        <PaoSection
          :year="selected_year_province"
          :province="selected_province"
        />
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
          <p class="text-1 font-weight-bold">
            หลังตรวจสอบแล้ว…เราทำอะไรได้บ้าง?
          </p>

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
          <p>
            และติดตามสรุปการรายงานเหตุสงสัยการทุจริต ได้ที่ Corruption Watch
          </p>
        </div>
      </div>
      <div
        class="
          h-100vh
          choose-wrapper
          d-flex
          flex-column
          justify-content-between
        "
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
    </template>
    <b-modal
      id="kw-modal"
      ref="kw-modal"
      title="BootstrapVue"
      hide-header
      hide-footer
      size="xl"
      centered
    >
      <div class="bg-black p-4">
        <template v-if="keywordSlide.length > 0">
          <div class="text-center white-b text-2 mb-5">
            จากงบประมาณ <span class="lime">อบจ.{{ selected_province }}</span>
            ทั้งหมด
            {{
              parseInt(
                total_province.toString().substring(0, 4)
              ).toLocaleString()
            }}
            ล้านบาท พบคำว่า
            <div class="selected_keyword">{{ selected_keyword }}</div>
            ปรากฏใน {{ keywordSlide.length }} รายการงบ
          </div>
          <KeywordSlide :data="keywordSlide" :total="total_province" />
        </template>
        <template v-else>
          <div class="text-center">
            <div class="d-flex justify-content-center align-items-center mb-3">
              <p class="text-2 white-b m-0">ไม่ปรากฏคำว่า</p>
              <div class="selected_keyword ml-3">{{ selected_keyword }}</div>
            </div>
            <p class="text-2 white-b">
              ในรายงานข้อบัญญัติงบประมาณรายจ่ายของ อบจ. จังหวัดเชียงใหม่ ในปี
              2565
            </p>
          </div>
        </template>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 2565,
      selected_year_province: 2565,
      selected_province: "",
      selected_keyword: "",
      total_nationwide: 0,
      total_work_type: 0,
      total_province: 0,
      options: [],
      provinces: [],
      groupedByArea: [],
      groupedByType: [],
      groupedByAreaSlide: [],
      keywordSlide: [],
      tasks: [],
      work_type: [
        { name: "ด้านบริหารทั่วไป", color: "#F2A8EE", total: 0, plans: [] },
        { name: "ด้านบริการชุมชน", color: "#89E26A", total: 0, plans: [] },
        { name: "ด้านเศรษฐกิจ", color: "#FF8540", total: 0, plans: [] },
        { name: "ด้านการดำเนินงานอื่น", color: "#4A4E5E", total: 0, plans: [] },
      ],
      keyword: [
        {
          text: "โครงสร้างพื้นฐาน/สิ่งอำนวยความสะดวก",
          bg: "~/assets/images/keywordgroup_1.svg",
          list: [
            "การจราจร",
            "สนาม",
            "สะพาน",
            "ถนน",
            "เสาไฟฟ้า",
            "ระบบประปา",
            "ท่อระบายน้ำ",
            "ฝายน้ำ",
            "ลำห้วย",
          ],
        },
        {
          text: "บุคลากร/กลุ่มคน",
          bg: "./assets/images/keywordgroup_4.svg",
          list: [
            "เทศกิจ",
            "นักเรียน",
            "ครู",
            "อาสาสมัครสาธารณสุขประจําหมู่บ้าน",
            "ปศุสัตว์",
            "พยาบาลชุมชน",
            "คนพิการ",
            "ผู้สูงอายุ",
            "ประมง",
            "เกษตรกร",
            "นักกีฬา",
            "ผู้ด้อยโอกาส",
          ],
        },
        {
          text: "ค่าใช้จ่ายอื่น ๆ",
          bg: "./assets/images/keywordgroup_7.svg",
          list: [
            "เงินเดือน",
            "เงินเพิ่มพิเศษ",
            "ค่าตอบแทนพนักงานจ้าง",
            "OT",
            "ชำระหนี้",
            "ทุนสำรอง",
            "สมทบประกันสังคม",
            "บำรุุงสมาคม",
            "กองทุนบำเหน็จบำนาญ",
            "กองทุนสำรองเลี้ยงชีพ",
            "สงเคราะห์ผู้ป่วยยากไร้",
            "เงินช่วยพิเศษ",
          ],
        },
        {
          text: "วัสดุ/อุปกรณ์",
          bg: "./assets/images/keywordgroup_2.svg",
          list: [
            "บำรุงสำนักงาน",
            "อุปกรณ์สำนักงาน",
            "เครื่องดับเพลิง",
            "ครุภัณฑ์การแพทย์",
            "เครื่องออกกำลังกาย",
            "อุปกรณ์การเรียน",
            "อุปกรณ์กีฬา",
            "เครื่องมือการช่าง",
          ],
        },
        {
          text: "สถานที่",
          bg: "./assets/images/keywordgroup_5.svg",
          list: [
            "โรงเรียน",
            "โรงพยาบาล",
            "ศูนย์บริการสาธารณสุข",
            "สวนสาธารณะ",
            "สนามเด็กเล่น",
            "ป่า",
            "โรงรับจำนำ",
            "ตลาด",
            "โรงฆ่าสัตว์",
            "สถานีขนส่ง",
            "ท่าเรือ",
          ],
        },
        {
          text: "กิจกรรม",
          bg: "./assets/images/keywordgroup_3.svg",
          list: [
            "กิจกรรมโครงการภายใน อบจ.",
            "พิธีการวันสำคัญ",
            "โครงการฝีกอบรมต่าง ๆ",
            "ทุนการศึกษา",
            "กิจกรรมส่งเสริมการศึกษา",
            "โฆษณาประชาสัมพันธ์",
            "แข่งขันกีฬา",
            "นันทนาการ",
            "พิธีการทางศาสนา",
            "ส่งเสริมการท่องเที่ยว",
            "เทศกาล",
            "ศิลปะ",
            "พระราชพิธี",
            "ประเพณี",
            "อนุรักษ์ธรรมชาติ",
          ],
        },
        {
          text: "สวัสดิการ/คุณภาพชีวิต",
          bg: "./assets/images/keywordgroup_6.svg",
          list: [
            "ป้องกันสาธารณภัย",
            "ป้องกันและควบคุมโรค",
            "กิจกรรมพัฒนาคุณภาพชีวิต",
            "กำจัดขยะ",
            "บำบัดน้ำเสีย",
            "กิจกรรมส่งเสริมอาชีพ",
            "ป้องกันยาเสพติด",
            "ปรับปรุงภูมิทัศน์",
            "ป้องกันมลพิษ",
          ],
        },
      ],
      work_type_1: require("~/assets/images/work_type_1.svg"),
      corruption_watch: require("~/assets/images/corruption_watch.png"),
      project_card_sample: require("~/assets/images/project_card_sample.svg"),
      trophy_desktop: require("~/assets/images/trophy_desktop.svg"),
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

      work_type_desc: [
        {
          title: "แผนงานบริหารงานทั่วไป",
          desc: "งบประมาณที่เกี่ยวข้องกับการบริหารจัดการทั่วไป ภายในองค์กรของ อบจ. เช่น เงินเดือนพนักงาน เงินสำหรับใช้จ่ายสิ่งวัสดุอุปกรณ์ต่าง ๆ ขององค์กร เงินจัดกิจกรรมเพื่อพัฒนาศักยภาพภายในองค์กร เป็นต้น",
        },
        {
          title: "แผนงานการรักษาความสงบภายใน",
          desc: "งบประมาณที่เกี่ยวข้องกับการป้องกันสาธารณภัย",
        },
        {
          title: "แผนงานการศึกษา",
          desc: "งบประมาณที่เกี่ยวข้องกับการศึกษา ทั้งส่วนที่เกี่ยวข้องกับครู นักเรียน บุคลากรในสถานศึกษา โรงเรียนตั้งแต่ชั้นอนุบาลถึงมัธยม ไปจนถึงกิจกรรมพัฒนาทักษะและศักยภาพต่าง ๆ ของทั้งครูและนักเรียน",
        },
        {
          title: "แผนงานสาธารณสุข",
          desc: "งบประมาณที่เกี่ยวข้องกับด้านสาธารณสุขทั้งหมด ส่วนใหญ่เป็นภารกิจของโรงพยาบาล และศูนย์ส่งเสริมสุขภาพ ไม่ว่าจะเป็นเรื่อง ป้องกันโรคระบาด หรือ บำบัดปัญหายาเสพติด",
        },
        {
          title: "แผนงานสังคมสงเคราะห์",
          desc: "งบประมาณที่เกี่ยวข้องกับภารกิจให้ความช่วยเหลือ เด็กนักเรียนด้อยโอกาส คนพิการ หรือ กลุ่มผู้สูงอายุ",
        },
        {
          title: "แผนงานเคหะและชุมชน",
          desc: "งบประมาณที่เกี่ยวข้องกับงานด้านวิศวกรรม โครงสร้างพื้นฐาน เสาไฟฟ้า รวมไปถึงการบริหารจัดการสวนสาธารณะ และการจัดเก็บขยะ",
        },
        {
          title: "แผนงานสร้างความเข้มแข็งของชุมชน",
          desc: "งบประมาณที่เกี่ยวข้องกับเรื่องทั่วไปซึ่งเกี่ยวข้อง กับคุณภาพชีวิตโดยภาพรวมของคนในจังหวัด เช่น การส่งเสริมด้านอาชีพ การให้ความรู้เกี่ยวกับอาชีพ ไปจนถึงการพัฒนาคุณภาพชีวิตของผู้ด้อยโอกาส คนพิการ ผู้สูงอายุ ฯลฯ",
        },
        {
          title: "แผนงานการศาสนา วัฒนธรรมและนันทนาการ",
          desc: "งบประมาณที่สนับสนุนให้ กีฬา นันทนาการ พิธีการต่าง ๆ พระราชพิธี วันสำคัญทางศาสนา รวมไปถึงการท่องเที่ยว ฯลฯ",
        },
        {
          title: "แผนงานอุตสาหกรรมและการโยธา",
          desc: "งบประมาณที่ใช้จ่ายหลัก ๆ ไปกับงานด้านผังเมือง การสร้าง บูรณะ ถนนและพื้นผิวจราจร",
        },
        {
          title: "แผนงานการเกษตร",
          desc: "งบประมาณที่เกี่ยวข้องกับกิจกรรม ซึ่งเกี่ยวกับ การเกษตร เกษตรกร รวมถึงการอนุรักษ์และฟื้นฟูทรัพยากร ทางธรรมชาติ",
        },
        {
          title: "แผนงานการพาณิชย์",
          desc: "งบประมาณที่เกี่ยวข้องกับโรงรับจำนำ การประปา ตลาดสด โรงฆ่าสัตว์ รวมถึงทรัพยากรทางทะเล ซึ่งเป็นแผนงานที่ไม่ได้ปรากฏ อยู่ในบทบัญญัติรายจ่ายของทุกจังหวัด",
        },
        {
          title: "แผนงานงบกลาง",
          desc: "งบประมาณที่เกี่ยวข้องกับรายการอื่น ๆ นอกเหนือจากภาระหน้าที่หลัก เช่น ชำระหนี้ สมทบประกันสังคม เข้ากองทุน เงินบำเหน็จบำนาญ เงินสำรองจ่าย หรือ เงินช่วยเหลือพิเศษ ฯลฯ",
        },
        {
          title: "แผนงานงบกลาง",
          desc: "งบประมาณที่เกี่ยวข้องกับรายการอื่น ๆ นอกเหนือจากภาระหน้าที่หลัก เช่น ชำระหนี้ สมทบประกันสังคม เข้ากองทุน เงินบำเหน็จบำนาญ เงินสำรองจ่าย หรือ เงินช่วยเหลือพิเศษ ฯลฯ",
        },
      ],
    };
  },
  created() {
    this.setYearAndProvince();
    this.getNationWideData(2565);
    this.getProvinceData();
  },
  methods: {
    setYearAndProvince() {
      fetch("/data/metadata.json")
        .then((response) => response.json())
        .then((data) => {
          data.years.forEach((element) => {
            this.options.push({ value: element, text: element });
          });

          this.provinces.push({ value: "", text: "เลือกจังหวัด" });

          data.provinces.forEach((element) => {
            this.provinces.push({ value: element, text: element });
          });
        });
    },
    getNationWideData(year) {
      this.groupedByAreaSlide = [];
      this.total_work_type = 0;

      fetch("/data/" + year + "/nation-wide.json")
        .then((response) => response.json())
        .then((data) => {
          this.total_nationwide = data.total;
          this.groupedByArea = data.groupedByArea;
          this.groupedByType = data.groupedByType;

          let result = this.groupedByArea.map((a) => a.plans);

          this.work_type.forEach((element, i) => {
            this.work_type[i].plans = result[i];
            this.work_type[i].total = this.groupedByArea[i].total;
          });

          this.work_type.map((x, i, ref) => {
            x.plans.map((y) => {
              y.color = x.color;
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
    getProvinceData() {
      fetch("/data/2565/pao-กระบี่.json")
        .then((response) => response.json())
        .then((data) => {
          this.tasks = data.tasks;
          this.total_province = data.total;
        });
    },
    showKeywordResult(text) {
      this.keywordSlide = [];
      this.selected_keyword = text;

      fetch("/data/keywords.json")
        .then((response) => response.json())
        .then((data) => {
          let a = Object.entries(data);
          let b = a.filter((x) => x[0] == text);
          b[0][1].forEach((element) => {
            let c = this.tasks.filter(
              (x) =>
                x.plan == element.plan &&
                x.task == element.task &&
                x.type == element.type
            );

            if (c.length > 0) {
              c.forEach((element, i) => {
                this.keywordSlide.push(element);
              });
            }
          });
        });

      console.log(this.keywordSlide);
      this.$refs["kw-modal"].show();
    },
    selectWorkPlan(index) {
      const i = this.groupedByAreaSlide.map((e) => e.plan).indexOf(index);
      this.$refs.workplan.goTo(i);
    },
    selectWorkType(index) {
      const i = this.groupedByType.map((e) => e.type).indexOf(index);
      this.$refs.worktype.goTo(i);
    },
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

select::-ms-expand {
  display: none;
}

.year-select {
  -webkit-appearance: none;
  /*webkit browsers */
  -moz-appearance: none;
  /*Firefox */
  appearance: none;
  background: transparent;
  width: 150px;
  border: 1px solid #e5fbff;
  border-radius: 0;
  margin: 0 10px;
}

.year-select option {
  background: #e0fd6a;
  color: #181f1c !important;
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

.tab-desc {
  position: absolute;
  left: 30%;
  top: 10px;
}

.work-type-square {
  width: 15px;
  height: 15px;
  overflow: hidden;
}

.work-card-wrapper {
  max-width: 600px;
  margin: auto;
}

.work-card {
  box-shadow: 1px 1px 12px 2px rgba(24, 31, 28, 0.15);
  padding: 25px;
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

.test2 {
  height: 175px;
  background-size: cover;
  background-repeat: no-repeat;
}

.keyword-collapse {
  border: 0;
  border-radius: 0;
}

.test3 {
  border: 1px solid #fffef5;
}

.big {
  height: 200px;
  border: 4px solid #ffffff;
  cursor: pointer;
  padding: 12px;
}

.big:hover {
  border: 4px solid #000000;
}

.selected_keyword {
  background: #fffef5;
  padding: 10px 15px;
  color: #0056a6;
  width: fit-content;
  display: inline-block;
}
</style>
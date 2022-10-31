<template>
  <div>
    <Header />
    <div class="wrapper bg-blue-a min-h-screen">
      <div class="content-box black mb-sm-5">
        <div class="head">
          <h3 class="header-3 m-0 font-weight-bold">สรุปภาพรวมงบ อบจ.</h3>
        </div>
        <div class="content bg-black white-a text-1 text-center text-sm-left">
          <p>
            สำหรับการจัดสรรงบประมาณขององค์การบริหารส่วนจังหวัด (อบจ.) ประชาชนอย่างเราอาจจะมีส่วนร่วมในขั้นตอนก่อนการจัดสรรงบประมาณได้ไม่เต็มที่นัก แต่เรายังสามารถ<span class="lime font-weight-bold"
              >มีบทบาทในการติดตาม ตรวจสอบ การใช้จ่ายงบประมาณของแต่ละจังหวัด</span
            >ให้เป็นไปอย่างสมเหตุสมผล และมีประสิทธิภาพ
          </p>

          <b-row class="align-items-center">
            <b-col sm="2" class="text-center text-sm-left mb-3"
              ><img :src="box_light" alt="" width="70"
            /></b-col>
            <b-col sm="10"
              ><p class="text-1 m-0">
                โปรเจกต์นี้เป็นหนึ่งในเครื่องมือที่จะช่วยให้การ<span
                  class=""
                  >ตรวจสอบ</span
                >การใช้งบประมาณของแต่ละ อบจ. ง่ายขึ้น
              </p></b-col
            >
          </b-row>

          <b-row class="align-items-center mt-3">
            <b-col sm="2" class="text-center text-sm-left mb-3"
              ><img :src="logo" alt="" width="70"
            /></b-col>
            <b-col sm="10"
              ><p class="text-1 m-0">
                ควบคู่ไปกับการใช้ ACT Ai ที่จะ<span class="">ติดตาม</span
                >กระบวนการใช้จ่ายงบประมาณ ตั้งแต่ขั้นตอนการของบประมาณ ไปจนถึงขั้นตอนการจัดซื้อจัดจ้าง ทั้งหมดนี้เพื่อช่วยให้กระบวนการงบประมาณของ อบจ. เป็นไปอย่างโปร่งใสมากยิ่งขึ้น
              </p></b-col
            >
          </b-row>
        </div>
      </div>

      <div class="share-box text-center white-a py-5">
        <p class="header-4">
          แชร์เพื่อชวนเพื่อน ๆ มาช่วยกันตรวจสอบงบ อบจ.
          และทำให้งบบ้านเราเป็นเรื่องที่ทุกคนตรวจสอบได้…
        </p>

        <div class="d-flex justify-content-center py-sm-5">

          <ShareNetwork
            network="facebook"
            title=""
            url="http://localbudgeting.actai.co/"
            class="share-btn pointer text-1 mx-2"
          >
            <img :src="facebook" alt="facebook" />
          </ShareNetwork>

          <ShareNetwork
            network="twitter"
            title=""
            url="http://localbudgeting.actai.co/"
            class="share-btn pointer text-1 mx-2"
          >
            <img :src="twitter" alt="twitter" />
          </ShareNetwork>
          <ShareNetwork
            network="line"
            title=""
            url="http://localbudgeting.actai.co/"
            class="share-btn pointer text-1 mx-2"
          >
            <img :src="line" alt="line" />
          </ShareNetwork>
        </div>
      </div>

      <div class="py-5 credit-box white-a">
        <p class="header-5">ขอบคุณข้อมูลจาก</p>
        <ul>
          <li>
            รศ.ดร.วีระศักดิ์ เครือเทพ อาจารย์ประจำภาควิชารัฐประศาสนศาสตร์
            คณะรัฐศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </li>
          <li>สถาบันพระปกเกล้า</li>
          <li>กรมส่งเสริมการปกครองท้องถิ่น กระทรวงมหาดไทย</li>
          <li>
            สำนักงานคณะกรรมการป้องกันและปราบปรามการทุจริตแห่งชาติ (สำนักงาน
            ป.ป.ช.)
          </li>
          <li>องค์การบริหารส่วนจังหวัด 76 แห่ง</li>
          <li>สำนักบริหารการทะเบียน กรมการปกครอง</li>
          <li>
            ดร.มานะ นิมิตรมงคล เลขาธิการองค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)
          </li>
          <li>
            <a
              href="https://www.gov.uk/"
              target="_blank"
              rel="noopener noreferrer"
              >https://www.gov.uk/</a
            >
          </li>
          <li>
            <a
              href="https://transparencia.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              >https://transparencia.gov.br</a
            >
          </li>
          <li>
            <a
              href="https://www.usaspending.gov/"
              target="_blank"
              rel="noopener noreferrer"
              >https://www.usaspending.gov/</a
            >
          </li>
        </ul>
      </div>

      <NuxtLink class="box text-3" to="/">
        <div class="header-box mb-5">
          <div class="content bg-white">
            <p class="text-1 font-weight-bold m-0 blue-a">กลับหน้าหลัก</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSocialSharing from "vue-social-sharing";
Vue.use(VueSocialSharing);

export default {
  data() {
    return {
      box_light: require("~/assets/images/box_light.svg"),
      logo: require("~/assets/images/logo.svg"),
      facebook: require("~/assets/images/facebook.svg"),
      line: require("~/assets/images/line.svg"),
      twitter: require("~/assets/images/twitter.svg"),
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 112px 20px;
}

.content-box {
  max-width: 842px;
  margin: auto;

  .head {
    background-color: #e0fd6a;
    padding: 10px;
    width: fit-content;
  }

  .content {
    padding: 25px;

    span {
      color: #e0fd6a;
    }
  }
}

.share-box {
  max-width: 650px;
  margin: auto;
}

.credit-box {
  max-width: 900px;
  margin: auto;

  a {
    color: #e5fbff;
  }
}

.header-box {
  border: 1px solid #fffef5;
  padding: 10px;
  width: fit-content;
  margin: auto;

  .content {
    padding: 10px;
  }
}
</style>
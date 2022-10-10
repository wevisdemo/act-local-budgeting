<template>
  <div>
    <div class="min-h-screen bg-blue-a overflow-hidden main-wrapper">
      <div>
        <b-row class="d-none d-lg-flex">
          <b-col></b-col>
          <b-col><img :src="box_lime" alt="" width="330" /></b-col>
        </b-row>

        <b-row class="text-center mt-2 intro-1">
          <b-col class="position-relative">
            <img :src="box_blue" alt="" width="340" class="d-none d-lg-block" />
            <div class="intro-text">
              <h1 class="m-0">ผ่างบเมือง</h1>
              <h5 class="header-5">
                ให้งบประมาณเมือง…<br />เป็นเรื่องตรวจสอบได้
              </h5>
            </div>
          </b-col>
        </b-row>

        <div class="d-flex justify-content-center mt-2">
          <div cols="4" class="text-right d-block d-lg-none">
            <img :src="box_lime" alt="" width="340" class="" />
          </div>
          <div class="text-right">
            <img :src="box_town_2" alt="" width="340" />
          </div>
          <div class="text-left">
            <img
              :src="box_town_1"
              alt=""
              width="340"
              class="d-none d-lg-block"
            />
            <img :src="box_lime" alt="" width="340" class="d-block d-lg-none" />
          </div>
        </div>

        <div class="d-flex flex-column flex-lg-row justify-content-center mt-2">
          <div cols="4" class="text-right d-none d-lg-block">
            <img :src="box_town_3" alt="" width="340" />
          </div>
          <div cols="4" class="position-relative">
            <img :src="box_dark" alt="" width="340" class="d-none d-lg-block" />
            <div class="intro-text-2 white-a">
              <p class="text-4 m-0 text-center text-lg-left">
                โปรเจกต์ชวนตรวจสอบงบประมาณจังหวัดชิ้นนี้<br />ต่อยอดมาจากไอเดียทีม
                <span class="lime"> ขิงบ้านเรา</span> ผู้ได้รับการคัดเลือก
              </p>
              <hr class="my-1 d-none d-lg-block" />
              <div class="d-flex justify-content-center align-items-center">
                <div><img :src="actkathon" alt="" /></div>
                <div class="ml-3">
                  <p class="text-4 m-0">
                    จากการประกวด ACTkathon: Anti-Corruption Virtual Hackathon
                    2021 พลิกเกมโกงให้อยู่หมัด สร้างไอเดียรัฐเปิดเผย
                  </p>
                </div>
              </div>
              <hr class="my-1 d-block d-lg-none" />
            </div>
          </div>
          <div cols="4" class="text-left position-relative">
            <img :src="box_dark" alt="" width="340" class="d-none d-lg-block" />
            <div class="intro-text-2 white-a">
              <div class="d-flex justify-content-around">
                <div>
                  <p class="mb-1 text-4 font-weight-bold">Powered by</p>
                  <img :src="act" alt="" />
                </div>
                <div class="ml-3">
                  <p class="mb-1 text-4 font-weight-bold">Co-Developed by</p>
                  <div class="d-flex flex-lg-column">
                    <div><img :src="punchup" alt="" /></div>
                    <div><p class="my-2 text-4 mx-3 mx-lg-0">&</p></div>
                    <div><img :src="hand" alt="" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-none d-lg-flex justify-content-center mt-2">
          <div class="text-right">
            <img :src="box_lime" alt="" width="340" />
          </div>
          <div class="text-left">
            <img :src="box_lime" alt="" width="340" />
          </div>
        </div>

        <div class="d-flex d-lg-none justify-content-center mt-2">
          <div class="text-right">
            <img :src="box_lime" alt="" width="340" />
          </div>
          <div class="text-left">
            <img :src="box_town_2" alt="" width="340" />
          </div>
        </div>

        <div class="d-flex d-lg-none justify-content-center mt-2">
          <div class="text-right">
            <img :src="box_town_3" alt="" width="340" />
          </div>
          <div class="text-left">
            <img :src="box_lime" alt="" width="340" />
          </div>
        </div>

        <b-row class="text-center mt-2 intro-1">
          <b-col class="position-relative">
            <img :src="box_blue" alt="" width="340" />
            <div class="intro-text-3">
              <p class="text-1 font-weight-bold">
                ถนน เสาไฟ โรงเรียน<br />พื้นที่สาธารณะ<br />ศูนย์พยาบาล...ฯลฯ
              </p>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="intro-box text-2 white-b my-5 text-center text-md-left">
        <p class="text-2 m-0">
          สิ่งเหล่านี้ล้วนเป็นสิ่งอำนวยความสะดวกและสวัสดิการพื้นฐานของเราทุกคน
          ไม่ว่าเราจะอาศัยอยู่เมืองไหน จังหวัดไหน
          เพราะเป็นปัจจัยที่จะทำให้เราใช้ชีวิตอยู่ในเมืองได้อย่างมีคุณภาพและมีความสุข
          <br /><br />
          การจัดสรรงบประมาณของหน่วยงานอย่าง
          <span class="bg-lime blue-a">องค์การบริหารส่วนจังหวัด (อบจ.)</span>
          จึงมีส่วนชี้ชะตาว่าประชาชนในแต่ละเมือง
          จะได้รับประโยชน์จากโครงสร้างพื้นฐานเหล่านี้มากน้อยแค่ไหน ดังนั้น
          <span class="lime font-weight-bold"
            >งบประมาณของจังหวัดจึงไม่ใช่เรื่องไกลตัว</span
          >
          แต่เป็นสิ่งที่พวกเราทุกคนควรมีโอกาสช่วยกันออกแบบและตรวจสอบได้
          ว่างบประมาณของเมืองเรา ควรใช้และถูกใช้จ่ายไปกับเรื่องอะไรบ้าง
        </p>
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
            <NuxtLink to="/dashboard">
              <div class="box-1 pointer mx-3">
                <h4 class="header-4 blue-a ml-4 mb-3 font-weight-bold">
                  ตรวจสอบ<br />งบประมาณ<br />ในจังหวัดของคุณ
                </h4>
              </div>
            </NuxtLink>
            <NuxtLink to="/story">
              <div class="box-2 pointer mx-3 mt-3 mt-md-0">
                <h4 class="header-4 white-a ml-4 mb-3 font-weight-bold">
                  งบ อบจ.<br />
                  สำคัญกับชีวิตเรา<br />
                  อย่างไร?
                </h4>
              </div>
            </NuxtLink>
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
      box_lime: require("~/assets/images/box_lime.svg"),
      box_dark: require("~/assets/images/box_dark.svg"),
      box_blue: require("~/assets/images/box_blue.svg"),
      box_town_1: require("~/assets/images/box_town_1.svg"),
      box_town_2: require("~/assets/images/box_town_2.svg"),
      box_town_3: require("~/assets/images/box_town_3.svg"),
      actkathon: require("~/assets/images/actkathon.png"),
      act: require("~/assets/images/act.svg"),
      hand: require("~/assets/images/hand.png"),
      punchup: require("~/assets/images/punchup.svg"),
      folder_dark: require("~/assets/images/folder_dark.svg"),
      box_light: require("~/assets/images/box_light.svg"),
    };
  },
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  padding: 70px 0;
}

.intro-box {
  border: 0.5px solid #d7ffb7;
  padding: 25px;
  max-width: 681px;
  margin: auto;

  p {
    line-height: 150%;
  }
}

.intro-1 {
  width: 330px;
  margin: auto;

  h1 {
    font-size: 64px;
  }
}

.intro-text {
  position: absolute;
  top: 5px;
  left: 30px;

  @media #{$mq-mobile} {
    position: unset;
    color: $white-a;
  }
}

.intro-text-2 {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 300px;
  padding: 10px 5px;

  hr {
    border: 1px solid #e5fbff;
  }

  @media #{$mq-mobile} {
    position: unset;
    margin: auto;
    width: 320px;
  }
}

.intro-text-3 {
  position: absolute;
  top: 0;
  display: flex;
  height: 100%;
  align-items: center;
  padding: 10px;
  width: 300px;
  justify-content: center;
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
</style>
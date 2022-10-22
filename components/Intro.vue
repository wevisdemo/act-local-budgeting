<template>
  <div>
    <div class="min-h-screen bg-blue-a overflow-hidden main-wrapper">
      <div>
        <div class="text-center px-3">
          <img :src="act_logo" class="mt-3 mt-sm-5 act_logo" alt="" />
        </div>

        <div class="d-flex d-lg-none justify-content-center mt-2">
          <div class="text-right">
            <img :src="box_lime" alt="" width="" class="img-intro-box" />
          </div>
          <div class="text-left">
            <img :src="box_town_1" alt="" width="" class="img-intro-box" />
          </div>
          <div class="text-right">
            <img :src="box_lime" alt="" width="" class="img-intro-box" />
          </div>
        </div>

        <div class="d-flex flex-column flex-lg-row justify-content-center mt-3">
          <div cols="4" class="text-right d-none d-lg-block">
            <img :src="box_town_2" alt="" width="" />
          </div>
          <div cols="4" class="position-relative">
            <img :src="box_dark" alt="" width="" class="d-none d-lg-block img-intro-box" />
            <div class="intro-text-2 white-a">
              <p class="text-4 m-0 text-center text-lg-left">
                โปรเจกต์ชวนตรวจสอบงบประมาณ อบจ. ชิ้นนี้<br />ต่อยอดมาจากไอเดียทีม
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
            <img :src="box_dark" alt="" width="" class="d-none d-lg-block img-intro-box" />
            <div class="intro-text-2 white-a">
              <div class="d-flex justify-content-around">
                <div>
                  <p class="mb-1 text-4 font-weight-bold">Powered by</p>
                  <img :src="act" alt="" class="logo-brand" />
                </div>
                <div class="ml-3">
                  <p class="mb-1 text-4 font-weight-bold">Co-Developed by</p>
                  <div class="d-flex flex-lg-column">
                    <div><img :src="punchup" alt="" class="logo-brand"/></div>
                    <div><p class="my-2 text-4 mx-1 mx-lg-0">&</p></div>
                    <div><img :src="hand" alt="" class="logo-brand"/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="d-lg-flex justify-content-center mt-3 position-relative d-none"
          style="left: 150px"
        >
          <div class="text-right">
            <img :src="box_dark" alt="" width="" class="img-intro-box" />
          </div>
          <div class="text-right">
            <img :src="box_town_1" alt="" width="" class="img-intro-box"/>
          </div>
          <div class="text-right">
            <img :src="box_dark" alt="" width="" class="img-intro-box" />
          </div>
        </div>

        <div class="d-flex d-lg-none justify-content-center mt-2">
          <div class="text-right">
            <img :src="box_lime" alt="" width="" class="img-intro-box" />
          </div>
          <div class="text-left">
            <img :src="box_town_2" alt="" width="" class="img-intro-box" />
          </div>
        </div>

        <div class="d-flex d-lg-none justify-content-center mt-2">
          <div class="text-right">
            <img :src="box_town_3" alt="" width="" class="img-intro-box" />
          </div>
          <div class="text-left">
            <img :src="box_lime" alt="" width=""  class="img-intro-box"/>
          </div>
        </div>
      </div>

      <div class="px-3">
        <div style="max-width: 992px" class="mx-auto mt-5 text-center">
          <h4 class="header-4 font-weight-bold white-a px-3 d-none d-md-none">
            ถนน เสาไฟ โรงเรียน<br />
            พื้นที่สาธารณะ ศูนย์พยาบาล...ฯลฯ
          </h4>
          <img :src="intro_desc_header" width="300" alt="" class="mx-auto" />
        </div>

        <div class="intro-box text-2 white-b my-3 text-center text-md-left">
          <p class="text-2 m-0">
            สิ่งเหล่านี้ล้วนเป็นสิ่งอำนวยความสะดวกและสวัสดิการพื้นฐานของเราทุกคน
            ไม่ว่าเราจะอาศัยอยู่เมืองไหน จังหวัดไหน
            เพราะเป็นปัจจัยที่จะทำให้เราใช้ชีวิตอยู่ในเมืองได้อย่างมีคุณภาพและมีความสุข
            <br /><br />
            การจัดสรรงบประมาณของหน่วยงานอย่าง
            <span class="bg-lime blue-a">องค์การบริหารส่วนจังหวัด (อบจ.)</span>
            <span class="lime font-weight-bold">
              จึงมีส่วนชี้ชะตาว่าประชาชนในแต่ละเมืองจะได้รับประโยชน์จากโครงสร้างพื้นฐานเหล่านี้มากน้อยแค่ไหน
              ดังนั้นงบประมาณของจังหวัดจึงไม่ใช่เรื่องไกลตัว</span
            >
            แต่เป็นสิ่งที่พวกเราทุกคนควรมีโอกาสช่วยกันออกแบบและตรวจสอบได้
            ว่างบประมาณของเมืองเรา ควรใช้และถูกใช้จ่ายไปกับเรื่องอะไรบ้าง
          </p>
        </div>
      </div>
    </div>

    <div
      class="h-100vh choose-wrapper d-flex flex-column justify-content-between"
    >
      <div class="px-3 py-5 d-flex justify-content-center align-items-center h-100">
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
      actkathon: require("~/assets/images/actkathon.svg"),
      act: require("~/assets/images/act.svg"),
      hand: require("~/assets/images/hand.svg"),
      punchup: require("~/assets/images/punchup.svg"),
      folder_dark: require("~/assets/images/folder_dark.svg"),
      box_light: require("~/assets/images/box_light.svg"),
      act_logo: require("~/assets/images/act_logo.svg"),
      intro_desc_header: require("~/assets/images/intro_desc_header.svg"),
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
  max-width: 992px;
  margin: auto;

  p {
    line-height: 150%;
  }

  @media #{$mq-mini-mobile} {
    padding: 10px;
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

.act_logo {
  max-width: 800px;
  margin: auto;
}

.img-intro-box {
  max-width: 340px;
  @media #{$mq-mini-mobile} {
    max-width: 200px;
  }
}

.logo-brand {
  @media #{$mq-mini-mobile} {
    width: 100%;
  }
}
</style>
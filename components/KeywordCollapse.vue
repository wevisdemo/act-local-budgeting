<template>
  <div>
    <b-row class="m-0 d-none d-lg-flex">
      <b-col cols="12" lg="4" class="mb-3">
        <div
          class="mb-3"
          v-for="(item, a) in data.filter(
            (x) => x.id == 1 || x.id == 4 || x.id == 7
          )"
          :key="'kw-d-' + item.id"
        >
          <b-button
            v-b-toggle="'collapse-set-d-' + item.id"
            variant="primary"
            class="keyword-collapse w-100 bg-blue-a text-1 p-0"
          >
            <div
              class="bg-blue-a keyword-btn-content text-left px-3 pt-3 lime-b"
              :style="{
                backgroundImage: `url(${require('@/assets/images/keywordgroup_' +
                  item.id +
                  '.svg')})`,
              }"
            ></div>
            <p class="m-0 font-weight-bold text-2 lime-b">{{ item.text }}</p>
            <div class="text-right px-3 lime-b">+</div></b-button
          >
          <b-collapse :id="'collapse-set-d-' + item.id">
            <b-card>
              <b-row>
                <b-col
                  cols="4"
                  v-for="(item2, b) in item.list"
                  :key="'kw-d-' + b"
                  class="mb-3"
                  ><div
                    class="keyword-btn text-3 white-b p-2 text-center"
                    @click="() => $emit('showKeywordResult', item2)"
                  >
                    <span>{{ item2 }}</span>
                  </div></b-col
                >
              </b-row>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
      <b-col cols="12" lg="4" class="mb-3">
        <div
          class="mb-3"
          v-for="(item, a) in data.filter((x) => x.id == 2 || x.id == 5)"
          :key="'kw-d-' + item.id"
        >
          <b-button
            v-b-toggle="'collapse-set-d-' + item.id"
            variant="primary"
            class="keyword-collapse w-100 bg-blue-a text-1 p-0"
          >
            <div
              class="bg-blue-a keyword-btn-content text-left px-3 pt-3 lime-b"
              :style="{
                backgroundImage: `url(${require('@/assets/images/keywordgroup_' +
                  item.id +
                  '.svg')})`,
              }"
            ></div>
            <p class="m-0 font-weight-bold text-2 lime-b">{{ item.text }}</p>
            <div class="text-right px-3 lime-b">+</div></b-button
          >
          <b-collapse :id="'collapse-set-d-' + item.id">
            <b-card>
              <b-row>
                <b-col
                  cols="4"
                  v-for="(item2, b) in item.list"
                  :key="'kw-d-' + b"
                  class="mb-3"
                  ><div
                    class="keyword-btn text-3 white-b p-2 text-center"
                    @click="() => $emit('showKeywordResult', item2)"
                  >
                    <span>{{ item2 }}</span>
                  </div></b-col
                >
              </b-row>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
      <b-col cols="12" lg="4" class="mb-3">
        <div
          class="mb-3"
          v-for="(item, a) in data.filter((x) => x.id == 3 || x.id == 6)"
          :key="'kw-d-' + item.id"
        >
          <b-button
            v-b-toggle="'collapse-set-d-' + item.id"
            variant="primary"
            class="keyword-collapse w-100 bg-blue-a text-1 p-0"
          >
            <div
              class="bg-blue-a keyword-btn-content text-left px-3 pt-3 lime-b"
              :style="{
                backgroundImage: `url(${require('@/assets/images/keywordgroup_' +
                  item.id +
                  '.svg')})`,
              }"
            ></div>
            <p class="m-0 font-weight-bold text-2 lime-b">{{ item.text }}</p>
            <div class="text-right px-3 lime-b">+</div></b-button
          >
          <b-collapse :id="'collapse-set-d-' + item.id">
            <b-card>
              <b-row>
                <b-col
                  cols="4"
                  v-for="(item2, b) in item.list"
                  :key="'kw-d-' + b"
                  class="mb-3"
                  ><div
                    class="keyword-btn text-3 white-b p-2 text-center"
                    @click="() => $emit('showKeywordResult', item2)"
                  >
                    <span>{{ item2 }}</span>
                  </div></b-col
                >
              </b-row>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
    </b-row>

    <b-row class="m-0 d-flex d-lg-none">
      <b-col
        cols="12"
        lg="4"
        class="mb-3"
        v-for="(item, i) in data"
        :key="'kw-' + item.id"
      >
        <div class="mb-3">
          <b-button
            v-b-toggle="'collapse-set-' + item.id"
            variant="primary"
            class="keyword-collapse w-100 bg-blue-a text-1 p-0"
          >
            <div
              class="bg-blue-a keyword-btn-content text-left px-3 pt-3 lime-b"
              :style="{
                backgroundImage: `url(${require('@/assets/images/keywordgroup_' +
                  item.id +
                  '.svg')})`,
              }"
            ></div>
            <p class="m-0 font-weight-bold text-2 lime-b">{{ item.text }}</p>
            <div class="text-right px-3 lime-b">+</div></b-button
          >
          <b-collapse :id="'collapse-set-' + item.id">
            <b-card>
              <b-row>
                <b-col
                  cols="4"
                  v-for="(item2, j) in item.list"
                  :key="'kw-' + j"
                  class="mb-3"
                  ><div
                    class="keyword-btn text-3 white-b p-2 text-center"
                    @click="() => $emit('showKeywordResult', item2)"
                  >
                    <span>{{ item2 }}</span>
                  </div></b-col
                >
              </b-row>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
};
</script>

<style lang="scss" scoped>
.keyword-btn-content {
  height: 175px;
  background-size: 100%;
  background-repeat: no-repeat;
  opacity: 0.7;
}

.keyword-collapse {
  border: 0;
  border-radius: 0;
  position: relative;

  p {
    width: 235px;
    position: absolute;
    top: 20px;
    left: 20px;
    text-align: left;
    @media #{$mq-mini-mobile} {
      width: 190px;
    }
  }
}

.keyword-btn {
  border: 1px solid #fffef5;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
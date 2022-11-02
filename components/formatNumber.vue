<template>
  <span>
    <template v-if="data != 0 && data != null">{{
        data >= 1000000
          ? parseInt(
              data
                .toFixed()
                .toString()
                .substring(0, data.toFixed().toString().length - 6)
            ).toLocaleString()
          : parseInt(data.toString()).toLocaleString()
      }}
      <p class="m-0 d-inline-block">
        {{ data >= 1000000 ? " ล้านบาท" : " บาท" }}
      </p>
    </template>
    <template v-else> 0 บาท </template>
  </span>
</template>

<script>
export default {
  props: {
    data: Number,
  },
};
</script>
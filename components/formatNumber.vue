<template>
  <span>
    <template v-if="data != 0">
      {{
        data >= 1000000
          ? parseInt(
              data.toFixed().toString().substring(0, data.toFixed().toString().length - 6)
            ).toLocaleString() + ' ล้านบาท'
          : parseInt(data.toString()).toLocaleString() + ' บาท'
      }}
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
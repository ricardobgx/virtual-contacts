<template>
  <span class="material-icons-outlined" v-bind:style="`color: ` + color">{{
    code
  }}</span>
</template>
<script>
export default {
  name: "MaterialIcon",
  props: {
    code: String,
    color: String,
  },
  data() {
    return {
      iconCode: this.code,
    };
  },
};
</script>
<style scoped></style>

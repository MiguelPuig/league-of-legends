<template>
  <div>
    <div>{{ this.name }}: {{ this.stat }}</div>
  </div>
</template>

<script>
export default {
  name: "stats",
  props: {
    stat: Number,
    name: String
  }
};
</script>

<style></style>

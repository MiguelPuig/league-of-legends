<template>
  <div>
    <router-link :to="'/itemDetail/' + this.recomendedItem">
      <img
        v-bind:src="'http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/' + this.recomendedItem +'.png'"
        alt
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "recomendedItems",
  props: {
    recomendedItem: String
  }
};
</script>

<style>
</style>
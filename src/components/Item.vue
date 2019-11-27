<template>
  <div class="items">
    <router-link :to="'/itemDetail/' + this.itemId">
      <div class="itemImage">
        <img v-bind:src="'http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/' + this.itemIcon" />
      </div>
    </router-link>

    <div>
      <div class="itemName">{{this.itemName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    itemIcon: String,
    itemName: String,
    itemId: String
  },
  methods: {}
};
</script>

<style>
.itemName {
  width: 95px;
  margin-bottom: 20px;
  text-align: center;
  font-family: "friz_quadrataregular";

  color: rgb(158, 120, 25);
}
.itemImage {
  width: 95px;
}
.items {
  text-align: center;
}
</style>
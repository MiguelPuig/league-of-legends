<template>
  <div>
    <v-flex class="name" d-flex justify-space-around>{{champName}}</v-flex>
    <router-link :to="'/ChampionDetail/' + this.champName">
      <img
        class="champIcon"
        v-bind:src="'http://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/' + this.champIcon"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Champion",
  props: {
    champName: String,
    champIcon: String
  },

  data: () => ({})
};
</script>

<style>
.champIcon {
  height: 100px;
}
.name {
  color: rgb(158, 120, 25);
  font-family: "friz_quadrataregular";
}
</style>
<template>
  <div>
    <v-img
      class="skin"
      :src="'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + this.champName + '_' + this.skin.num + '.jpg'"
    />
  </div>
</template>

<script>
import ChampionDetailVue from "../views/ChampionDetail.vue";
export default {
  name: "skins",
  props: {
    skin: Object,
    champName: String
  }
};
</script>

<style>
.skin {
  width: 400px;
}
</style>
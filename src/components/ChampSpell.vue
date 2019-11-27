<template>
  <v-flex xs12 sm6 md4 lg3>
    <v-card flat class="text-center ma-5" color="white">
      <v-responsive class="pt-4">
        <div class="spellImage">
          <img
            :src="
              'http://ddragon.leagueoflegends.com/cdn/9.21.1/img/spell/' +
                this.spell.image.full
            "
            alt
          />
        </div>
      </v-responsive>
      <v-card-text>
        <div class="spellDescription">
          <p class="spellName">{{ this.spell.name }}</p>
          <p class="textDescription">{{ this.spell.description }}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "Spell",
  props: {
    spell: Object
  }
};
</script>

<style>
.abilities {
  display: flex;
  flex-direction: column;
}
.spellName {
  font-size: 1.2rem;
  font-family: "friz_quadrataregular";
}

.textDescription {
  height: 150px;
  font-family: "friz_quadrataregular";
}
</style>

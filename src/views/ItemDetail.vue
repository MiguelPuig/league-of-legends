<template>
  <div>
    <v-app-bar dark class="nav" app>
      <v-flex d-flex justify-space-between align-center>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link :to="'/'">
          <img class="logo" src="../assets/logo.png" />
        </router-link>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" router :to="item.route">
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-flex>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="grey">
      <v-list-item v-for="(page, index) in pages" :key="index" router :to="page.route">
        <v-list-item-title>{{ page.text }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <!-- ITEM DETAILS -->
    <div v-if="getItem">
      <h1 class="champions-title">ITEM INFO</h1>
      <v-layout class="layoutItemDetail">
        <v-flex xs12 sm6 md4 lg3>
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4">
              <img
                v-bind:src="
                  'http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/' +
                    getItem.image.full
                "
              />
            </v-responsive>
            <v-card-text>
              <div class="itemTitle">{{ getItem.name }}</div>
              <p>Description: {{ getItem.plaintext }}</p>
              <p>Stats: {{getItem.description}}</p>
              <p>Gold: {{ getItem.gold.total }}</p>
              <p class="creation">Creation</p>

              <router-link :to="'/itemDetail/' + this.itemId">
                <v-flex d-flex flex-wrap justify-space-around>
                  <div v-for="(image, index) in getItem.into" :key="index">
                    <img
                      v-bind:src="
                      'http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/' +
                        image +
                        '.png'
                    "
                    />
                  </div>
                </v-flex>
              </router-link>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "itemDetail",
  components: {},
  props: {
    itemId: String
  },
  data() {
    return {
      // item: null,
      items: [{ text: "CHAT & LOGIN", route: "../Chat" }],
      pages: [
        { text: "CHAMPIONS", route: "/" },
        { text: "ITEMS", route: "../Items" }
      ],
      drawer: false
    };
  },

  methods: {
    ...mapActions(["getItemDetail"]),
    stripTags: function(str) {
str = str.replace(/<.*>/g, '');
return str;
}
  },
  created() {
    this.getItemDetail(this.itemId);
   
  },
  computed: {
    ...mapGetters(["getItem"])
  }
};
</script>

<style>
.itemTitle {
  font-family: "friz_quadrataregular";
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 30px;
}
.v-content__wrap {
  background-image: url("../assets/marfil2.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  background-color: rgb(255, 255, 255);
}
.champions-title {
  font-family: "frizquadratabold";
  color: rgb(158, 120, 25);
  margin-bottom: 5px;
  margin-top: 5px;
  text-align: center;
  font-size: 2rem;
}
.creation {
  margin-bottom: 15px;
}
.layoutItemDetail {
  justify-content: center;
}
</style>

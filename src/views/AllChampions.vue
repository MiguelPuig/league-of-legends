<template>
  <div class="parallax">
    <div v-if="getChampions">
      <v-app-bar dark class="nav" app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <img class="logo" src="../assets/logo.png" />
        <v-spacer></v-spacer>

        <SearchBox @search="getSearch" />
        <v-spacer></v-spacer>
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
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app color="amber lighten-5">
        <v-list-item v-for="(page, index) in pages" :key="index" router :to="page.route">
          <v-list-item-title>{{ page.text }}</v-list-item-title>
        </v-list-item>
      </v-navigation-drawer>
      <div>
        <div>
          <!-- TITLE -->
          <v-flex d-flex justify-center>
            <h1 class="champions-title">CHAMPIONS</h1>
          </v-flex>
          <!-- ROLE FILTERS-->
          <Tags class="tags" @tags="getTags"></Tags>

          <!-- CHAMPION ICONS -->
          <!-- v-for d'objectes (value, key, index) -->
          <v-flex d-flex flex-wrap justify-space-around>
            <Champion
              v-for="(champion, index) in searchByName"
              :key="index"
              :champName="champion.id"
              :champIcon="champion.image.full"
            />
          </v-flex>
        </div>
      </div>
    </div>
    <div class="loaderDiv" v-else>
      <img class="loader" src="../assets/pngguru.com.png" />
    </div>
  </div>
</template>

<script>
import Tags from "../components/Tags";
import SearchBox from "../components/SearchBox";
import Champion from "../components/Champion.vue";
import ChampionDetail from "../views/ChampionDetail.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AllChampions",
  components: {
    Champion,
    ChampionDetail,
    SearchBox,
    Tags
  },
  data() {
    return {
      search: "",
      tags: [],
      items: [
        // { text: "LOGIN", route: "/Login" },
        { text: "CHAT & LOGIN", route: "/Chat" }
      ],
      pages: [
        { text: "CHAMPIONS", route: "/" },
        { text: "ITEMS", route: "/Items" }
      ],
      drawer: false
    };
  },
  computed: {
    // CHAMPION SEARCH
    ...mapGetters(["getChampions"]),
    searchByName: function() {
      if (this.getChampions)
        return this.filterByTags.filter(champion => {
          return champion.name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
    },
    // CHAMPION ROLE FILTER
    filterByTags: function() {
      if (this.getChampions)
        return Object.values(this.getChampions).filter(champion => {
          if (this.tags.length == 0) {
            return true;
          }
          var found = true;
          this.tags.forEach(tag => {
            if (!champion.tags.includes(tag)){
              found = false;
              return;
            }
          });
          return found;
          
        });
    }
    
  },

  methods: {
    ...mapActions(["getAllChampions"]),
    getSearch(text) {
      this.search = text;
    },
    getTags(text) {
      this.tags = text;
    }
  },
  created() {
    this.getAllChampions();
  }
};
</script>

<style>
.champions-title {
  font-family: "frizquadratabold";
  color: rgb(158, 120, 25);
  margin-bottom: 5px;
  margin-top: 5px;
}
.parallax {
  background-image: url("../assets/marfil2.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
}
.tags {
  margin-bottom: 10px;
}
.logo {
  width: 30px;
  margin-left: 10px;
}
.v-application a {
  color: rgb(19, 47, 70) !important;
  font-weight: bold;
}
.v-navigation-drawer__content {
  background-image: url("../assets/marfil2.png");
  background-size: cover;
}
.v-toolbar__content {
  /* background-image: url("../assets/backgroundChampions.jpg"); */
  background-color: rgb(19, 47, 70);
}
.loader {
  height: 200px;
}
.loaderDiv {
  display: flex;
  justify-content: center;
}
.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  padding: 10px;
}
</style>

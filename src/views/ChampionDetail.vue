<template>
  <div id="championDetail" class="parallax2" v-if="getChamp">
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

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item v-for="(page, index) in pages" :key="index" router :to="page.route">
        <v-list-item-title>{{ page.text }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <!-- CHAMPION DESCRIPTION AND STATS -->
    <div>
      <div class="card1">
        <v-card flat class="text-center" color="white">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="title1">{{ champName }}</h1>
          </v-card-title>
          <v-tabs class="tabsTitle" v-model="tab" background-color="transparent">
            <v-tab class="tabTitle">Description</v-tab>
            <v-tab class="tabTitle">Stats</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat color="white">
                <v-card-text class="lore">
                  {{
                  getChamp[champName].lore
                  }}
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat color="white">
                <v-card-text class="chart">
                  <Info :chart="getChamp" :champName="champName"></Info>

                  <!-- <Stats
                    v-for="(stat, key, i) in getChamp[champName].stats"
                    :key="i"
                    :stat="stat"
                    :name="key"
                  />-->
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>

      <!-- CHAMPION ABILITIES -->
      <div class="title2">
        <h2>Abilities</h2>
      </div>

      <div class="abilities">
        <v-flex d-flex flex-wrap justify-space-around>
          <ChampSpell
            v-for="(spell, index) in getChamp[champName].spells"
            :key="index"
            :spell="spell"
          />
        </v-flex>
      </div>
      <!-- CHAMPION RECOMENDED ITEMS -->
      <div class="recomendedTitle">
        <h2>Recomended Items</h2>
      </div>
      <div class="recomended">
        <h4>Starting</h4>
        <div class="recomendedIcons">
          <RecomendedItems
            v-for="(item, index) in getChamp[champName].recommended[6]
              .blocks[0].items"
            :key="index"
            :recomendedItem="item.id"
          />
        </div>
      </div>
      <div class="recomended">
        <h4>Early</h4>
        <div class="recomendedIcons">
          <RecomendedItems
            v-for="(item, index) in getChamp[champName].recommended[6]
              .blocks[1].items"
            :key="index"
            :recomendedItem="item.id"
          />
        </div>
      </div>

      <div class="recomended">
        <h4>Essencial</h4>
        <div class="recomendedIcons">
          <RecomendedItems
            v-for="(item, index) in getChamp[champName].recommended[6]
              .blocks[2].items"
            :key="index"
            :recomendedItem="item.id"
          />
        </div>
      </div>
      <div class="recomended">
        <h4>Offensive</h4>
        <div class="recomendedIcons">
          <RecomendedItems
            v-for="(item, index) in getChamp[champName].recommended[6]
              .blocks[3].items"
            :key="index"
            :recomendedItem="item.id"
          />
        </div>
      </div>
      <div class="recomended">
        <h4>Defensive</h4>
        <div class="recomendedIcons">
          <RecomendedItems
            v-for="(item, index) in getChamp[champName].recommended[6]
              .blocks[4].items"
            :key="index"
            :recomendedItem="item.id"
          />
        </div>
      </div>
      <!-- CHAMPION SKINS CARROUSEL -->
      <div>
        <div class="recomendedTitle">
          <h2>Skins</h2>
        </div>
        <v-carousel class="hidden-sm-and-up" height="236">
          <v-carousel-item
            v-for="(skin, l) in getChamp[champName].skins"
            :src="
              'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
                champName +
                '_' +
                skin.num +
                '.jpg'
            "
            :key="l"
          ></v-carousel-item>
        </v-carousel>
        <v-carousel class="hidden-xs-only">
          <v-carousel-item
            v-for="(skin, l) in getChamp[champName].skins"
            :src="
              'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
                champName +
                '_' +
                skin.num +
                '.jpg'
            "
            :key="l"
          ></v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Info from "../components/Info";
import ChampSpell from "../components/ChampSpell";
import Stats from "../components/Stats";
import Skins from "../components/Skins";
import RecomendedItems from "../components/RecomendedItems";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ChampSpell,
    Stats,
    Skins,
    RecomendedItems,
    Info
  },
  props: {
    champName: String
  },
  created() {
    this.getChampion(this.champName);
  },
  data() {
    return {
      tab: null,
      tags: [],
      items: [{ text: "CHAT & LOGIN", route: "../Chat" }],
      pages: [
        { text: "CHAMPIONS", route: "/" },
        { text: "ITEMS", route: "../Items" }
      ],
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["getChamp"])
  },

  methods: {
    ...mapActions(["getChampion"])
  },
  // CHANGE BACKGROUND
  watch: {
    getChamp: function() {
      setTimeout(() => {
        console.log(document.getElementById("championDetail"));
        if (window.innerHeight > window.innerWidth) {
          document.getElementById("championDetail").style.backgroundImage =
            "url('http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
            this.champName +
            "_0.jpg')";
        } else {
          document.getElementById("championDetail").style.backgroundImage =
            "url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
            this.champName +
            "_0.jpg)";
        }
      }, 4);
    }
  }
};
</script>

<style>
h4 {
  margin-right: 20px;
  margin-left: 10px;
  width: 70px;
  color: rgb(5, 5, 5);
  display: flex;
  align-items: center;
  font-family: "friz_quadrataregular";
}
.recomended {
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
  width: 90%;
  margin: auto;
  justify-content: space-around;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 4px;
  flex-wrap: wrap;
}
.recomendedIcons {
  display: flex;
  padding-top: 5px;
}
h2 {
  margin-left: 20px;
  color: rgb(158, 120, 25);
}
.recomendedTitle {
  margin-left: 20px;
  margin-bottom: 20px;
  background-image: url("../assets/marfil2.png");
  display: flex;
  margin-right: 20px;
  background-size: cover;
}
.parallax2 {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.title2 {
  background-image: url("../assets/marfil2.png");
  display: flex;
  margin: 20px;
  background-size: cover;
}
.title1 {
  padding: 10px;
  font-family: "friz_quadrataregular";
}
.logo {
  width: 30px;
}
p {
  font-family: "friz_quadrataregular";
  font-weight: bold;
}
.margin-top-v-card {
  margin: 310px 20px 20px 20px;
}
.tabsTitle {
  display: flex;
  justify-content: space-evenly;
  background-image: url("../assets/marfil2.png");
  background-size: cover;
}
.tabTitle {
  color: rgb(158, 120, 25) !important;
  font-family: "friz_quadrataregular";
}
.v-tabs-slider {
  background-color: transparent !important;
}

.chart {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card1 {
  padding-top: 300px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}
.lore {
  font-family: "friz_quadrataregular";
}

/* .mdi-menu::before {
  margin-right: 20px;
} */
@media (orientation: landscape) {
  .recomendedTitle {
    display: flex;
    align-items: center;
    background-color: rgb(255, 255, 255);
    width: 95%;
    margin: auto;
    justify-content: space-around;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    background-size: cover;
  }
  .title2 {
    display: flex;
    align-items: center;
    background-color: rgb(255, 255, 255);
    width: 95%;
    margin: auto;
    justify-content: space-around;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    background-size: cover;
  }
  .abilities {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>

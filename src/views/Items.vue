<template>
  <div class="background">
    <div v-if="getItems">
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

      <!-- FILTER ITEMS -->
      <h1>ITEMS</h1>

      <v-select
        background-color="white"
        color="#9e7819"
        :items="tagsArray"
        label="Filter"
        v-model="tags"
        dense
        outlined
      ></v-select>

      <!-- <label v-for="(tag,index) in tagsArray" :key="index">
        <input type="checkbox" v-model="tags" />
        {{tag}}
      </label>-->

      <!-- ITEMS -->
      <v-flex d-flex flex-wrap justify-space-around>
        <Item
          v-for="(id, index) in filteredIds"
          :key="index"
          :itemName="getItems[id].name"
          :itemIcon="getItems[id].image.full"
          :itemId="id"
        />
      </v-flex>
    </div>
  </div>
</template>

<script>
import Item from "../components/Item";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "items",
  components: {
    Item
  },

  data() {
    return {
      tags: [],
      items: [{ text: "CHAT & LOGIN", route: "/Chat" }],
      pages: [
        { text: "CHAMPIONS", route: "/" },
        { text: "ITEMS", route: "../Items" }
      ],
      drawer: false
    };
  },
  created() {
    this.getAllItems();
  },
  methods: {
    ...mapActions(["getAllItems"]),
    getData() {
      fetch(
        "http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/item.json",
        {
          method: "GET"
        }
      )
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(data => {
          this.AllItems = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters(["getItems"]),
    // SELECTORS FOR ITEMS
    tagsArray() {
      return [
        ...new Set(
          Object.values(this.getItems)
            .map(item => {
              return item.tags;             
            })
            
            .flat()
        )
        
      ];
    },
    // FILTER ITEMS
    filteredIds() {
      return Object.keys(this.getItems).filter(key => {
        if (this.tags.length == 0) {
          return true;
        }
        var found = false;
        this.getItems[key].tags.forEach(tag => {
          if (this.tags === tag) {
            found = true;
            return;
          }
        });
        return found;
      });
    }
  }
};
</script>

<style>
h1 {
  font-family: "frizquadratabold";
  color: rgb(158, 120, 25);
  margin-bottom: 5px;
  margin-top: 5px;
  text-align: center;
}
.background {
  background-image: url("../assets/marfil2.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.v-select__selection--comma {
  font-family: "friz_quadrataregular";
}
</style>

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    AllChampions: {},
    Champion: null,
    AllItems: null,
    user: null,
    itemDetail: null
  },
  mutations: {
    set_champions: (state, payload) => (state.AllChampions = payload),
    set_champ: (state, payload) => (state.Champion = payload),
    set_items: (state, payload) => (state.AllItems = payload),
    set_user: (state, payload) => {
      state.user = payload;
    },
    set_itemDetail: (state, payload) => (state.itemDetail = payload)
  },
  actions: {
    getAllChampions(context) {
      fetch(
        "https://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json",
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
          context.commit("set_champions", data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getChampion(context, name) {
      fetch(
        "https://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion/" +
          name +
          ".json",
        {
          methods: "GET"
        }
      )
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(data => {
          context.commit("set_champ", data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllItems(context) {
      fetch(
        "https://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/item.json",
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
          context.commit("set_items", data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    set_user({ commit }, user) {
      commit("set_user", user);
    },
    getItemDetail(context, itemId) {
      fetch(
        "https://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/item.json",
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
          context.commit("set_itemDetail", data.data[itemId]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    getChampions: state => state.AllChampions,
    getChamp: state => state.Champion,
    getItems: state => state.AllItems,
    getUser: state => state.user,
    getItem: state => state.itemDetail
  },
  modules: {}
});

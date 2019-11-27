import Vue from "vue";
import VueRouter from "vue-router";
import AllChampions from "../views/AllChampions.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AllChampions",

    component: AllChampions
  },
  {
    path: "/ChampionDetail/:champName",
    name: "ChampionDetail",
    props: true,
    component: () => import("../views/ChampionDetail.vue")
  },
  {
    path: "/Items/",
    name: "Items",
    props: true,
    component: () => import("../views/Items.vue")
  },
  {
    path: "/ItemDetail/:itemId",
    name: "ItemDetail",
    props: true,
    component: () => import("../views/ItemDetail")
  },
  {
    path: "/Login/",
    name: "Login",
    props: true,
    component: () => import("../views/Login")
  },
  {
    path: "/Chat/",
    name: "Chat",
    props: true,
    component: () => import("../views/Chat")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

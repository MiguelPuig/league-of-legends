import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
import db from "@/firebase";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);
window.addEventListener("orientationchange", () => console.log("change"));
Vue.config.productionTip = false;
db.auth().onAuthStateChanged(user => {
  if (user) {
    var userAuth = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL
      // emailVerified = user.emailVerified,
      // uid = user.uid
    };
    store.dispatch("set_user", userAuth);
  } else {
    store.dispatch("set_user", null);
  }
});

new Vue({
  router,
  store,
  vuetify,
  db,
  render: h => h(App)
}).$mount("#app");

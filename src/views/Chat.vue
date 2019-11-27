<template>
  <div class="background">
    <div class="loginPage">
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

      <!-- LOGIN & CHAT -->
      <div v-if="!auth" class="loginIcon">
        <div class="loginText">
          <div class="tx">Login with google to use this chat</div>
          <div class="imageLogin">
            <img
              class="image"
              @click="googleLogin"
              src="../assets/icons8-google-48.png"
              alt="google Login"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <section class="msger">
          <header class="msger-header">
            <img class="profileImage" :src="auth.avatar" alt="profile image" />
            <h4 class="authname">{{ auth.name }}</h4>
            <v-btn class="buttonLogout" @click="logOut">
              <img class="newlogout" src="../assets/newlogout.png" />
            </v-btn>
          </header>

          <form class="msger-inputarea" onSubmit="return false">
            <input
              id="chat"
              type="text"
              class="mesgr-input"
              v-model="message"
              placeholder="Enter your message..."
            />

            <button type="submit" class="msger-send-btn" @click="sendMsg">Send</button>
          </form>
        </section>

        <div class="msger-chat" id="test">
          <div class="msg left-msg">
            <div class="msg-bubble">
              <div class="msg-info"></div>
            </div>
          </div>

          <div v-for="(v, k, i) in messages" :key="i">
            <div class="msg right-msg">
              <div>
                <img class="msg-img" :src="v.user.avatar" alt="avatar" />
              </div>

              <div class="msg-bubble">
                <div class="msg-info">{{ v.msg }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";
import { mapGetters, mapActions } from "vuex";
import { watch } from "fs";

export default {
  name: "Chat",
  props: {
    msg: String
  },
  data() {
    return {
      message: "",
      messages: [],

      items: [{ text: "CHAT & LOGIN", route: "../Chat" }],
      pages: [
        { text: "CHAMPIONS", route: "/" },
        { text: "ITEMS", route: "../Items" }
      ],
      drawer: false
    };
  },
  methods: {
    ...mapActions(["set_user"]),
    scrollToEnd() {
      if (this.auth) {
        console.log("ins");
        setTimeout(() => {
          document.querySelector("#test").scrollTop = document.querySelector(
            "#test"
          ).scrollHeight;
        }, 20);
      }
    },
    sendMsg() {
      console.log(db);
      db.database()
        .ref()
        .child("chats")
        .push({ user: this.auth, msg: this.message });
      this.message = "";
    },
    getMsg() {
      db.database()
        .ref("chats/")
        .on("value", snapshot => {
          console.log(snapshot.val());
          this.messages = snapshot.val();
        });
    },
    googleLogin() {
      const provider = new db.auth.GoogleAuthProvider();

      db.auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.

          // The signed-in user info.
          var user = result.user;
          console.log(user);
          var user = {
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL
            // emailVerified = user.emailVerified,
            // uid = user.uid
          };
          // this.auth = user;
          this.set_user(user);
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },

    logOut() {
      let that = this;
      db.auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          this.set_user(null);
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  created() {
    this.getMsg();
  },
  computed: {
    ...mapGetters(["getUser"]),
    auth() {
      return this.getUser;
    }
  },
  watch: {
    message() {
      this.scrollToEnd();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginIcon {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.profileImage {
  height: 30px;
}
.imageLogin {
  text-align: center;
  margin-top: 20px;
}

:root {
  --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --msger-bg: #fff;
  --border: 2px solid #ddd;
  --left-msg-bg: #ececec;
  --right-msg-bg: #579ffb;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: var(--body-bg);
  font-family: Helvetica, sans-serif;
}

.msger {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  /* width: 100%; */
  max-width: 867px;
  /* margin: 25px 10px; */
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: var(--msger-bg);
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
}

.msger-header {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  border-bottom: var(--border);
  background: #eee;
  color: #666;
  align-items: center;
  position: fixed;
  width: 100%;
}

.msger-chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.msger-chat::-webkit-scrollbar-track {
  background: #ddd;
}
.msger-chat::-webkit-scrollbar-thumb {
  background: #bdbdbd;
}
.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
/* .msg:last-of-type {
  margin: 0;
} */
.msg-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.msg-bubble {
  max-width: 450px;
  padding: 8px;
  border-radius: 15px;
  background: var(--left-msg-bg);
  margin-bottom: 10px;
}
.msg-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  word-break: break-all;
  font-family: "friz_quadrataregular";
}
.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}
.msg-info-time {
  font-size: 0.85em;
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
}

.right-msg {
  flex-direction: row-reverse;
  margin-top: 10px;
}
.right-msg .msg-bubble {
  background: var(--right-msg-bg);
  color: black;
  border-bottom-right-radius: 0;
  background: white;
  font-family: "friz_quadrataregular";
}
.right-msg .msg-img {
  margin: 0 0 0 10px;
  margin-top: 12px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  border-top: var(--border);
  background: #eee;
  justify-content: space-between;
  /* background-image: url("../assets/backgroundChampions.jpg"); */
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.msger-inputarea * {
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 1em;
  color: black;
  background-color: white;
}
.msger-input {
  flex: 1;
  background: #ddd;
  width: 248px !important;
}
.msger-send-btn {
  margin-left: 10px;
  background: rgb(19, 47, 70);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
}
/* .msger-send-btn:hover {
  background: rgb(158, 120, 25);
} */

.msger-chat {
  background-color: #fcfcfe;
  background-image: url("../assets/backgroundChampions.jpg");
  background-size: cover;
  background-attachment: fixed;
  margin-bottom: 50px;
}
.background {
  background-image: url("../assets/marfil2.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
}
.newlogout {
  height: 30px;
}
.v-list .v-list-item--active {
  padding: 5px;
}

.logo {
  padding-top: 6px;
}
.authname {
  width: 100px;
  color: rgb(19, 47, 70);
  font-family: "friz_quadrataregular" !important;
}
</style>

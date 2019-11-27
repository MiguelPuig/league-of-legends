<template>
  <div>
    <div v-if="!auth">
      <img
        @click="googleLogin"
        src="../assets/icons8-google-48.png"
        alt="google Login"
      />
    </div>
    <div v-else>
      <div>
        <h4>{{ auth.name }}</h4>
        <img class="profileImage" :src="auth.avatar" alt="profile image" />
        <button @click="logOut">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";
import Chat from "./Chat";
export default {
  name: "login",
  components: {
    Chat
  },
  data() {
    return {
      auth: null
    };
  },
  methods: {
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
          };
          this.auth = user;
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
          that.auth = null;
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
};
</script>

<style>
.profileImage {
  width: 125px;
  cursor: pointer;
}
</style>

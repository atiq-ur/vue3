<template>
<AppHeader />
  <div class="w-full flex">
     <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal />
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import firebase from "./utilities/firebase";

export default {
    mounted(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('setIsLoggedIn', true);
          this.$store.commit('setAuthuser', user);
          // this.isLoggedIn = true;
          // this.authUser = user;
  
        } else {
          this.$store.commit('setIsLoggedIn', false);
          this.$store.commit('setAuthuser', {});
        }
      });
    },
      components: {AppHeader, LoginModal},

};
</script>

<style>

</style>
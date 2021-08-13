<template>
<AppHeader
@open-login-modal="isLoginOpen=true" />
  <div class="w-full flex">
     <router-view></router-view>
  </div>
  <LoginModal v-if="isLoginOpen" @close-login="isLoginOpen=false" />
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import firebase from "./utilities/firebase";

export default {
  components: {AppHeader, LoginModal},
  data(){
        return {
            isLoginOpen: false,
            // isLoggedIn: false,
            // authUser: {},
        }
    },
    mounted(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('setIsLoggedIn');
          this.$store.commit('setAuthuser', user);
          // this.isLoggedIn = true;
          // this.authUser = user;
  
        } else {
          this.isLoggedIn = false;
          this.authUser = {};
        }
      });
    }
}
</script>

<style>

</style>
<template>
  <section class="mt-4 text-center">
    <button @click="loginWithGoogle" class="border">Login with Google</button>
  </section>
</template>

<script>
import firebase from '../../utilities/firebase';
export default {
    methods: {
        loginWithGoogle(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth()
            .signInWithPopup(provider)
            .then(() => {
               this.$emit('close-login-from-google');
            });
        }
    },

}
</script>

<style>

</style>
<template>
<nav 
    class="w-full bg-gradient-to-r 
    from-blue-800 to-blue-600 
    text-white px-4 py-3">
    <router-link 
    v-for="item in list" 
    :key="item.to" 
    class="mx-2" 
    :to="item.to">
    {{ item.title }}
    </router-link>

    <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
    <button v-else class="mx-2" @click="openLogin">Login</button>
    

</nav>
</template>

<script>
import firebase from "../utilities/firebase";
export default {
    //props: {isLoggedIn: { type: Boolean, required: true }},
    data(){
        return {
            list:[
                { title: "Home", to: "/" },
                { title: "Dc Heros", to: "/dc-heros" },
                { title: "Calendar", to: "/calendar" },
                { title: "Markdown", to: "/markdown" },
                { title: "Slider", to: "/slider-carousel" },
                { title: "Calculator", to: "/calculator" },
                { title: "Resueable Modal", to: "/reuseable-modal" },
                { title: "Chat", to: "/chat" },
                { title: "User Crud", to: "/user-crud" },
            ],
            //store: this.$store.state;
        };
    }, 
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                console.log('signout successfully');
                }).catch((error) => {
                    console.log(error);
                });
        },
        openLogin(){
            // console.log('login Modal is clicked');
            this.$store.commit("setLoginModal", true);
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.state.isLoggedIn;
        }
    }

}
</script>

<style>

</style>
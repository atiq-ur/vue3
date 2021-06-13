<template>
<nav 
    class="w-full bg-gradient-to-r 
    from-blue-800 to-blue-600 
    text-white px-4 py-3">
    <router-link v-for="item in list" :key="item.to" 
    class="mx-2" :to="item.to">{{ item.title }}</router-link>

</nav>
</template>

<script>
export default {
    data(){
        return {
            list:[
                { title: "Home", to: "/" },
                { title: "Dc Heros", to: "/dc-heros" },
                { title: "Calendar", to: "/calendar" },
                { title: "Markdown", to: "/markdown" },
            ]
        }
    }

}
</script>

<style>

</style>
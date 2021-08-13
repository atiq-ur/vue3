<template>
<section class="flex w-full">
    <div class="m-auto">
        <h1 class="text-2xl my-5 w-full">Reuseable Modal</h1>
        <Modal v-if="isModal1Open" @close="isModal1Open = false">
            <template v-slot:title>
                <!-- <h1 class="text-red-500">Red Modal</h1> -->
                Modal 1
            </template>
            <template v-slot:body>
                <p>This body content</p>
            </template>
        </Modal>
        <button class="border rounded px-2 mx-4 bg-blue-500 text-white"  
            @click="isModal1Open = true">Modal 1</button>

        <Modal v-if="isModal2Open" @close="isModal2Open = false">
            <!-- Instead of v-slot: we can simply write # -->
            <template #title>
               Modal 2
            </template>
            <template #body>
                <p>This body content</p>
            </template>
            <!-- <h1 class="text-blue-500">Blue Modal</h1> -->
        </Modal> 
        <button class="border rounded px-2 mx-4 bg-blue-500 text-white" 
            @click="isModal2Open = true">Modal 2</button>
    </div>  
</section>
  
</template>

<script>
import Modal from "../components/Modal.vue"
import { ref } from "vue"
export default {
    components: {Modal},
    setup(){
        const isModal1Open = ref(false);
        const isModal2Open = ref(false);
        return { isModal1Open, isModal2Open };
    },

}
</script>

<style>

</style>
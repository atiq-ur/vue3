<template>
  <section class="flex w-full">
      <div class="m-auto mt-5">
          <h1 class="text-center text-2xl">Real Time Chat</h1>
          <div class="border rounded-lg">
              <div class="h-64 p-2">
                  <div 
                  v-for="chat in state.chats" 
                  :key="chat.message"
                  class="w-full"
                  :class="chat.userId === userId ? 'text-right' : ''"
                  >
                    {{ chat.message }}
                  </div>
              </div>
              <div class="h-8 p-2">
                <input type="text" 
                v-model="state.message"
                placeholder="Start Typing..."
                class="p-1 border rounded shadow"
                @keydown.enter="addMessage"
                />
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { chatsRef } from '../utilities/firebase';
import { useStore } from 'vuex'
export default {
    setup(){
        const  state = reactive({
            chats: [],
            message: "",
        });
        const store = useStore();
        const userId = computed(() => store.state.authUser.uid);
        onMounted(async() => {
            
            // const data = await state.collection.once("value");
            // // console.log(data.val());
            // state.chats = data.val();
            

            chatsRef.on('child_added', (snapshot) => {
                //state.userId = firebase.auth().currentUser.uid;
                state.chats.push({ key: snapshot.key, ...snapshot.val() });
                // state.chats = snapshot.val();
                // console.log(snapshot.key);
            });
            
        });
        function addMessage(){
            const newChat = chatsRef.push();
            
            newChat.set({ userId: userId.value, message: state.message});
            state.message = "";

        }


        return { state, addMessage, userId };
    },

}
</script>

<style>

</style>
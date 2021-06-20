<template>
  <section class="flex w-full">
      <div class="m-auto">
          <h1 class="text-2xl text-center">Calculator</h1>
          <p class="text-3xl text-right mt-10 w-36 h-10 overflow-x-scroll"
            style="direction:rtl">{{ currenNum }}</p>
            <div class="h-10">
                <small v-if="selectedOperation">{{ prevNum }} {{ selectedOperation }} {{ currenNum }}</small>
            </div>
          <div class="grid grid-cols-4 gap-1">
              <button @click="pressed('1')" class="p-2 w-10 h-10 border rounded shadow">1</button>
              <button @click="pressed('2')" class="p-2 w-10 h-10 border rounded shadow">2</button>
              <button @click="pressed('3')" class="p-2 w-10 h-10 border rounded shadow">3</button>
              <button @click="pressed('+')" class="p-2 w-10 h-10 border rounded shadow">+</button>
              <button @click="pressed('4')" class="p-2 w-10 h-10 border rounded shadow">4</button>
              <button @click="pressed('5')" class="p-2 w-10 h-10 border rounded shadow">5</button>
              <button @click="pressed('6')" class="p-2 w-10 h-10 border rounded shadow">6</button>
              <button @click="pressed('-')" class="p-2 w-10 h-10 border rounded shadow">-</button>
              <button @click="pressed('7')" class="p-2 w-10 h-10 border rounded shadow">7</button>
              <button @click="pressed('8')" class="p-2 w-10 h-10 border rounded shadow">8</button>
              <button @click="pressed('9')" class="p-2 w-10 h-10 border rounded shadow">9</button>
              <button @click="pressed('*')" class="p-2 w-10 h-10 border rounded shadow">*</button>
              <button @click="pressed('c')" class="p-2 h-10 border rounded shadow">C</button>
              <button @click="pressed('0')" class="p-2 h-10 border rounded shadow">0</button>
              <button @click="pressed('=')" class="p-2 w-10 h-10 border rounded shadow">=</button>
              <button @click="pressed('/')" class="p-2 w-10 h-10 border rounded shadow">/</button>
          </div>
      </div>

  </section>
</template>

<script>
import {onMounted, onUnmounted, ref } from 'vue';
export default {
    setup() {
    
        const operations = ['+', '-', '*', '/'];
        const numbers = ['1','2','3','4','5','6','7','8','9','0'];
        const currenNum = ref("");
        const prevNum = ref("");
        const selectedOperation = ref("");

        function pressed(value) {
            if (value == "=" || value =="Enter" ) calculate();
            else if(value == 'c') clear();
            else if (operations.includes(value)) applyOperation(value);
            else if(numbers.includes(value)) apprendNumber(value);
            
        }
        function apprendNumber(value) {
            currenNum.value = currenNum.value + value;
        }
        function applyOperation(value){
            calculate();
            prevNum.value = currenNum.value;
            currenNum.value = "";
            selectedOperation.value = value;

        }
        function calculate(){
            if(selectedOperation.value == "*") multiply();
            else if(selectedOperation.value == "/") divide();
            else if(selectedOperation.value == "+") sum();
            else if(selectedOperation.value == "-") subtract();

            prevNum.value = "";
            selectedOperation.value = "";
        }
        function multiply(){
            currenNum.value = prevNum.value * currenNum.value;
        }
        function divide(){
            currenNum.value = prevNum.value / currenNum.value;
        }
        function subtract(){
            currenNum.value = prevNum.value - currenNum.value;
        }
        function sum(){
            currenNum.value = +prevNum.value + +currenNum.value;
        }
        const clear = () => (currenNum.value = '');
        const handleKewdown = (e) => pressed(e.key);
        onMounted(() => window.addEventListener('keydown', handleKewdown));
        onUnmounted(() => window.removeEventListener('keydown', handleKewdown));

        return { currenNum, pressed, selectedOperation, prevNum, calculate };
    },
}
</script>

<style>

</style>
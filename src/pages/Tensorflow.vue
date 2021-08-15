<template>
  <section class="flex w-full">
      <div class="m-auto">
          <div class="mt-10">
              <h1 class="text-2xl my-2">Tensorflow Object Detection</h1>
              <div class="flex flex-wrap justify-center my-2">
                  <div class="w-full flex justify-center">
                    <button
                    v-if="!isStreaming"
                    @click ="openCamera"
                    class="w-32 p-2 px-2 py-1 border shadow-md rounded bg-gradient-to-r from-blue-800 to-indigo-800 text-white"
                    >
                    Open Camera
                    </button>
                    <div v-else class="flex justify-between">
                        <button   
                        @click ="stopStreaming"
                        class="w-32 p-2 px-2 py-1 border shadow-md rounded bg-gradient-to-r from-blue-800 to-indigo-800 text-white"
                        >
                        Stop Streaming
                        </button>

                        <button   
                        @click ="snapshot"
                        class="w-32 p-2 px-2 py-1 border shadow-md rounded bg-gradient-to-r from-blue-800 to-indigo-800 text-white"
                        >
                        Snapshot
                        </button>
                    </div>
                  </div>
                  <video ref="videoRef" autoplay="true" width="100"/>
              </div>
              <div class="flex flex-wrap justify-center">
                <img
                ref="imgRef" 
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=283&q=80" 
                alt=""
                width="200"
                crossorigin="anonymous"
                />
                <div class="w-full text-center my-4">
                    <button @click="detect" 
                    class="w-32 p-2 border shadow-md rounded bg-gradient-to-r from-red-800 to-pink-800 text-white"> 
                    <span v-if="isLoading">Loading ...</span> 
                    <span v-else>Detect Object</span> 
                    </button>
                    <div v-if="result.length > 0" class="w-full text-center">
                        <p> {{ result[0].class }}</p>
                    </div>
                </div>
                
                
              </div>

          </div>
      </div>
  </section>
</template>

<script>
import { ref } from 'vue';
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');
export default {

    setup(){
        const imgRef = ref('');
        const result = ref([]);
        const isLoading = ref(false);
        const isStreaming = ref(false);
        const videoRef = ref('');
        
        async function detect() {
            const img = imgRef.value;
            isLoading.value = true;
            // isLoading.value = true;

            // Load the model.
            const model = await cocoSsd.load();

            // Classify the image.
            const predictions = await model.detect(img);
            result.value = predictions;

            isLoading.value = false;
            

            // console.log('Predictions: ');
            // console.log(predictions);
        }

        async function openCamera(){
            if(navigator.mediaDevices.getUserMedia){
                const devices = await navigator.mediaDevices.enumerateDevices();
                const cams = devices.filter((device) => 
                device.kind == "videoinput");
                const camId = cams[0].deviceId;
                //console.log(camId);
                navigator.mediaDevices
                .getUserMedia({ video: {deviceId: {exact: camId}} }) 
                .then((stream) => {
                    isStreaming.value = true;
                    videoRef.value.srcObject = stream;
                });
            }
        }
        function stopStreaming(){
            const stream = videoRef.value.srcObject;
            const tracks = stream.getTracks();
            tracks.map(track => track.stop());
            isStreaming.value = false;
        }

        function snapshot(){
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoRef.value, 0,0,200,200);
            const data = canvas.toDataURL('image/png');
            imgRef.value.setAttribute("src", data);
            //console.log(canvas);
        }
        return { imgRef, result, detect, 
        isLoading, openCamera, videoRef, 
        isStreaming, stopStreaming,snapshot };
    }

}
</script>

<style>

</style>
<script setup>
import { ref, onMounted } from 'vue';
defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  positionX: {
    type: Number,
    required: true,
  },
  positionY: {
    type: Number,
    required: true,
  },
});

const rabbitRef = ref(null)
const fallSpeed = ref(10); // how fast we fall
const distance = ref(0)
const rabbitState = ref("")

//Make Rabbit Interactable, and able to be dragged. Keep track of STATE (dragged, falling, jumping, sleeping, etc) in a ref attribute, 
// and update the bottom to say what state is


onMounted(() => {
  const gravity = () => {
    const element   = rabbitRef.value;
    const tick = () => {
      //get parent Div
      const container = element.offsetParent;
      //if no parent div, return
      if (!container) {
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      // get the height of the window
      //const { innerHeight } = window;

      // get the position of the bottom of the element on the screen
      const { bottom } = element.getBoundingClientRect();

      // if we're not at the bottom of the screen...
      if(bottom < containerBottom){
          rabbitState.value="FALLING"
          // ...increase the distance we've fallen...
          distance.value += fallSpeed.value;

          // ...apply the fallen distance to the element...
          element.style.transform = `translateY(${distance.value}px)`;

          // ...and queue up the next frame to do it all again
          requestAnimationFrame(tick);
      }else{
        rabbitState.value="IDLE"
      }
    }
    requestAnimationFrame(tick);
  }
  gravity()
})

//handle state for rabbit here. If rabbit is interacted with,
//  pass whatever is interacted with through properties
</script>

<template>
  <div class="rabbit" ref="rabbitRef">
    <div>
      <img src="../../public/rabbit-sit.png" style="height: 60px; width: 60px" />
    </div>
    <div>{{ rabbitState }}</div>
  </div>
</template>

<style scoped>
.rabbit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

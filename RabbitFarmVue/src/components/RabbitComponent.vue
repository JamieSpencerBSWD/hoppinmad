<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
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
  dragged: {
    type: Boolean,
    required: true,
  },
  imgWidth: {
    type: Number,
    required: true,
  },
  imgHeight: {
    type: Number,
    required: true,
  },
})

const rabbitRef = ref(null)
const fallSpeed = ref(2) // how fast we fall
const distance = ref(0)
const rabbitState = ref('')
const rabbitIMG = ref('')

const posX = ref()
const posY = ref()

watch(
  () => props.dragged,
  (newValue) => {
    //When mouse is Down/dragged = true, set Fall Speed to 0, so no gravity is applied
    //if dragged is False, set speed back to 8
    rabbitState.value = 'DRAGGING'
    newValue == true ? (fallSpeed.value = 0) : (fallSpeed.value = 2)
    //update Rabbit Position to be where the mouse is, at all times
    moveRabbit()
  },
)
//Make Rabbit Interactable, and able to be dragged. Keep track of STATE (dragged, falling, jumping, sleeping, etc) in a ref attribute,
// and update the bottom to say what state is
const moveRabbit = () => {
  console.log(props.positionX, props.positionY)
  //Handle Logic for moving rabbit around / having rabbit follow mouse in here
}
onMounted(() => {
  const gravity = () => {
    const element = rabbitRef.value
    const tick = () => {
      //get parent Div
      const container = element.offsetParent
      //if no parent div, return
      if (!container) {
        return
      }
      // get the height of the window
      const containerRect = container.getBoundingClientRect()
      const containerBottom = containerRect.bottom

      // get the position of the bottom of the element on the screen
      const { bottom } = element.getBoundingClientRect()
      // if we're not at the bottom of the screen...
      if (bottom < containerBottom) {
        //Update Animation Frame or PNG to show Falling State
        if (props.dragged != true) {
          rabbitState.value = 'FALLING'
        }
        // ...increase the distance we've fallen...
        distance.value += fallSpeed.value
        // ...apply the fallen distance to the element...
        element.style.transform = `translateY(${distance.value}px)`
        // Update the Position X and Y properties in the component

        //these two just keep track of the current position of the component, so that we may see it
        posX.value = element.getBoundingClientRect().left
        posY.value = element.getBoundingClientRect().top
        // ...and queue up the next frame to do it all again
        requestAnimationFrame(tick)
      } else {
        rabbitState.value = 'IDLE'
      }
      rabbitIMG.value = '/rabbit' + rabbitState.value + '.png'
    }
    requestAnimationFrame(tick)
  }
  gravity()
})
//handle state for rabbit here. If rabbit is interacted with,
//  pass whatever is interacted with through properties
</script>

<template>
  <div
    class="rabbit"
    ref="rabbitRef"
    :style="{
      left: props.positionX + 'px',
      top: props.positionY + 'px',
      // left: props.positionX  - props.imgWidth / 2 + 'px',
      // top: props.positionY  - props.imgHeight / 2 + 'px',
    }"
  >
    <div style="height: 60px; width: 60px; background-color: green;">
      <!-- Change so Style (rotate 45 deg) is applied when in FALLING state, and rotate(0deg) is applied when in IDLE state -->
      <!-- <img src="/rabbit-sit.png" style="height: 60px; width: 60px" /> -->
    </div>
    <div>({{ dragged }}) - {{ rabbitState }}</div>
    <p>{{ posX }}, {{ posY }}</p>
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

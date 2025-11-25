<script setup>
import { ref, watch } from 'vue'

//WHAT THE RABBIT COMPONENT SHOULD DO
/*
- Show the rabbit visually
- React to events passed through (switch images based on STATE)
- Emit events when interacting, like dragging
- Basically, just the display layer

- WHAT THE RABBIT COMPONENT NEEDS
- X and Y position from parent
- Width and Height from parent
- State from parent
- Emit events (dragStart, dragEnd, etc)
*/

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
  mousePosition: {
    type: Object,
    required: false,
  },
})

//RABBIT COMPONENT SHOULDNT MANAGE ANYTHING BUT ITS OWN STATE, AND REACT ACCORDINGLY
/*EVENTS TO EMIT FROM RABBIT COMPONENT:

  - dragStart/End (or dragged, and react when bool flips)
  - right-click (account for deletion)
  - hover/leave (to check if we CAN drag, i.e. if the user is hovering, and clicks, start dragging)


*/

//emit that we updated the position of the rabbit so we can update this in the parent.
//unneeded as we will be calling the rabbits from the rabbitArray
const emit = defineEmits(['updatePosition'])

//const rabbitRef = ref(null)
const fallSpeed = 20 // how fast we fall
const rabbitState = ref('')
const rabbitIMG = ref('')

//MOVE TICK/GRAVITY INTO PARENT

//we know the coords of the rabbit, we dont need refsss
const gravityTick = () => {
  requestAnimationFrame(gravityTick)
  //replace with bottom of container when moving into HomePage component
  const containerBottom = 500
  // get the position of the bottom of the element on the screen
  const bottom = props.positionY + props.imgHeight
  // if we're not at the bottom of the screen
  if (bottom < containerBottom) {
    //Update Animation Frame or PNG to show Falling State
    if (props.dragged != true) {
      rabbitState.value = 'FALLING'
      //Update the Y position of the value, and emit that up to the container
      updatePosition(props.positionX, props.positionY + fallSpeed)
    }
    // request Tick to rechect gravity again (continuous loop)
  } else {
    rabbitState.value = 'IDLE'
  }
  // Update IMG to point to whatever the state variable is
  rabbitIMG.value = '/rabbit' + rabbitState.value + '.png'
}
//requestAnimationFrame queues up the next frame and tells the browser to call a specific function before the next rerender
requestAnimationFrame(gravityTick)

watch(
  // watches Props.Dragged, MousePosition X, and MousePosition Y
  () => [props.dragged, props.mousePosition.x, props.mousePosition.y],
  ([dragged]) => {
    // if we are dragging the mouse
    if (dragged) {
      // Rabbit follows mouse
      // IF WE HAVE MOUSE POSITION PASSED
      updatePosition(
        props.mousePosition.x - props.imgWidth / 2,
        props.mousePosition.y - props.imgHeight / 2,
      )
      if (props.mousePosition) {
        // Set fallSpeed to 0, and state to DRAGGING
        rabbitState.value = 'DRAGGING'

        // Set x and y position of rabbit to x and y position of mouse
      }
      // Otherwise, resume gravity / set fallSpeed back to 2
    }
  },
)

//TODO
// Make Rabbit Interactable, and able to be dragged. Keep track of STATE (dragged, falling, jumping, sleeping, etc) in a ref attribute,
// and update the bottom to say what state is

// Updates the position of the rabbit component, and passes it through to the parent component
const updatePosition = (x, y) => {
  // emits rabbits position so parent component can see it in the browser
  emit('updatePosition', {
    id: props.id,
    x,
    y,
  })
}

// handle state for rabbit here? If rabbit is interacted with,
//  pass whatever is interacted with through properties/emission.
// i.e. if user interacts with Rabbit component with Carrot, pass interaction via props, and execute whatever will happen
</script>

<template>
  <div
    class="rabbit"
    :style="{
      left: positionX + 'px',
      top: positionY + 'px',
      cursor: props.dragged ? 'grabbing' : 'grab',
    }"
  >
    <!-- Change so Style (rotate 45 deg) is applied when in FALLING state, and rotate(0deg) is applied when in IDLE state -->
    <img
      :src="rabbitIMG"
      :style="{
        height: imgHeight + 'px',
        width: imgWidth + 'px',
      }"
      draggable="false"
    />
  </div>
</template>

<style scoped>
.rabbit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>

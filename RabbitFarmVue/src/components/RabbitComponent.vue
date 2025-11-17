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
  mousePosition: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['updatePosition'])

const rabbitRef = ref(null)
const fallSpeed = ref(props.dragged?0:2) // how fast we fall
const rabbitState = ref('')
// const rabbitIMG = ref('')

// current X and Y position of rabbit component
const yPosition = ref(props.positionY)
const xPosition = ref(props.positionX)

const gravity = () => {
  const rabbitElement = rabbitRef.value
  const tick = () => {
    // get parent Div, relative to what the element referencing the RabbitElement is
    const container = rabbitElement.offsetParent
    //if no parent div, stop gravity
    if (!container) {
      return
    }
    // get the height of the window
    const containerRect = container.getBoundingClientRect()
    const containerBottom = containerRect.bottom

    // get the position of the bottom of the element on the screen
    const { bottom } = rabbitElement.getBoundingClientRect()
    // if we're not at the bottom of the screen
    if (bottom < containerBottom) {
      //Update Animation Frame or PNG to show Falling State
      if (props.dragged != true) {
        rabbitState.value = 'FALLING'
      }
      // and increase the distance fallen (only on Y axis)

      // comp falling faster if the mouse is moving, or if were dragging could have something to do with this
      yPosition.value += fallSpeed.value

      // update the Position X and Y properties in the component
      updatePosition()
      // request Tick to rechect gravity again (continuous loop)

      requestAnimationFrame(tick)
    } else {
      rabbitState.value = 'IDLE'
    }
    // Update IMG to point to whatever the state variable is
    // rabbitIMG.value = '/rabbit' + rabbitState.value + '.gif'
  }
  requestAnimationFrame(tick)
  
}

onMounted(() => {
  gravity()
})



watch(
  // watches Props.Dragged, MousePosition X, and MousePosition Y
  () => [props.dragged, props.mousePosition.x, props.mousePosition.y],
  ([dragged]) => {
    console.log(fallSpeed.value)
    // if we are dragging the mouse
    if (dragged) {
      // Rabbit follows mouse
      // IF WE HAVE MOUSE POSITION PASSED
      if (props.mousePosition) {
        // Set fallSpeed to 0, and state to DRAGGING
        console.log('DRAGGING!!!')
        rabbitState.value = 'DRAGGING'
        // Set x and y position of rabbit to x and y position of mouse
        xPosition.value = props.mousePosition.x - props.imgWidth / 2
        yPosition.value = props.mousePosition.y - props.imgHeight / 2
      }
      // Otherwise, resume gravity / set fallSpeed back to 2
      updatePosition()
      
    } else {
      // Reset state to Falling or Idle and call Gravity once again
      // Maybe find a way to always be calling the Gravity function? unsure. This works for now.
      gravity()
    }
    
  },
)

//TODO
// Make Rabbit Interactable, and able to be dragged. Keep track of STATE (dragged, falling, jumping, sleeping, etc) in a ref attribute,
// and update the bottom to say what state is

// Updates the position of the rabbit component, and passes it through to the parent component
const updatePosition = () => {
  // emits rabbits position so parent component can see it in the browser
  emit('updatePosition', {
    id: props.id,
    x: xPosition.value,
    y: yPosition.value,
  })
}


// handle state for rabbit here? If rabbit is interacted with,
//  pass whatever is interacted with through properties/emission.
// i.e. if user interacts with Rabbit component with Carrot, pass interaction via props, and execute whatever will happen
</script>

<template>
  <div
    class="rabbit"
    ref="rabbitRef"
    :style="{
      left: xPosition + 'px',
      top: yPosition + 'px',
    }"
  >
    <div>
      <p>{{ rabbitState }}</p>
      <!-- Change so Style (rotate 45 deg) is applied when in FALLING state, and rotate(0deg) is applied when in IDLE state -->
      <!-- <img src="/rabbit-sit.png" style="height: 60px; width: 60px" /> -->
    </div>
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

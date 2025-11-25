<script setup>
import { computed, watch } from 'vue'

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
  state: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['dragStart', 'dragEnd', 'rightClick'])

const rabbitIMG = computed(() => {
  if (props.state === 'FALLING') return '/images/rabbitFALLING.png'
  if (props.state === 'DRAGGING') return '/images/rabbitDRAGGING.png'
  return '/images/rabbitIDLE.png'
})

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
      // Otherwise, resume gravity / set fallSpeed back to 2
    }
  },
)

const updatePosition = (x, y) => {
  // emits rabbits position so parent component can see it in the browser
  emit('updatePosition', {
    id: props.id,
    x,
    y,
  })
}

//RABBIT COMPONENT SHOULDNT MANAGE ANYTHING BUT ITS OWN STATE, AND REACT ACCORDINGLY
/*EVENTS TO EMIT FROM RABBIT COMPONENT:

  - dragStart/End (or dragged, and react when bool flips)
  - right-click (account for deletion)
  - hover/leave (to check if we CAN drag, i.e. if the user is hovering, and clicks, start dragging)

*/

//should emit the current state it is in, as what interaction it is doing
//i.e. dragging true/false

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
    @mousedown="() => emit('dragStart', props.id)"
    @mouseup.stop="() => emit('dragEnd', props.id)"
    @contextmenu.prevent="() => emit('rightClick', props.id)"
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

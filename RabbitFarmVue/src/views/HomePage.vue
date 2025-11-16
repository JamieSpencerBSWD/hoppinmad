<script setup>
import { ref, reactive } from 'vue'
import Rabbit from '../components/RabbitComponent.vue'

let retrievedStorage = localStorage.getItem('rabbitsLS')
let retArray = JSON.parse(retrievedStorage)

const rabbitID = ref(retArray ? retArray.length : 0)
const rabbitArray = ref(retArray ? retArray : [])

const dragging = ref(false)
//Save Mouse Position
const mousePosition = reactive({
  x: 0,
  y: 0,
})
const hover = ref(false)
//creates a new rabbit at the current mouse position and persists it in localStorage
    //Also uses rabbit Schema
const addRabbit = () => {
  const id = rabbitID.value++ //Get Rabbit ID
  const { x, y } = mousePosition //get Mouse Position X and Y

  rabbitArray.value.push({
    id,
    name: `Rabbit ${id}`,
    positionX: x,
    positionY: y,
    dragged: false,
    imgWidth: 60,
    imgHeight: 60,
  }) //Push to Array, following Schema in Rabbit Component

  let rabbits = JSON.stringify(rabbitArray.value)
  localStorage.setItem('rabbitsLS', rabbits)
}

//removes rabbit that was right-clicked, and updates local storage
    //if id is not provided (i.e., just clicking on the FIELD div), deletes the lat rabbit in the array
const removeRabbit = (id) => {
  if (id == null) {
    rabbitArray.value.pop()
  } else {
    const index = rabbitArray.value.findIndex((r) => r.id === id)

    if (index !== -1) {
      console.log('Removing rabbit with ID:', id)
      rabbitArray.value.splice(index, 1)
    }
  }
  localStorage.setItem('rabbitsLS', JSON.stringify(rabbitArray.value))
}

// Clears all rabbits, resets the array and increment value, and clears local storage
const clearAllRabbits = () => {
  rabbitArray.value = []
  rabbitID.value = 0
  localStorage.clear()
}



//Handles Mouse Position
const handleMouseMove = (event) => {
  hover.value = true
  mousePosition.x = event.clientX
  mousePosition.y = event.clientY
}


const handleDragRabbit = (rabbitParam) => {
  //set DRAGGING to whatever dragging isnt
  dragging.value = !dragging.value
  const matchingRabbit = rabbitArray.value.find((rabbit) => rabbit.id === rabbitParam.id)
  //set rabbit.dragged to true, so we can then set the rabbits fall speed inside component
  matchingRabbit.dragged = true
}
</script>

<template>
  <section class="mousePosition">
    <h1>
      Mouse position is at {{ mousePosition.x }},
      {{ mousePosition.y }} 
    </h1>
  </section>

  <!-- Container for Field and Tools, also ensures Rabbits stay within the "FIELD" -->
  <div style="display: flex; flex-direction: row">
    <section
      class="field"
      @click="addRabbit"
      @click.right.prevent="removeRabbit()"
      @mousemove="handleMouseMove"
      @mouseleave="hover = false"
      style="padding: 5px"
    >
      <!-- Clickable Area that spawns rabbits -->
    </section>
    <Rabbit
      v-for="rabbit in rabbitArray"
      @click.right.prevent="removeRabbit(rabbit?.id)"
      :key="rabbit.id"
      v-bind="rabbit"
      @pointerdown="handleDragRabbit(rabbit)"
      @pointerup="rabbit.dragged = false"
      style="position: absolute; z-index: 1"
    />
    <!-- "v-bind=rabbit" automatically binds the rabbit name, positionX, positionY, etc to the component, 
        and works as long as the components properties are the same name as the objects Name, X, and Y values-->
    
    <section class="toolBar">
      <h1>Tools</h1>
      <button @click="clearAllRabbits">Clear All Rabbits</button>
    </section>
  </div>
</template>

<style scoped>
.field {
  position: relative;
  overflow: hidden;
  left: 0px;
  bottom: 0px;
  /* width: 100%;
    height: 100vh; */
  width: 100%;
  height: 85vh;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
}
.mousePosition {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid green;
}
.toolBar {
  border: 1px solid black;
  width: 10%;
}
</style>

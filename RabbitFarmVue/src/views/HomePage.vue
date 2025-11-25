<script setup>
import { ref, reactive, useTemplateRef } from 'vue'
import Rabbit from '../components/RabbitComponent.vue'

//WHAT THE HOMEPAGE SHOULD DO
/*
-Create and manage rabbits
-Act as a single source of truth for all rabbits
-Handle interactions with rabbits
-Handle Gravity, physics, and anything else
-Act as a State Machine (Dragging, Falling, Idle, etc)

*/

let retrievedStorage = localStorage.getItem('rabbitsLS')
let localStorageArray = JSON.parse([retrievedStorage])
console.log('returnedArray', localStorageArray)
let fieldDiv = useTemplateRef('fieldDiv')
//make array shaped :O

let rabbitID = localStorageArray ? localStorageArray.length : 0
const rabbitArray = ref(localStorageArray ? localStorageArray : [])
let canSpawn = ref(true)

// Save Mouse Position
const mousePosition = reactive({
  x: 0,
  y: 0,
})
const hover = ref(false)
// creates a new rabbit at the current mouse position and persists it in localStorage
// Also uses rabbit Schema
const addRabbit = () => {
  //if we can spawn rabbits, (if a rabbit isnt being hovered over or dragged)
  //and we arent at the maximum number of rabbits we can spawn (100-200)
  //then spawn rabbits
  let maxNumOfRabbits = 200
  if (canSpawn.value === true && rabbitArray.value.length < maxNumOfRabbits) {
    const id = rabbitID++ // Get Rabbit ID
    const { x, y } = mousePosition // get Mouse Position X and Y
    const size = 30 + Math.random() * 60
    rabbitArray.value.push({
      id,
      name: `Rabbit ${id}`,
      positionX: x,
      positionY: y,
      dragged: false,
      imgWidth: size,
      imgHeight: size,
    }) // Push to Array, following Schema in Rabbit Component

    let rabbits = JSON.stringify(rabbitArray.value)
    localStorage.setItem('rabbitsLS', rabbits)
    canSpawn.value = true
  }
}

// removes rabbit that was right-clicked, and updates local storage
// if id is not provided (i.e., just clicking on the FIELD div), deletes the last rabbit in the array
const removeRabbit = (id) => {
  if (id !== null) {
    const index = rabbitArray.value.findIndex((rabbit) => rabbit.id === id)

    if (index !== -1) {
      //removes rabbit from array whos id matches the id passed
      console.log('Removing rabbit with ID:', id)
      rabbitArray.value.splice(index, 1)
    }
  }
  // save to localStorage
  localStorage.setItem('rabbitsLS', JSON.stringify(rabbitArray.value))
  canSpawn.value = true
}

// Clears all rabbits, resets the array and increment value, and clears local storage
const clearAllRabbits = () => {
  rabbitArray.value = []
  rabbitID = 0
  localStorage.clear()
}

// Recieves X, Y, and ID of rabbit component and updates accordingly
const updateRabbitPosition = ({ id, x, y }) => {
  // find the rabbit in the array whos ID matches our own ID
  const rabbit = rabbitArray.value.find((rabbit) => rabbit.id === id)
  // if rabbit doesnt exist, then stop and do not update array (would throw err as rabbit doesnt exist. Null Pointer?)
  if (!rabbit) return
  // update position
  rabbit.positionX = x
  rabbit.positionY = y
  // save updated to local storage
  localStorage.setItem('rabbitsLS', JSON.stringify(rabbitArray.value))
}

// Handles Mouse Position
const handleMouseMove = (event) => {
  hover.value = true
  mousePosition.x = event.offsetX
  mousePosition.y = event.offsetY
  //BUG
  /*When were updaitng the mouse position, 
    were getting the X and Y coordinates based on the surrounding element were within
  NOT based on just the fieldDiv element 
    Find a way to ignore the div for the rabbit, 
  or add the rabbits offsetX and Y to the offsetX and Y of the fieldDiv*/
}

//FROM HERE DOWN IS ALL FROM RABBIT COMPONENT
//CUT AND PASTE BACK INTO RC TO FIX

/* 
- iterate through the rabbit array
- if (rabbitIDParam) = rabbitArray[i].id
- If the rabbit is being dragged, set state to dragged and skip gravity (turn fallspeed to 0)
-  Else, execute gravity logic
-    (if bottom < containerBottom) then positionY += fallSpeed & state = 'Falling'
-    Update position X and Y in rabbit component and send to that specific rabbit passed through
-  Else if state = 'IDLE', weve reached the bottom of the field box
*/
</script>

<template>
  <div>
    <section class="mousePosition">
      <p>Click to spawn a rabbit, right click to despawn!</p>
      <h1>
        Mouse is at {{ mousePosition.x }},
        {{ mousePosition.y }}
      </h1>
    </section>

    <!-- Container for Field and Tools, also ensures Rabbits stay within the "FIELD" -->
    <div style="display: flex; flex-direction: row">
      <section
        class="field"
        ref="fieldDiv"
        @mousedown.left="addRabbit"
        @click.right.prevent="removeRabbit()"
        @mousemove.capture.self="handleMouseMove"
        @mouseleave="hover = false"
        style="padding: 5px"
      >
        <!-- Clickable Area that spawns rabbits -->
        <!-- When right clicking a rabbit, it deleted the rabbit selected, 
          but also removes the last rabbit in the array -->

        <!-- TODO: Change canSpawn to be emitted from rabbit when dragging, 
          and toggled on and off when idle. Prevent double clicking to spawn after dragging a rabbit -->
        <Rabbit
          v-for="rabbit in rabbitArray"
          @click.right.prevent="removeRabbit(rabbit?.id)"
          :key="rabbit.id"
          v-bind="rabbit"
          :mousePosition="mousePosition"
          @mousemove="canSpawn = false"
          @mouseleave="canSpawn = true"
          @updatePosition="updateRabbitPosition"
          @mousedown.left="rabbit.dragged = true"
          @mouseup.left="rabbit.dragged = false"
          style="position: absolute; border: 1px solid blue; z-index: 1"
        />
      </section>

      <!-- :mousePosition binds the mousePosition (x and y object) to each Rabbit component. Those are then passed through properties
              and watched for changes. If we have changes, and are dragging, we stop gravity, and emit the position back to the parent
                component, which then updates the position.-->
      <!-- @updatePosition is what is emited from the child component. Emission allows the parent to recieve stuff from the child component
          Parent component should now be recieving the ID, X, and Y coordinates of the child component-->
      <!-- "v-bind=rabbit" automatically binds the rabbit name, positionX, positionY, etc to the component, 
          and works as long as the components properties are the same name as the objects Name, X, and Y values-->

      <section class="toolBar">
        <h1>Tools</h1>
        <button @click="clearAllRabbits">Clear All Rabbits</button>
        <p>
          Rabbits Spawned:
          {{
            rabbitArray.length < 200
              ? rabbitArray.length
              : rabbitArray.length + ' - Max Number of Rabbits Spawned!'
          }}
        </p>
        <!-- If were hovering over the spawnable place, AND not currently hovering over a rabbit, then we can spawn more rabbits -->
        <p>Can Spawn Rabbits: {{ canSpawn === true && hover === true ? true : false }}</p>
        <!-- Tools: Pause Rabbits, Resume Rabbits, Despawn All, interactions -->
      </section>
    </div>
  </div>
</template>

<style scoped>
.field {
  position: relative;
  overflow: hidden;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 85vh;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  cursor: pointer;
}
.mousePosition {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid green;
}
.toolBar {
  padding: 10px;
  border: 1px solid black;
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
</style>

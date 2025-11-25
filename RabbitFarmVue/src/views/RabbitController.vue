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
let localStorageArray = JSON.parse(retrievedStorage)
//const fieldDiv = ref(null);
let rabbitID = localStorageArray ? localStorageArray.length : 0

const rabbitArray = ref(localStorageArray ? localStorageArray : [])

const field = useTemplateRef("fieldDiv")
let canSpawn = ref(true)
const mousePosition = reactive({
  x: 0,
  y: 0,
})
const hover = ref(false)

let maxNumOfRabbits = 100
const stopSpawning = ref(false)


const addRabbit = () => {
  //if we can spawn rabbits, (if a rabbit isnt being hovered over or dragged)
  //and we arent at the maximum number of rabbits we can spawn (100-200)
  //then spawn rabbits
  console.log("FieldDiv Offset Height: ", field.value.offsetHeight)
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
      state: 'IDLE',
    }) // Push to Array, following Schema in Rabbit Component, and save to localStorage
    let rabbits = JSON.stringify(rabbitArray.value)
    localStorage.setItem('rabbitsLS', rabbits)
    canSpawn.value = true
  }
}

//function to wait for X ms
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const spawningRabbits = ref(false);
const addXRabbits = async(num) => {
  stopSpawning.value = false;
  spawningRabbits.value = true;
  //get height and width of field Div
  const fieldHeight = field?.value.offsetHeight;
  const fieldWidth = field?.value.offsetWidth;

  for (let i = 0; i < num; i++) {
    //stop spawning the rabbits if Stop Spawning is pressed
    if(stopSpawning.value == true){
      console.log("Stopping spawning");
      break;
    }

    //same code as AddRabbits function, 
    // except were modifying the x and y position to be random x and y coords in the fieldDiv
    if(rabbitArray.value.length < maxNumOfRabbits){
      const id = rabbitID++ // Get Rabbit ID
      const size = 30 + Math.random() * 60

      rabbitArray.value.push({
        id,
        name: `Rabbit ${id}`,
        positionX: Math.floor(Math.random() * fieldWidth + 30) - (size * 2),
        positionY: Math.floor(Math.random() * fieldHeight + 30) - (size * 2),
        dragged: false,
        imgWidth: size,
        imgHeight: size,
        state: 'IDLE',
      }) 
      // Push to Array, following Schema in Rabbit Component, and save to localStorage
      //wait for 1/20th of a second, then continue
      await sleep(50)
      let rabbits = JSON.stringify(rabbitArray.value)
      
      localStorage.setItem('rabbitsLS', rabbits)
      canSpawn.value = true
    }
    else{
      break;
    }
  }
  await sleep(100)
  spawningRabbits.value = false;
}

// removes rabbit that was right-clicked, and updates local storage
const removeRabbit = (id) => {
  //find rabbit in array if we have an id passed
  if (id !== null) {
    const index = rabbitArray.value.findIndex((rabbit) => rabbit.id === id)
    if (index !== -1) {
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

// Recieves X, Y, and ID of rabbit component and updates the corresponding entry in the array accordingly
const updateRabbitPosition = ({ id, x, y }) => {
  const rabbit = rabbitArray.value.find((rabbit) => rabbit.id === id)
  rabbit.positionX = x
  rabbit.positionY = y
  localStorage.setItem('rabbitsLS', JSON.stringify(rabbitArray.value))
}

// Handles Mouse Position
const handleMouseMove = (event) => {
  hover.value = true
  mousePosition.x = event.offsetX
  mousePosition.y = event.offsetY
  if(rabbitArray.value.length <= maxNumOfRabbits){
    canSpawn.value = true
  }else{
    canSpawn.value = false
  }
  //BUG
  /*When were updaitng the mouse position, 
    were getting the X and Y coordinates based on the surrounding element were within
  NOT based on just the fieldDiv element 
    Find a way to ignore the div for the rabbit, 
  or add the rabbits offsetX and Y to the offsetX and Y of the fieldDiv*/
}

//FROM HERE DOWN IS ALL FROM RABBIT COMPONENT

//const rabbitRef = ref(null)
const fallSpeed = 1 // how fast we fall ( >>> Doesn't work to control the fall speed anymore?? <<< )

const gravityTick = () => {
  //For Every rabbit in the array...
  rabbitArray.value.forEach((rabbit) => {
    // (replace with bottom of container when moving into HomePage component)
    const containerBottom = (field.value.offsetHeight);
    const floor = containerBottom-10
    // ...get the position of the bottom of the element on the screen
    
    
    //! BUG: RABBITS STILL STOP AT ABOUR 100 PX FROM THE BOTTOM. THEY SHOULD HIT THE BOTTOM
    
    
    const bottom = rabbit.positionY + rabbit.imgHeight
    //... if were not dragging
    if (!rabbit.dragged && rabbit.state !== 'IDLE') {
      // ...and if we're not at the bottom of the screen
      if (bottom < floor) {
        
          rabbit.state = 'FALLING'
          //"Apply gravity", i.e. increace the y position of the rabbit

          updateRabbitPosition(rabbit.id, rabbit.positionX, rabbit.positionY + fallSpeed)
          
          // >>> This feels very intensive and unnecessary <<<
          // >>> I don't like that its going through EVERY SINGLE ENTRY and applying it regardless
        }
        else {
        rabbit.state = 'IDLE'
        rabbit.positionY = floor - rabbit.imgHeight  
        }
      } 
  })
  requestAnimationFrame(gravityTick)
}
//requestAnimationFrame queues up the next frame and tells the browser to call a specific function before the next rerender
requestAnimationFrame(gravityTick)

// //TODO
// // Make Rabbit Interactable, and able to be dragged. Keep track of STATE (dragged, falling, jumping, sleeping, etc) in a ref attribute,
// // and update the bottom to say what state is

// // Updates the position of the rabbit component, and passes it through to the parent component
// const updatePosition = (x, y) => {
//   // emits rabbits position so parent component can see it in the browser
//   emit('updatePosition', {
//     id: props.id,
//     x,
//     y,
//   })
// }

//NEW STUFF: ===>
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
        <button @click="addXRabbits(10)">Add 10 Rabbits</button>
        <button @click="addXRabbits(100)">Add 100 Rabbits</button>
        <button v-show="spawningRabbits" @click="stopSpawning = true, spawningRabbits = false">STOP SPAWNING</button>
        <p>
          Rabbits Spawned:
          {{
            rabbitArray.length < maxNumOfRabbits
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

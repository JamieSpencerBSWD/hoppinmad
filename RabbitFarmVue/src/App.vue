<script setup>
import { ref, reactive } from 'vue'
import Rabbit from './components/RabbitComponent.vue'

const rabbitID = ref(0)
const rabbitArray = ref([])

const addRabbit = () => {
  const id = rabbitID.value++ //Get Rabbit ID
  const { x, y } = mousePosition //get Mouse Position X and Y

  rabbitArray.value.push({ id, 
    name: `Rabbit ${id}`, 
    positionX: x, 
    positionY: y }) //Push to Array

}
const removeRabbit = () => {
  rabbitArray.value.pop()
}

// watch(rabbitID, () => {
//   rabbitArray.value.push({
//     id: rabbitID.value,
//     name: 'Rabbit ' + rabbitID.value,
//     positionX: mousePosition.x,
//     positionY: mousePosition.y,
//   })
//   console.log(rabbitArray)
// })

//Demo code to get Mouse Position
const mousePosition = reactive({
  x: 0,
  y: 0,
})
const hover = ref(false)

const handleMouseMove = (event) => {
  hover.value = true
  mousePosition.x = event.clientX
  mousePosition.y = event.clientY
}
</script>

<template>
  <div
    class="wrapper"
    @click="addRabbit"
    @click.right.prevent="removeRabbit"
    @mousemove="handleMouseMove"
    @mouseleave="hover = false"
  >
    <div v-if="hover">
      <h1>
        Mouse position is at {{ mousePosition.x }},
        {{ mousePosition.y }}
      </h1>
    </div>
    <Rabbit
      v-for="rabbit in rabbitArray"
      :key="rabbit.id"
      v-bind="rabbit" 
      :style="{position:'absolute', left:rabbit.positionX-30+'px', top:rabbit.positionY-30+'px'}"
    />
    <!-- "v-bind=rabbit" automatically binds the rabbit name, positionX, positionY o the component, 
      and works as long as the components properties are the same name as the objects Name, X, and Y values-->
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  border: 1px solid rgb(167, 99, 99);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
}
</style>

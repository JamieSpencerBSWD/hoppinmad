<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  positionX: {
    type: String,
    required: true,
  },
  positionY: {
    type: String,
    required: true
  }
})

//handle state for rabbit here. If rabbit is interacted with,
//  pass whatever is interacted with through properties
</script>

<template>
  <div class="rabbit">
    <img src="../../public/rabbit-sit.png" style="height: 60px; width: 60px;"/>
    <p class="green">Rabbit ({{ name }}): - X:{{ positionX }}, Y: {{ positionY }}</p>
  </div>
</template>

<style scoped>
  .rabbit{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

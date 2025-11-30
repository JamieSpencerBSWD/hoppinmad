<script setup lang="ts">
import type { Rabbit } from '@/models/rabbits';

const rabbit = defineProps<Rabbit>();
</script>
<template>
	<div>
		<h1>Name is currently: {{ rabbit.name }}</h1>
		<h3>Is Grumpy?: {{ rabbit.isDragged }}</h3>
		<h3>Power Level: {{ rabbit.powerLevel }}</h3>
		<h3>Position X: {{ rabbit.positionX }}</h3>
		<h3>Position Y: {{ rabbit.positionY }}</h3>
		<h3>Velocity X: {{ rabbit.velocityX }}</h3>
		<h3>velocityY: {{ rabbit.velocityY }}</h3>
		<h3>Speed: {{ rabbit.speed }}</h3>
		<h3>Mouse Position (X, Y): {{ rabbit.mousePosition.x + " , " + rabbit.mousePosition.y }}</h3>
		<h3>Size: {{ rabbit.size }}</h3>
	</div>
</template>

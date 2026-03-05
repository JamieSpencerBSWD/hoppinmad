<script setup lang="ts">
import { addRabbit, draggedRabbit, rabbits, removeAllRabbits, removeRabbitByIndex } from '@/models/rabbits';
//import RabbitEditor from '@/components/RabbitEditor.vue';
import RabbitViewer from '@/components/RabbitViewer.vue';
import { onMounted, ref, useTemplateRef } from 'vue';

import { mousePosition } from '@/models/mouse';
const spawning = ref(false);
const hover = ref(false);
const spawnField = useTemplateRef('spawnField');
let fieldHeight: number | null | undefined = null;
let fieldWidth: number | null | undefined = null;

const handleMouseMove = (event: MouseEvent) => {
	hover.value = true;
	mousePosition.x = event.offsetX;
	mousePosition.y = event.offsetY;
	//BUG
	/*When were updaitng the mouse position, 
    were getting the X and Y coordinates based on the surrounding element were within
  NOT based on just the fieldDiv element 
    Find a way to ignore the div for the rabbit, 
  or add the rabbits offsetX and Y to the offsetX and Y of the fieldDiv*/
};

onMounted(() => {
	fieldHeight = spawnField.value?.offsetHeight;
	fieldWidth = spawnField.value?.offsetWidth;
});

//chatgpt shit
const handleGlobalMouseUp = () => {
	if (!draggedRabbit.value) return;

	draggedRabbit.value.isDragged = false;
	draggedRabbit.value = null;
};

onMounted(() => {
	window.addEventListener('mouseup', handleGlobalMouseUp);
});

const spawnRabbit = () => {
	if (!draggedRabbit.value) {addRabbit(mousePosition.x, mousePosition.y, fieldHeight ? fieldHeight: 0, fieldWidth ? fieldWidth: 0)}
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const spawnRandomly = async () => {
	spawning.value = !spawning.value
		// for (let i = 0; i < 1000; i++) {
		// 	await sleep(50)
		// 	if (spawning.value == true) {
				
		// 		addRabbit(Math.floor(Math.random() * (fieldWidth ? fieldWidth : 1500)), Math.floor(Math.random() * (fieldHeight ? fieldHeight : 1000)), fieldHeight ? fieldHeight: 0, fieldWidth ? fieldWidth: 0)
		// 	}else{
		// 		i = 0
		// 	}
		// }
		while (spawning.value == true) {
			await sleep(2)
			if (spawning.value == true) {
				
				addRabbit(Math.floor(Math.random() * (fieldWidth ? fieldWidth : 1500)), Math.floor(Math.random() * (fieldHeight ? fieldHeight : 1000)), fieldHeight ? fieldHeight: 0, fieldWidth ? fieldWidth: 0)
			}
		}
}

</script>

<template>
	<main>
		<p>Click to spawn a rabbit, right click to despawn! (Max 100)</p>
		<p><button @click="removeAllRabbits">Remove All Rabbits</button>	<button @click="spawnRandomly">{{ spawning === true ? "Stop" : "Start" }} Spawning</button> Spawns two rabbits per second</p>
		<p>
			{{ rabbits.length }} rabbits spawned
		</p>
		<details>
					<summary>View JSON Array:</summary>
					<pre><code>{{ rabbits }}</code></pre>
				</details><div style="display: flex; flex-direction: row">
			<div
				class="spawnField"
				id="spawnField"
				ref="spawnField"
				@mousedown.left="spawnRabbit"
				@mousemove.capture.self="handleMouseMove"
				@mouseleave="hover = false"
			>
			
				<div
					v-for="(rabbit, index) in rabbits"
					:key="index"
				>
				
					<!-- <RabbitEditor v-model="rabbits[index]!" /> -->
					<!-- Set to click.right.prevent to set it to delete on right click, 
							and prevent the default action(opening context menu) -->
					<div>
						<RabbitViewer
							v-bind="rabbit"
							style="position: absolute; z-index: 1;"
							@click.right.prevent="removeRabbitByIndex(index)"
							@mousedown.left.prevent="
								draggedRabbit=rabbit
								rabbit.isDragged = true;
							"
							:style="{cursor: rabbit.isDragged?'grabbing':'grab'}"
						/>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped>
.aside {
	float: right;
	width: 10%;
	padding: 1%;
}
.spawnField {
	background-color: rgb(206, 244, 203);
	width: 100%;
	height: 85vh;
	position: relative;
}
</style>

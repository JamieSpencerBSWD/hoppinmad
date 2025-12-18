<script setup lang="ts">
import { addRabbit, draggedRabbit, rabbits, removeRabbitByIndex } from '@/models/rabbits';
//import RabbitEditor from '@/components/RabbitEditor.vue';
import RabbitViewer from '@/components/RabbitViewer.vue';
import { onMounted, ref, useTemplateRef } from 'vue';

import { mousePosition } from '@/models/mouse';

const hover = ref(false);
const spawnField = useTemplateRef('spawnField');
let fieldHeight: number | null | undefined = null;

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
	if (!draggedRabbit.value) {addRabbit(mousePosition.x, mousePosition.y, fieldHeight ? fieldHeight: 0)}
}

</script>

<template>
	<main>
		<p>Click to spawn a rabbit, right click to despawn!</p>
		<aside class="aside">
			<h4>
				Mouse is at {{ mousePosition.x }},
				{{ mousePosition.y }}
			</h4>
			<h4>Rabbits ({{ rabbits.length }}) Array:</h4>

			<details>
				<summary>View JSON Array:</summary>
				<pre><code>{{ rabbits }}</code></pre>
			</details>
		</aside>
		<div style="display: flex; flex-direction: row">
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

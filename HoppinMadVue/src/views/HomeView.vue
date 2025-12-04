<script setup lang="ts">
import { addRabbit, rabbits, removeRabbitByIndex } from '@/models/rabbits';
//import RabbitEditor from '@/components/RabbitEditor.vue';
import RabbitViewer from '@/components/RabbitViewer.vue';
import { reactive, ref } from 'vue';

const mousePosition = reactive({
	x: 0,
	y: 0,
});
const hover = ref(false);

const handleMouseMove = (event: MouseEvent) => {
	hover.value = true;
	console.log("Event Type:", typeof event, "\nEvent OBJ:", event)
	mousePosition.x = event.offsetX;
	mousePosition.y = event.offsetY;
	//BUG
	/*When were updaitng the mouse position, 
    were getting the X and Y coordinates based on the surrounding element were within
  NOT based on just the fieldDiv element 
    Find a way to ignore the div for the rabbit, 
  or add the rabbits offsetX and Y to the offsetX and Y of the fieldDiv*/
};
</script>

<template>
	<main>
		<section class="mousePosition">
			<p>Click to spawn a rabbit, right click to despawn!</p>
			<h4>
				Mouse is at {{ mousePosition.x }},
				{{ mousePosition.y }}
			</h4>
		</section>
		<aside style="float: right">
			<pre><h4>Rabbits ({{ rabbits.length }}) Array:</h4><code>{{ rabbits }}</code></pre>
		</aside>
		<div style="display: flex; flex-direction: row">
			<div
				class="spawnField"
				id="spawnField"
				@click="addRabbit(mousePosition.x, mousePosition.y)"
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
						/>
					</div>
				</div>
			</div>
		</div>
		
	</main>
</template>

<style scoped>
.spawnField {
	border: 1px solid blue;
	width: 100%;
	height: 85vh;
	cursor: pointer;
	position: relative;
}
.mousePosition {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border: 1px solid green;
}
</style>

<script setup lang="ts">
import { addRabbit, rabbits, removeRabbitByIndex } from '@/models/rabbits';
//import RabbitEditor from '@/components/RabbitEditor.vue';
import RabbitViewer from '@/components/RabbitViewer.vue';
</script>

<template>
	<main>
		<aside style="float: right">
			<pre><h4>Rabbits Array:</h4><code>{{ rabbits }}</code></pre>
		</aside>
		<div class="spawnField" id="spawnField" @click="addRabbit">
			/* Move Rabbit List to be inside spawnField Div */
		</div>
		<div
			v-for="(rabbit, index) in rabbits"
			:key="index"
			style="z-index: 1;"
		>
			<RabbitViewer v-bind="rabbit" />
			<!-- <RabbitEditor v-model="rabbits[index]!" /> -->
			<div>
				<button @click="removeRabbitByIndex(index)">Remove Rabbit: {{ rabbit.name }}</button>
			</div>
		</div>
	</main>
</template>

<style scoped>
	.spawnField{
		border: 1px solid blue;
		width: 500px;
		height: 200px;
		cursor: pointer;
	}
</style>

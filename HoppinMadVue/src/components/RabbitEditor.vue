<script setup lang="ts">
import { type Rabbit } from '@/models/rabbits';
const rabbit = defineModel<Rabbit>({ required: true });
</script>
<template>
	<div>
		<div>
			<label>
				<span>name</span>
				<input
					type="text"
					v-model="rabbit.name"
				/>
			</label>
		</div>
		<div>
			<label>
				<span>is Grumpy?</span>
				<input
					type="checkbox"
					v-model="rabbit.isDragged"
				/>
			</label>
		</div>
		<div>
			<label>
				<span>Power Level</span>
				<input
					type="number"
					v-model.number="rabbit.powerLevel"
				/>
			</label>
		</div>

		<div>
			<button @click="rabbit.name = 'Matcha'">Set Name to Matcha</button>
			<button @click="rabbit.name = 'Brown Sugar'">Set Name to Brown Sugar</button>
		</div>
	</div>
</template>

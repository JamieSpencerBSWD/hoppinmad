<script setup lang="ts">
import { type Goat } from '@/models/goats';
const goat = defineModel<Goat>({ required: true });
</script>
<template>
	<div>
		<div>
			<label>
				<span>name</span>
				<input
					type="text"
					v-model="goat.name"
				/>
			</label>
		</div>
		<div>
			<label>
				<span>is Grumpy?</span>
				<input
					type="checkbox"
					v-model="goat.isGrumpy"
				/>
			</label>
		</div>
		<div>
			<label>
				<span>Power Level</span>
				<input
					type="number"
					v-model.number="goat.powerLevel"
				/>
			</label>
		</div>

		<div>
			<button @click="goat.name = 'Gruff'">Set Name to Gruff</button>
			<button @click="goat.name = 'Fawn'">Set Name to Fawn</button>
		</div>
	</div>
</template>

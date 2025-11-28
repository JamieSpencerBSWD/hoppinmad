<script setup lang="ts">
import { addGoat, goats, removeGoatByIndex } from '@/models/goats';
import GoatEditor from '@/components/GoatEditor.vue';
import GoatViewer from '@/components/GoatViewer.vue';
</script>

<template>
	<main>
		<aside style="float: right">
			<pre><code>{{ goats }}</code></pre>
		</aside>
		<div>
			<button @click="addGoat">Add New Goat</button>
		</div>
		<div
			v-for="(goat, index) in goats"
			:key="index"
		>
			<GoatViewer v-bind="goat" />
			<GoatEditor v-model="goats[index]!" />
			<div>
				<button @click="removeGoatByIndex(index)">Remove Goat: {{ goat.name }}</button>
			</div>
		</div>
	</main>
</template>

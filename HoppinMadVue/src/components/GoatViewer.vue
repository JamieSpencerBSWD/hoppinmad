<script setup lang="ts">
import type { Goat } from '@/models/goats';

const goat = defineProps<Goat>();
</script>
<template>
	<div>
		<h1>Name is currently: {{ goat.name }}</h1>
		<h1>Is Grumpy?: {{ goat.isGrumpy }}</h1>
		<h1>Power Level: {{ goat.powerLevel }}</h1>
	</div>
</template>

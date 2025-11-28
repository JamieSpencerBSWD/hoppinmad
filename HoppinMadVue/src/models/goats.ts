import { ref } from 'vue';
//Add Gravity and Dragging logic here!

export type Goat = {
	name: string;
	isGrumpy: boolean;
	powerLevel: number;
};

export const goats = ref<Goat[]>([
	{
		name: 'Gruff',
		isGrumpy: true,
		powerLevel: 999,
	},
	{
		name: 'Fawn',
		isGrumpy: false,
		powerLevel: 9001,
	},
]);

const tickGoat = (goat: Goat) => {
	goat.powerLevel += 1;
};
setInterval(() => {
	goats.value.forEach(tickGoat);
}, 1000);

export const addGoat = () => {
	goats.value.push({
		name: '',
		isGrumpy: false,
		powerLevel: 0,
	});
};
export const removeGoatByIndex = (removeIndex: number) => {
	goats.value = goats.value.filter((goat, index) => index !== removeIndex);
};

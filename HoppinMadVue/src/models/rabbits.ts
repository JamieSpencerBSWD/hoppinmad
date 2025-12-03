import { ref } from 'vue';
//Add Gravity and Dragging logic here!
// What does a rabbit look like?
//Rabbit should have:

/*
	id
	name
	isDragged
	positionX
	positionY
	velocityX
	velocityY
	state = [IDLE, FALLING, DRAGGED, ETC]
	mousePosition
	size
*/

export type Rabbit = {
	id: number;
	name: string; // Chosen randomly from a preset list of up to 250-300 names, if user doesnt provide one
	isDragged: boolean; // changed if rabbit is being dragged. Should I keep this?
	positionX: number; // X position (initial from mouse, updated when applying gravity or whatever)
	positionY: number; // Y position (initial from mouse, updated when applying gravity or whatever)
	velocityX: number; // Velocity of the rabbit on the X Axis. 0 for now
	velocityY: number; // Velocity of the rabbit on the Y Axis. 0 for now
	speed: number; // Should be a calculation based on velocity and gravity maybe?
	mousePosition: { x: number; y: number }; // should be the current mousePosition,
	// only passed in if the rabbit is being hovered over, or dragged
	// could be used to change State and Actions if mouse is close
	size: number; // should be square. width and height would use this.
	powerLevel: number;
};

export const rabbits = ref<Rabbit[]>([
	{
		id: 0,
		name: 'Mochi',
		isDragged: true,
		positionX: 80,
		positionY: 80,
		velocityX: 0,
		velocityY: 0,
		speed: 0,
		mousePosition: { x: 12, y: 34 },
		size: 60,
		powerLevel: 999,
	},
	{
		id: 1,
		name: 'Taro',
		isDragged: false,
		positionX: 80,
		positionY: 80,
		velocityX: 0,
		velocityY: 0,
		speed: 0,
		mousePosition: { x: 0, y: 0 },
		size: 60,
		powerLevel: 9001,
	},
]);

const tickRabbit = (rabbit: Rabbit) => {
	//Perform Gravity Here?
	rabbit.powerLevel += 1;
};
setInterval(() => {
	rabbits.value.forEach(tickRabbit);
}, 1000);

export const addRabbit = () => {
	rabbits.value.push({
		id: rabbits.value.length,
		name: '',
		isDragged: false,
		positionX: 65,
		positionY: 65,
		velocityX: 0,
		velocityY: 0,
		speed: 0,
		mousePosition: { x: 0, y: 0 },
		size: 60,
		powerLevel: 0,
	});
};
export const removeRabbitByIndex = (removeIndex: number) => {
	rabbits.value = rabbits.value.filter((rabbit, index) => index !== removeIndex);
};

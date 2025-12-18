import { ref } from 'vue';

import { dragItem, Gravity, updateRabbitPosition } from '@/logic/physics';
import { mousePosition } from '@/models/mouse';
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
let nextRabbitId = 0;

export const draggedRabbit = ref<Rabbit | null>(null);

export const canSpawn = ref(true);

export type Rabbit = {
	id: number;
	name: string; // Chosen randomly from a preset list of up to 250-300 names, if user doesnt provide one
	isDragged: boolean; // changed if rabbit is being dragged. Should I keep this?
	dragOffsetX: number;
	dragOffsetY: number;
	positionX: number; // X position (initial from mouse, updated when applying gravity or whatever)
	positionY: number; // Y position (initial from mouse, updated when applying gravity or whatever)
	fieldHeight: number;
	velocityX: number; // Velocity of the rabbit on the X Axis. 0 for now
	velocityY: number; // Velocity of the rabbit on the Y Axis. 0 for now
	speed: number; // Should be a calculation based on velocity and gravity maybe?
	size: number; // should be square. width and height would use this.
};

const retrievedStorage = localStorage.getItem('rabbitsLS');
const localStorageArray = retrievedStorage?JSON.parse(retrievedStorage!):[];

export const rabbits = ref<Rabbit[]>(localStorageArray ? localStorageArray : []);

//implement dragging here. extend physics to another class


// Applies gravity to each rabbit in the array on every re-render
const gravityTick = () => {
	Gravity();
	dragItem()
	requestAnimationFrame(gravityTick);
};
requestAnimationFrame(gravityTick);

export const addRabbit = (x: number, y: number, fieldHeight: number) => {
	if(canSpawn.value == true && rabbits.value.length <= 100){
		rabbits.value.push({
			id: nextRabbitId++,
			name: '',
			isDragged: false,
			dragOffsetX: 0,
			dragOffsetY: 0,
			positionX: x,
			positionY: y,
			fieldHeight: fieldHeight,
			velocityX: 0,
			velocityY: 0,
			speed: 0,
			size: 60,
		});
	}
	
};
export const removeRabbitByIndex = (removeIndex: number) => {
	rabbits.value = rabbits.value.filter((rabbit, index) => index !== removeIndex);
	localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value));
};

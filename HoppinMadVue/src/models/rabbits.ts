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
	fieldHeight: number;
	velocityX: number; // Velocity of the rabbit on the X Axis. 0 for now
	velocityY: number; // Velocity of the rabbit on the Y Axis. 0 for now
	speed: number; // Should be a calculation based on velocity and gravity maybe?
	mousePosition: { x: number; y: number }; // should be the current mousePosition,
	// only passed in if the rabbit is being hovered over, or dragged
	// could be used to change State and Actions if mouse is close
	size: number; // should be square. width and height would use this.
	powerLevel: number;
};

export const rabbits = ref<Rabbit[]>([]);

const updateRabbitPosition = (rabbit: Rabbit, x:number, y:number) => {
  rabbit.positionX = x
  rabbit.positionY = y
  localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value))
}

const fallSpeed = 10
// Applies gravity to each rabbit in the array on every re-render
const gravityTick = () => {
	rabbits.value.forEach((rabbit) => {
		const containerBottom = (rabbit.fieldHeight);
		const floor = containerBottom
		
		const bottom = rabbit.positionY + (rabbit.size/2) + 5
		if (!rabbit.isDragged) {
			
			if (bottom < floor) {
				
				updateRabbitPosition(rabbit, rabbit.positionX, rabbit.positionY + fallSpeed)
				
				// >>> This feels very intensive and unnecessary <<<
				// >>> I don't like that its going through EVERY SINGLE ENTRY and applying it regardless
				}
				// else {
				//   rabbit.state = 'IDLE'  
				// }
			} 
		})
	requestAnimationFrame(gravityTick)
}
requestAnimationFrame(gravityTick)

const tickRabbit = (rabbit: Rabbit) => {
	//Perform Gravity Here?
	rabbit.powerLevel += 1;
};
setInterval(() => {
	rabbits.value.forEach(tickRabbit);
}, 1000);

export const addRabbit = (x: number, y: number, fieldHeight: number) => {
	rabbits.value.push({
		id: rabbits.value.length,
		name: '',
		isDragged: false,
		positionX: x,
		positionY: y,
		fieldHeight: fieldHeight,
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

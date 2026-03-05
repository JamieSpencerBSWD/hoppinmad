import { mousePosition } from '@/models/mouse';
import { type Rabbit, rabbits } from '@/models/rabbits';

//VARIABLES
const deltaTime = 1 / 60; //60 fps

//perform logic for all physics here. We are given the type rabbits, and the rabbits array

export const updateRabbitPosition = (rabbit: Rabbit, x: number, y: number) => {
	rabbit.positionX = x;
	rabbit.positionY = y;

	//updateVelocity(rabbit, rabbit.positionX, rabbit.positionY);
	localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value));
};


export const dragItem = () => {
	rabbits.value.forEach((rabbit) => {
		if (!rabbit.isDragged) return;
		//const strength = 20 * deltaTime;

		const targetX = mousePosition.x - rabbit.dragOffsetX;
		const targetY = mousePosition.y - rabbit.dragOffsetY;

		updateRabbitPosition(
			rabbit,
			rabbit.positionX + (targetX - rabbit.positionX),
			rabbit.positionY + (targetY - rabbit.positionY),
		);
	});
};


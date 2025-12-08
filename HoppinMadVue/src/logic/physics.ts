import { type Rabbit, rabbits } from '@/models/rabbits';

//VARIABLES
const gravity = 10;

//perform logic for all physics here. We are given the type rabbits, and the rabbits array

export const updateRabbitPosition = (rabbit: Rabbit, x: number, y: number) => {
	rabbit.positionX = x;
	rabbit.positionY = y;
	localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value));
};

export const Gravity = () => {
	rabbits.value.forEach((rabbit) => {
		const containerBottom = rabbit.fieldHeight;
		const floor = containerBottom;

		const bottom = rabbit.positionY + rabbit.size / 2 + 5;
		if (!rabbit.isDragged) {
			if (bottom <= floor) {
				console.log('Falling...');

				updateRabbitPosition(rabbit, rabbit.positionX, rabbit.positionY + gravity);

				// >>> This feels very intensive and unnecessary <<<
				// >>> I don't like that its going through EVERY SINGLE ENTRY and applying it regardless
			}
		}
	});
};

export const dragItem = () => {
	console.log('dragging');
};

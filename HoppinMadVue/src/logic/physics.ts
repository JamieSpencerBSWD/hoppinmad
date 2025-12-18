import { mousePosition } from '@/models/mouse';
import { type Rabbit, rabbits } from '@/models/rabbits';

//VARIABLES
const gravity = 12;

//perform logic for all physics here. We are given the type rabbits, and the rabbits array

export const updateRabbitPosition = (rabbit: Rabbit, x: number, y: number) => {
	rabbit.positionX = x;
	rabbit.positionY = y;
	
	updateVelocity(rabbit, rabbit.positionX, rabbit.positionY)
	localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value));
};
export const Gravity = () => {
	rabbits.value.forEach((rabbit) => {
		if (rabbit.isDragged) return; // don’t touch dragged rabbits

		const containerBottom = rabbit.fieldHeight;
		const floor = containerBottom;
		const bottom = rabbit.positionY + rabbit.size / 2;

		// apply velocity
		rabbit.positionX += rabbit.velocityX * 0.026;
		rabbit.positionY += rabbit.velocityY * 0.026;

		rabbit.velocityY *= 0.98; // air resistance
		rabbit.velocityX *= 0.98;


		// gravity affects Y velocity
		rabbit.velocityY += gravity;

		// simple floor collision
		if (bottom >= floor) {
			rabbit.positionY = floor - rabbit.size / 2; // stop at floor
			rabbit.velocityY = 0; // stop falling
			rabbit.velocityX *= 0.4; // optional friction for X
		}
	});
	localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value));
};
export const dragItem = () => {
	rabbits.value.forEach((rabbit) => {
		if (!rabbit.isDragged) return;
		const strength = 0.3;

		const targetX = mousePosition.x - rabbit.dragOffsetX;
		const targetY = mousePosition.y - rabbit.dragOffsetY;

		updateRabbitPosition(
			rabbit,
			rabbit.positionX + (targetX - rabbit.positionX) * strength,
			rabbit.positionY + (targetY - rabbit.positionY) * strength
		);
	})
};

let lastX = 0;
let lastY = 0;
let lastTime = performance.now(); // Use performance.now() for high-resolution time

function updateVelocity(rabbit: Rabbit, currentX: number, currentY: number) {
	const currentTime = performance.now();
	// Calculate the change in position
	const distanceX = currentX - lastX;
	const distanceY = currentY - lastY;

	// Calculate the change in time (in seconds)
	const distanceTravelled = (currentTime - lastTime) / 1000; 

	if (distanceTravelled > 0) {
		// Calculate velocity components (e.g., pixels per second)
		const velocityX = distanceX / distanceTravelled;
		const velocityY = distanceY / distanceTravelled;
		rabbit.velocityX = velocityX;
		rabbit.velocityY = velocityY;
		//speed = distance / time
		rabbit.speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
	}

	// Update last position and time for the next frame
	lastX = currentX;
	lastY = currentY;
	lastTime = currentTime;
	
}


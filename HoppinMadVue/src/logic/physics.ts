import { mousePosition } from '@/models/mouse';
import { type Rabbit, rabbits } from '@/models/rabbits';

//VARIABLES
const gravity = 12;

//perform logic for all physics here. We are given the type rabbits, and the rabbits array

export const updateRabbitPosition = (rabbit: Rabbit, x: number, y: number) => {
	rabbit.positionX = x;
	rabbit.positionY = y;
	localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value));
	updateVelocity(rabbit, rabbit.positionX, rabbit.positionY)
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
	const dx = currentX - lastX;
	const dy = currentY - lastY;

	// Calculate the change in time (in seconds)
	const dt = (currentTime - lastTime) / 1000; 

	if (dt > 0) {
		// Calculate velocity components (e.g., pixels per second)
		const vx = dx / dt;
		const vy = dy / dt;
		rabbit.velocityX = vx;
		rabbit.velocityY = vy;

		rabbit.speed = Math.sqrt(vx * vx + vy * vy);
		console.log(`Velocity X: ${vx.toFixed(2)}, Velocity Y: ${vy.toFixed(2)}`);
	}

	// Update last position and time for the next frame
	lastX = currentX;
	lastY = currentY;
	lastTime = currentTime;
	
}


import { mousePosition } from '@/models/mouse';
import { type Rabbit, rabbits } from '@/models/rabbits';

//VARIABLES
const gravity = 2000;
const deltaTime = 1 / 60; //60 fps
const airResistance = 0.99;

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
		const top = rabbit.positionY - rabbit.size / 2;

		

		// apply velocity and update rabbit position
		rabbit.positionX += rabbit.velocityX * deltaTime;
		rabbit.positionY += rabbit.velocityY * deltaTime;

		// floor collision
		if (bottom >= floor) {
			rabbit.positionY = floor - rabbit.size / 2; // stop at floor
			rabbit.velocityY *= -0.5; // stop falling
			rabbit.velocityX *= 0.5; // optional friction for X
			if (Math.abs(rabbit.velocityY) < 50) {
				rabbit.velocityY = 0;
			}
		}
		// ceiling collision	
		if (top <= 0) {
			rabbit.positionY = rabbit.size / 0.8;  // clamp inside the box
			rabbit.velocityY = -rabbit.velocityY * 0.5 // invert Y velocity for bounce
		}
		// gravity affects Y velocity (apply gravity)
		rabbit.velocityY += gravity * deltaTime;
		
		//apply air resistance
		rabbit.velocityY *= airResistance; // air resistance
		rabbit.velocityX *= airResistance;
	});
	localStorage.setItem('rabbitsLS', JSON.stringify(rabbits.value));
	//if (rabbit.speed < 5) saveState();
};

export const dragItem = () => {
	rabbits.value.forEach((rabbit) => {
		if (!rabbit.isDragged) return;
		const strength = 20 * deltaTime;

		const targetX = mousePosition.x - rabbit.dragOffsetX;
		const targetY = mousePosition.y - rabbit.dragOffsetY;

		updateRabbitPosition(
			rabbit,
			rabbit.positionX + (targetX - rabbit.positionX) * strength,
			rabbit.positionY + (targetY - rabbit.positionY) * strength
		);
	})
};

function updateVelocity(rabbit: Rabbit, currentX: number, currentY: number) {
	if (!rabbit.isDragged) return;
	const currentTime = performance.now();
	// Calculate the change in position
	const distanceX = currentX - rabbit.lastX;
	const distanceY = currentY - rabbit.lastY;

	// Calculate the change in time (in seconds)
	const distanceTravelled = (currentTime - rabbit.lastTime) / 1000; 

	if (distanceTravelled > 0) {
		// Calculate velocity components (e.g., pixels per second)
		rabbit.velocityX = distanceX / distanceTravelled;
		rabbit.velocityY = distanceY / distanceTravelled;
		//speed = distance / time
		rabbit.speed = Math.sqrt(rabbit.velocityX **2 + rabbit.velocityY **2); //speed = sqrt(velocity^2 + velocityY^2)
	}

	// Update last position and time for the next frame
	rabbit.lastX = currentX;
	rabbit.lastY = currentY;
	rabbit.lastTime = currentTime;
}




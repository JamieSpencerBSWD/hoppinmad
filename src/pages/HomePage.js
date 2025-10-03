import React, { useEffect, useState } from 'react'
import Rabbit from '../components/Rabbit';

const HomePage = () => {
  const [rabbitSize, setRabbitSize] = useState(60);
  const [rabbits, setRabbits] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX, // or event.pageX, event.screenX
      y: event.clientY, // or event.pageY, event.screenY
    });
  };
  const handleClick = (event, id) => {
    spawnRabbitsAtMousePointer();
  }
  const spawnRabbitsAtMousePointer = () => {
    //fetch rabbit data from backend
    setRabbits(rabbits => [...rabbits, {id: rabbits.length, xaxis: mousePosition.x-rabbitSize/2, yaxis: mousePosition.y-rabbitSize/2}]);
  };

  const spawnRabbitsRandomly = () => {
    //fetch rabbit data from backend
    setRabbits(rabbits => [...rabbits, {id: rabbits.length+1, xaxis: Math.floor(Math.random() * (window.innerWidth - rabbitSize)), yaxis: Math.floor(Math.random() * (window.innerHeight - rabbitSize))}]);
  };

  const deSpawnLastRabbit = () => {
    //fetch rabbit data from backend
    const tempRabbits = rabbits.slice(0, -1); 
    setRabbits(tempRabbits);
  };
  const deSpawnAllRabbits =() => {
    setRabbits([]);
  }
  const deSpawnSelectedRabbit = (id) => {
    console.log("despawning rabbit " + id)
    //fetch rabbit data from backend
    setRabbits(prevRabbits => prevRabbits.filter(rabbit => rabbit.id !== id));
  };

  useEffect(() => {
    //handle mouse moving
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div onClick={handleClick} style={{height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative'}}>
      <h1>Home Page</h1>
      <button onClick={(e) => { e.stopPropagation(); spawnRabbitsRandomly(); }} style={{margin:'20px'}}>Spawn Randomly</button>
      <button onClick={(e) => { e.stopPropagation(); deSpawnLastRabbit(); }} style={{margin:'20px'}}>Despawn Last Rabbit</button>
      
      <button onClick={(e) => { e.stopPropagation(); deSpawnAllRabbits(); }} style={{margin:'20px'}}>Despawn All Rabbits</button>
      {rabbits.map(rabbit => (
          <Rabbit key={rabbit.id} id={rabbit.id} x={rabbit.xaxis} y={rabbit.yaxis} onRemove={deSpawnSelectedRabbit}/>
      ))}
    </div>
  )
}

export default HomePage
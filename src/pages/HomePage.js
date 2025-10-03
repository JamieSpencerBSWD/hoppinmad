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

    if (event.type === 'click') {
      console.log('Left click');
      spawnRabbits();
    } else if (event.type === 'contextmenu') {
      console.log('Right click');
      deSpawnSelectedRabbit(id);
    }
  }
  const spawnRabbits = () => {
    
    //fetch rabbit data from backend
    setRabbits(rabbits => [...rabbits, {id: rabbits.length+1, xaxis: mousePosition.x-rabbitSize/2, yaxis: mousePosition.y-rabbitSize/2}]);
    // setRabbits(rabbits => [...rabbits, {id: rabbits.length+1, xaxis: Math.floor(Math.random() * (window.innerWidth - rabbitSize)), yaxis: Math.floor(Math.random() * (window.innerHeight - rabbitSize))}]);
  };
  ;

  const deSpawnLastRabbit = () => {
    //fetch rabbit data from backend
    const tempRabbits = rabbits.slice(0, -1); 
    setRabbits(tempRabbits);
  };
  const deSpawnSelectedRabbit = (id) => {
    //fetch rabbit data from backend
    //const tempRabbits = rabbits.slice(0, -1); 
    //setRabbits(tempRabbits);
    setRabbits(prevRabbits => prevRabbits.filter(rabbit => rabbit.id !== id));
    console.log(id)
  };
  

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    // setRabbits([
    // // {id: 1, xaxis: Math.floor(Math.random() * (window.innerWidth - rabbitSize)), yaxis: Math.floor(Math.random() * (window.innerHeight - rabbitSize))},
    // // {id: 2, xaxis: Math.floor(Math.random() * (window.innerWidth - rabbitSize)), yaxis: Math.floor(Math.random() * (window.innerHeight - rabbitSize))},
    // // {id: 3, xaxis: Math.floor(Math.random() * (window.innerWidth - rabbitSize)), yaxis: Math.floor(Math.random() * (window.innerHeight - rabbitSize))}
    // ]);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div onClick={handleClick} style={{height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative'}}>
      <h1>Home Page</h1>
      <button onClick={(e) => { e.stopPropagation(); deSpawnLastRabbit(); }} style={{margin:'20px'}}>Despawn Last Rabbit</button>
      {rabbits.map(rabbit => (
        
          <Rabbit key={rabbit.id} x={rabbit.xaxis} y={rabbit.yaxis} onContextMenu={(e) => {
      e.preventDefault(); // prevent browser context menu
      deSpawnSelectedRabbit(rabbit.id);}}/>
      ))}
    </div>
  )
}

export default HomePage
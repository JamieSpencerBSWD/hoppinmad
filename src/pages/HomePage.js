import React, { useEffect, useState, useRef } from 'react'
import Rabbit from '../components/Rabbit';
import { Engine, Render, Runner, Bodies, Composite } from "matter-js";

const HomePage = () => {
  const [rabbitSize, setRabbitSize] = useState(60);
  const [rabbits, setRabbits] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [spawning, setSpawning] = useState(false);
  const nextId = useRef(0);

  useEffect(() => {
    const engine = Engine.create();
    const world = engine.world;

    // example rabbit body
    const rabbitBody = Bodies.circle(200, 200, rabbitSize / 2, { restitution: 0.8 });
    Composite.add(world, rabbitBody);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // each frame, update React state
    const update = () => {
      setRabbits([{ id: 0, xaxis: rabbitBody.position.x, yaxis: rabbitBody.position.y }]);
      requestAnimationFrame(update);
    };
    update();

    return () => {
      Runner.stop(runner);
    };
  }, []);



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
    setRabbits(rabbits => [...rabbits, {id: nextId.current++, xaxis: mousePosition.x-rabbitSize/2, yaxis: mousePosition.y-rabbitSize/2}]);
  };

  const spawnRabbitsRandomly = () => {

    //fetch rabbit data from backend
    setRabbits(rabbits => [...rabbits, {id: nextId.current++, xaxis: Math.floor(Math.random() * (window.innerWidth - rabbitSize)), yaxis: Math.floor(Math.random() * (window.innerHeight - rabbitSize))}]);
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
    if (!spawning) return;
    const intervalId = setInterval(spawnRabbitsRandomly, 300); // spawn every 1s
    return () => clearInterval(intervalId);
  }, [spawning]);

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
      <div>
        <button onClick={(e) => { e.stopPropagation(); setSpawning(!spawning); spawnRabbitsRandomly();}} style={{margin:'20px', zIndex:2}}>{spawning ? "Stop " : "Start "}Spawning</button>
        <button onClick={(e) => { e.stopPropagation(); deSpawnLastRabbit(); }} style={{margin:'20px', zIndex:2}}>Despawn Last Rabbit</button>
        <button onClick={(e) => { e.stopPropagation(); deSpawnAllRabbits(); }} style={{margin:'20px', zIndex:2, position:'absolute'}}>Despawn All Rabbits</button>
      </div>
      
      {rabbits.map(rabbit => (
          <Rabbit key={rabbit.id} id={rabbit.id} x={rabbit.xaxis} y={rabbit.yaxis} onRemove={deSpawnSelectedRabbit}/>
      ))}
      
    </div>
  )
}

export default HomePage
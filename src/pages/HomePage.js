import React, { useEffect, useState } from 'react'
import Rabbit from '../components/Rabbit';

const HomePage = () => {
  const spawnRabbits = () => {
    //fetch rabbit data from backend
    setRabbits(rabbits => [...rabbits, {id: rabbits.length+1, xaxis: Math.floor(Math.random() * (window.innerWidth - 60)), yaxis: Math.floor(Math.random() * (window.innerHeight - 60))}]);
  };
  const [rabbits, setRabbits] = useState([]);

  useEffect(() => {
    setRabbits([
    {id: 1, xaxis: Math.floor(Math.random() * (window.innerWidth - 60)), yaxis: Math.floor(Math.random() * (window.innerHeight - 60))},
    {id: 2, xaxis: Math.floor(Math.random() * (window.innerWidth - 60)), yaxis: Math.floor(Math.random() * (window.innerHeight - 60))},
    {id: 3, xaxis: Math.floor(Math.random() * (window.innerWidth - 60)), yaxis: Math.floor(Math.random() * (window.innerHeight - 60))}
    ]);
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={spawnRabbits}>Get Rabbits</button>
      {console.log(rabbits)}
      {rabbits.map(rabbit => (
        <div key={rabbit.id}> 
          <Rabbit x={rabbit.xaxis} y={rabbit.yaxis}/>
        </div>
      ))}
    </div>
    
  )
}

export default HomePage
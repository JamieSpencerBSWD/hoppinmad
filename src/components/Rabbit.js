import React from 'react'
import rabbitSit from '../assets/rabbit-sit.png'

const Rabbit = (props) => {
  return (
    <div>
      <img src={rabbitSit} style={{ position: 'absolute', left: props.x, top: props.y, height:60, width:60, zIndex:-1 }} alt="Rabbit Sitting" />
    </div>
  )
}

export default Rabbit
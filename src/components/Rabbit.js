import React from 'react'
import rabbitSit from '../assets/RabbitTemplate.png'

const Rabbit = (props) => {
  return (
    <div>
      <img className='move-down' onContextMenu={(e) => {e.preventDefault(); e.stopPropagation(); props.onRemove(props.id)}} src={rabbitSit} style={{ position: 'absolute', left: props.x, top: props.y, rotate:"45deg", height:60, width:60, zIndex:0 }} alt="Rabbit Sitting" />
    </div>
  )
}

export default Rabbit
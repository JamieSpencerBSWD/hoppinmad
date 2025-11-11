import React from 'react'
import rabbitSit from '../assets/rabbit-sit.png'

const Rabbit = (props) => {
  return (
    <div>
      <img 
        
        onContextMenu={(e) => {e.preventDefault(); e.stopPropagation(); props.onRemove(props.id)}} 
        src={rabbitSit} 
        style={{ position: 'absolute', left: props.x, top: props.y, height:60, width:60, zIndex:0 }} 
        alt="Rabbit Sitting :3" 
      />
    </div>
  )
}

export default Rabbit
import React ,{ memo, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import style from './CardStyle';

interface cardProps {
  onClick: ()=> void,
  children: JSX.Element[];
}

const memoCard = memo(function Card({onClick, children}:cardProps) {
    const [flip, setFlip] = useState(false);
    const handleClick = ()=>{
        setFlip( prevFlip => !prevFlip);
        onClick();

    }
  return (
    <ReactCardFlip containerStyle={style.container} isFlipped={flip} flipDirection="horizontal">
    <div>
    {children[0]}
      <button onClick={handleClick}>Click here to see the punchline</button>
    </div>
    <div>
      {children[1]}
      <button onClick={handleClick}>Click here to see setup</button>
    </div>
  </ReactCardFlip>
  )
})
export default memoCard;

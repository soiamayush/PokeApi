import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  const style = props.type;
  return (
    <div >

      <li className='cards__item my-4'>
         <div className='cards__item__link' to={props.image}>

          <figure className='cards__item__pic-wrap' data-category={props.type} >
            
            <img
              className={` cards__item__img ${style}`}
              alt='Travel Image'
              src={props.image}
              
            />
          </figure> 
          <div className='cards__item__info' >
            <h5 className='cards__item__text text-center'>{props.name}</h5>
             <h2 className='cards__item__text text-center'>#{props.id}</h2>
            {/* // <h2 className='cards__item__text'>{props.size}</h2>  */} 
          </div>
        </div>
      </li>
    </div>
  );
}

export default CardItem;

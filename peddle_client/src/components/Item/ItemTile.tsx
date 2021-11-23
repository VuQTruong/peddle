import { Link } from 'react-router-dom';
import { Item } from '../../types/item';

export const ItemTile = (props: { item: Item }) => {

  const item = props.item;
  const title = item.name.length > 30 
    ? props.item.name.substring(0, 29) + '...'
    : props.item.name;
  
  const formatCurrency = (n: number) => {
      return "$" + n.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className='item-list-card__container'>
        <div className='item-list-card__image'>
            <img  alt={`${title}`} src={item.images[0]} />
        </div>
        <div className='item-list-card__content'> 
            <div className='item-list-card__title-div'>
              <div style={{display: 'flex', flexDirection:'row'}}>
                <p>{title}</p>
                <p className="item-list-card__price">{formatCurrency(props.item.price)}</p>
              </div>
                <a href='#'>ooo</a>
            </div>
            <Link to='#'> View original post</Link>
            <div style={{display:'flex', flexDirection:'row'}}>
              <div className='item-list-card__matches-sub-div'>
                <p>Matches(</p>
                <i className='item-list-card__match-num'>{item.matches}</i>
                <p>)</p>
              </div>
            </div>
        </div>
    </div>
  );
};

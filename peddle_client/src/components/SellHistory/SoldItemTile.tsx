import { Link } from 'react-router-dom';
import { Item } from '../../types/item';

interface ItemWithBuyerName extends Item{
  buyerName: string;
}

export const SoldItemTile = (props: { item: ItemWithBuyerName }) => {

  const item = props.item;
  const title = item.name.length > 30 
    ? props.item.name.substring(0, 29) + '...'
    : props.item.name;
  
  const formatCurrency = (n: number) => {
      return "$" + n.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className='sold-item-tile__container'>
        <div className='sold-item-tile__image'>
            <img alt={`${title}`} src={item.images[0]} />
        </div>
        <div className='sold-item-tile__content'> 
            <div className='sold-item-tile__title-div'>
              <div style={{display: 'flex', flexDirection:'row'}}>
                <p>{title}</p>
                <p className="sold-item-tile__price">{formatCurrency(props.item.price)}</p>
              </div>
            </div>
            <Link to='#'> View original post</Link>
            <div style={{display: 'flex', flexDirection:'row'}}>
              <p style={{marginRight: '5px'}}>Sold to: </p>
              <i className='sold-item-tile__seller'>{item.buyerName}</i>
            </div>
        </div>
    </div>
  );
};

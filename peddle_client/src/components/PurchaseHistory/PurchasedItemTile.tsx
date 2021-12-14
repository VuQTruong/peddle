import { Link } from 'react-router-dom';
import { Item } from '../../types/item';

interface ItemWithSellerName extends Item{
  sellerName: string;
}

export const PurchasedItemTile = (props: { item: ItemWithSellerName }) => {

  const item = props.item;
  const title = item.name.length > 30 
    ? props.item.name.substring(0, 29) + '...'
    : props.item.name;
  
  const formatCurrency = (n: number) => {
      return "$" + n.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className='purchased-item-tile__container'>
        <div className='purchased-item-tile__image'>
            <img alt={`${title}`} src={item.images[0]} />
        </div>
        <div className='purchased-item-tile__content'> 
            <div className='purchased-item-tile__title-div'>
              <div style={{display: 'flex', flexDirection:'row'}}>
                <p>{title}</p>
                <p className="purchased-item-tile__price">{formatCurrency(props.item.price)}</p>
              </div>
            </div>
            <Link to='#'> View original post</Link>
            <div style={{display: 'flex', flexDirection:'row'}}>
              <p style={{marginRight: '5px'}}>Purchased from: </p>
              <i className='purchased-item-tile__seller'>{item.sellerName}</i>
            </div>
        </div>
    </div>
  );
};

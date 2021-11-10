import { Item } from '../../types/item';

export const ItemTile = (props: { item: Item }) => {

  const item = props.item;

  const title = item.name.length > 30 
    ? props.item.name.substring(0, 29) + '...'
    : props.item.name;

  return (
    <div className='item-list-card__container'>
        <div className='item-list-card__image'>
            <img  alt={`${title}`} src={'https://cb.scene7.com/is/image/Crate/ArtesiaLargeServingBasketSHF15/$web_pdp_main_carousel_low$/190411134747/artesia-large-rattan-bread-basket.jpg'} />
        </div>
        <div className='item-list-card__content'> 
            <div className='item-list-card__title-div'>
              <div style={{display: 'flex', flexDirection:'row'}}>
                <p>{title}</p>
                <p className="item-list-card__price">{`$${props.item.price}`}</p>
              </div>
                <a href='#'>ooo</a>
            </div>
            <a href="#">View original post</a>
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

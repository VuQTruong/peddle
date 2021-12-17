import { Link } from 'react-router-dom';
import { Item } from '../../types/item';
import { formatCurrency } from '../../utilities/utils';
import swal2 from "sweetalert2";

export const ItemTile = (props: { item: Item }) => {
  const item = props.item;
  const title =
    item.name.length > 30
      ? props.item.name.substring(0, 29) + '...'
      : props.item.name;

  const itemDetailsHtml = () => {

    let itemHtml = `<p>${item?.description}</p> <br>`

    item?.images.forEach((image) => {
      itemHtml += `<img src="${image}" style='width:150px; display: block;margin-left: auto;margin-right: auto;'>`
    })

    return itemHtml
  }

  const onShowDetails = () => {
    swal2.fire({
      title: `${item?.name}`,
      html: `<p>${item?.description}</p> <br> <img src="${item?.images[0]}" style='width:150px; display: block;
      margin-left: auto;
      margin-right: auto;'>`,
    })
  }


  return (
    <div className='item-list-card__container'>
      <div className='item-list-card__image'>
        <img alt={`${title}`} src={item.images[0]} />
      </div>
      <div className='item-list-card__content'>
        <div className='item-list-card__title-div'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p>{title}</p>
            <p className='item-list-card__price'>
              {formatCurrency(props.item.price)}
            </p>
          </div>
          <Link to={`/my-items/${item.id}`}>ooo</Link>
        </div>
        <button className="item__item__btn" onClick={onShowDetails}> View item details</button>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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

import { Link } from 'react-router-dom';
import { Item } from '../../types/item';
import { formatCurrency } from '../../utilities/utils';

type Props = {
  item: Item;
};

export default function FilteredItemCard({ item }: Props) {
  return (
    <Link to={`/item/${item.id}`} className='filtered-card'>
      <img
        className='filtered-card__img'
        src={item.images[0]}
        alt={item.name}
      />
      <div className='filtered-card__info'>
        <div className='filtered-card__header'>
          <p className='filtered-card__title'>{item.name}</p>
          <p className='filtered-card__price'>{formatCurrency(item.price)}</p>
        </div>
        <div className='filtered-card__description'>{item.description}</div>
      </div>
    </Link>
  );
}

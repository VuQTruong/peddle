import { Link } from 'react-router-dom';
import { Item } from '../../types/item';
import { formatCurrency } from '../../utilities/utils';
import swal2 from "sweetalert2";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { User } from '../../types/user';

type Props = {
  item: Item;
};


export default function FilteredItemCard({ item }: Props) {

  const {userInfo} = useSelector((state:State) => state.user)


  const onShowDetails = () => {
    swal2.fire({
      title: `${item?.name}`,
      html: `<p>${item?.description}</p> <br> <img src="${item?.images[0]}" style='width:150px; display: block;
      margin-left: auto;
      margin-right: auto;'>`,
      showCancelButton: true,
      confirmButtonColor: '#507DBC',
      confirmButtonText: 'Add item to cart?',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post('/api/users/favourite', {
            itemId: item?.id
          })
      
          await axios.patch('/api/users/seen-items', {
            itemId: item?.id
          }) 
      
          await axios.patch(`/api/items/${item?.id}/increment-matches`, {})
      
          await axios.post('/api/chat', {
            itemId: item.id,
            sender: userInfo.id,
            receiver: item.postedBy,
            messages: [{userId:userInfo.id,chat:"Hello, is this item still available?"}]
          })
        }
        catch (error) {
          console.log(error)
        }
        
        swal2.fire(
          'Item added to cart!'
        )
      }
    })
  }

  return (
    <button onClick={onShowDetails} className='filtered-card'>
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
    </button>
  );
}

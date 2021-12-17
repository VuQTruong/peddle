import { State } from '../../store';
import NavBar from '../../components/NavBar/NavBar';

import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ItemTile } from '../../components/Item/ItemTile';
import { IoMdAddCircle } from 'react-icons/io';
import { Item } from '../../types/item';
import axios from 'axios';

export default function MyItems() {
  const history = useHistory();
  const { userItems } = useSelector((state: State) => state.userItems);

  const { id } = useSelector((state: State) => state.user.userInfo);
  const [items, setitems] = useState<Item[]>([]);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const itemRes = await axios.get<{ data: { items: Item[] } }>(
        `/api/items/user/${id}`
      );
      //console.log(itemRes.data.data.items);
      setitems(itemRes.data.data.items);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className='container'>
        <section className='my-items__header'>
          <i className='bx bx-left-arrow-alt' onClick={() => history.push('/')} />
          <div className='my-items__title'>My items</div>
        </section>
        <div className='my-items__item-list'>
          {items?.map((item) => (
            <ItemTile key={item.id} item={item} />
          ))}
        </div>
        <div className='my-items__add-button-div'>
          <Link
            to='/my-items/new'
            className='btn btn-primary my-items__add-button'
            type='button'
            onClick={(e) => console.log('button clicked')}
          >
            <IoMdAddCircle
              style={{ backgroundColor: '#507dbc' }}
              color=''
              size={40}
            />
            <p>{'Add item'}</p>
          </Link>
        </div>
      </div>
      <NavBar />
    </main>
  );
}

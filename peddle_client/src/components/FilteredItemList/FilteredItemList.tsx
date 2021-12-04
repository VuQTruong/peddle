import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import MessageBox from '../MessageBox/MessageBox';
import FilteredItemCard from '../FilteredItemCard/FilteredItemCard';

export default function FilteredItemList() {
  const filteredItems = useSelector((state: State) => state.filteredItems);
  const { loading, error, items } = filteredItems;

  return (
    <section className='filtered__list'>
      {loading ? (
        <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <React.Fragment>
          <h3>
            Search result:{' '}
            <span className='filtered__count-items'>
              {items.length} {items.length > 1 ? 'items' : 'item'}
            </span>
          </h3>
          {items.map((item) => (
            <FilteredItemCard item={item} key={item.id} />
          ))}
        </React.Fragment>
      )}
    </section>
  );
}

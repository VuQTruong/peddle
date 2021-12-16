import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar/NavBar';
import {
  getUserFavorites,
  removeFavItem,
} from '../../features/user/userFavoritesSlice';
import { State } from '../../store';
import MessageBox from '../../components/MessageBox/MessageBox';
import { formatCurrency } from '../../utilities/utils';
import swal from 'sweetalert';

export default function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userFavorites = useSelector((state: State) => state.userFavorites);
  const { favorites, loading, error } = userFavorites;

  useEffect(() => {
    dispatch(getUserFavorites());
  }, [dispatch]);

  const returnHandler = () => {
    history.goBack();
  };

  const removeItemHandler = (id: string) => {
    swal({
      title: 'Warning',
      text: 'Are you sure you want to remove this item from your cart?',
      icon: 'warning',
      dangerMode: true,
      buttons: {
        deny: {
          text: 'Cancel',
          value: null,
        },
        confirm: {
          text: 'Yes',
          value: true,
        },
      },
    }).then(async (willDelete) => {
      if (willDelete) {
        const result: any = await dispatch(removeFavItem(id));

        if (result.meta.requestStatus === 'fulfilled') {
          swal({
            title: 'Success',
            text: 'Item removed successfully',
            icon: 'success',
          });
        } else if (result.meta.requestStatus === 'rejected') {
          swal({
            title: 'Error',
            text: result.payload,
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <main>
      <div className='container'>
        <section className='cart__header'>
          <i className='bx bx-left-arrow-alt' onClick={returnHandler}></i>
          <p className='cart__title'>
            Shopping Cart (<span>{favorites ? favorites.length : 0}</span>)
          </p>
        </section>
        <section className='cart__list'>
          {loading ? (
            <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <React.Fragment>
              {favorites.map((item) => (
                <div className='cart__item' key={item.id}>
                  <img
                    className='item__img'
                    src={item.images[0]}
                    alt={item.name}
                  />
                  <div className='item__info'>
                    <div className='item__header'>
                      <p className='item__title'>{item.name}</p>
                      <p className='item__price'>
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className='item__description'>
                      Seller {item.postedBy.firstName} {item.postedBy.lastName}
                    </div>
                  </div>
                  <button
                    type='button'
                    className='item__remove-btn'
                    onClick={() => removeItemHandler(item.id)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </React.Fragment>
          )}
        </section>
      </div>
      <NavBar />
    </main>
  );
}

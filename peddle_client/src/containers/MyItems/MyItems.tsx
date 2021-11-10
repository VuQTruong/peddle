import { State } from '../../store';
import NavBar from '../../components/NavBar/NavBar';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, } from 'react-router-dom';
import { getItemsByUserId } from '../../features/user/userItemsSlice';
import { useEffect } from 'react';
import { ItemTile } from '../../components/Item/ItemTile';
import { IoMdAddCircle } from "react-icons/io";

export default function MyItems() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { userItems } = useSelector((state: State) => state.userItems);

    useEffect(() => {
        dispatch(getItemsByUserId());
    },[])

    return (
        <main>
            <div className="container">
                <section className='my-items__header'>
                    <i className='bx bx-left-arrow-alt' onClick={history.goBack} />
                    <div className="my-items__title">My items</div>
                </section>
                <div className="my-items__item-list">
                    { userItems.map(item=> <ItemTile key={item.id} item={{...item}} />) }
                </div >
                <div className='my-items__add-button-div' >
                    <button className='my-items__add-button' type="button" onClick={(e) => console.log('button clicked')}>
                        <IoMdAddCircle style={{backgroundColor :'#507dbc'}} color='' size={40}/>
                        <p>{'Add item'}</p>
                    </button>
                </div>
            </div>
            <NavBar />
        </main>
    );
  }
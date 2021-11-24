import { State } from '../../store';
import NavBar from '../../components/NavBar/NavBar';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, } from 'react-router-dom';
import { getChatByUser } from '../../features/chat/userMessagesSlice';
import { useEffect } from 'react';
import { ChatTile } from '../../components/Chat/ChatTile';
import { IoMdAddCircle } from "react-icons/io";

export default function UserMessages() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { userMessages } = useSelector((state: State) => state.userMessages);

    useEffect(() => {
        dispatch(getChatByUser());
    },[])

    return (
        <main>
            <div className="container">
                <section className='my-items__header'>
                    <i className='bx bx-left-arrow-alt' onClick={history.goBack} />
                    <div className="my-items__title">My Messages</div>
                </section>
                <div className="my-items__item-list">
                    { userMessages?.map(chat=> <ChatTile key={chat.id} chat={{...chat}} />) }
                </div >
            </div>
            <NavBar />
        </main>
    );
  }
import { useDispatch, useSelector } from 'react-redux';
import WavyDivider from '../../components/WavyDivider/WavyDivider';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { State } from '../../store';
import { isURL } from '../../utilities/validators';
import { useEffect, useState } from 'react';
import { fetchCurrUser } from '../../features/user/userSlice';
import axios from 'axios';

type ResponseType = {
  status: string;
  message: string;
  data: {
    chatForUser: [];
  };
};

export default function Home() {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const { userInfo } = user;

  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    dispatch(fetchCurrUser());
    fetchChatFromDb()
  }, [])

  const fetchChatFromDb = async () => {
    try {
      const itemRes = await axios.get<ResponseType>(
        `/api/chat/user/${userInfo.id}`
      );
      
      setMessageCount(itemRes.data.data.chatForUser.length);
      
    } catch (error: any) {
      //return rejectWithValue(error.response.data);
    }

  }

  return (
    <main className='home__container'>
      <section className='home__header'>
        <div className='home__user-info'>
          <div className='home__greeting'>
            Welcome back, {userInfo.firstName}!
          </div>

          <Avatar
            className='home__user-avatar'
            name={`${userInfo.firstName} ${userInfo.lastName}`}
            round={true}
            size='100'
            textSizeRatio={3}
            src={isURL(userInfo.photo) ? userInfo.photo : ''}
          />
        </div>
        <WavyDivider position='top' />
      </section>

      <section className='home__content'>
        <Link
          to='/shopping'
          className='btn btn-primary home__btn home__btn--shop'
        >
          Start Shopping
        </Link>
        <Link
          to='/user'
          className='btn btn-secondary home__btn home__btn--option'
        >
          Profile
          <i className='bx bx-chevron-right'></i>
        </Link>


        <Link to='/search' className='btn btn-secondary home__btn home__btn--option'>
          Search Items
          <i className='bx bx-chevron-right'></i>
        </Link>

        {/* <Link
          to='/cart'
          className='btn btn-secondary home__btn home__btn--option'
        >
          Shopping Cart ({userInfo.favouriteItems?.length || '0'})
          <i className='bx bx-chevron-right'></i>
        </Link> */}

        <Link to='/user-messages' className='btn btn-secondary home__btn home__btn--option'>
          Messages ({messageCount})
          <i className='bx bx-chevron-right'></i>
        </Link>

        <Link
          to='/my-items'
          className='btn btn-secondary home__btn home__btn--option'
        >
          My Items ({userInfo.postedItems?.length || '0'})
          <i className='bx bx-chevron-right'></i>
        </Link>


        

        <Link
          to='/settings'
          className='btn btn-secondary home__btn home__btn--option'
        >
          Settings
          <i className='bx bx-chevron-right'></i>
        </Link>
      </section>
    </main>
  );
}

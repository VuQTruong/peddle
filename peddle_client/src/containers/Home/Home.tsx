import { useSelector } from 'react-redux';
import WavyDivider from '../../components/WavyDivider/WavyDivider';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { State } from '../../store';
import { isURL } from '../../utilities/validators';

export default function Home() {
  const user = useSelector((state: State) => state.user);
  const { userInfo } = user;

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
        <Link to='#' className='btn btn-secondary home__btn home__btn--option'>
          Shopping Cart (3)
          <i className='bx bx-chevron-right'></i>
        </Link>
        <Link to='#' className='btn btn-secondary home__btn home__btn--option'>
          My Items (4)
          <i className='bx bx-chevron-right'></i>
        </Link>
        <Link to='/settings' className='btn btn-secondary home__btn home__btn--option'>
          Settings
          <i className='bx bx-chevron-right'></i>
        </Link>
      </section>
    </main>
  );
}

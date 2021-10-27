import WavyDivider from '../../components/WavyDivider/WavyDivider';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className='home__container'>
      <section className='home__header'>
        <div className='home__user-info'>
          <div className='home__greeting'>Welcome back, Gary!</div>

          <Avatar
            className='home__user-avatar'
            name='Gary'
            round={true}
            size='100'
            textSizeRatio={3}
            // src='http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3'
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
        <Link to='#' className='btn btn-secondary home__btn home__btn--option'>
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
        <Link to='#' className='btn btn-secondary home__btn home__btn--option'>
          Settings
          <i className='bx bx-chevron-right'></i>
        </Link>
      </section>
    </main>
  );
}

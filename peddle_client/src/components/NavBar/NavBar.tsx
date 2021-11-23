import { Link } from 'react-router-dom';
import WavyDivider from '../WavyDivider/WavyDivider';

export default function NavBar() {
  return (
    <section className='navbar__container'>
      <WavyDivider position='bottom' />
      <nav className='navbar__content'>
        <ul className='navbar__list'>
          <li className='navbar__item'>
            <Link to='/'>
              <i className='bx bx-home'></i>
            </Link>
          </li>
          <li className='navbar__item'>
            <Link to='/search'>
              <i className='bx bx-search'></i>
            </Link>
          </li>
          <li className='navbar__item'>
            <Link to='/cart'>
              <i className='bx bx-basket'></i>
            </Link>
          </li>
          <li className='navbar__item'>
            <Link to='/'>
              <i className='bx bx-chat'></i>
            </Link>
          </li>
          <li className='navbar__item'>
            <Link to='/user'>
              <i className='bx bx-user'></i>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

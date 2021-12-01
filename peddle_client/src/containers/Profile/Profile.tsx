import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import NavBar from '../../components/NavBar/NavBar';
import { signOut } from '../../features/user/userSlice';
import { State } from '../../store';
import { isURL } from '../../utilities/validators';
import { useHistory, Link } from 'react-router-dom';

export default function UserInfo() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.user);
  const { userInfo } = user;

  const signOutHandler = () => {
    swal({
      title: 'Signing Out',
      text: 'Do you really want to sign out?',
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
    }).then((value) => {
      if (value) {
        dispatch(signOut());
      }
    });
  };

  const returnHandler = () => {
    history.goBack();
  };

  return (
    <main>
      <div className='container profile__container'>
        <section className='profile__header'>
          <i className='bx bx-left-arrow-alt' onClick={returnHandler}></i>

          <div className='profile__user-info'>
            <Avatar
              className='profile__user-avatar'
              name={`${userInfo.firstName} ${userInfo.lastName}`}
              round={true}
              size='125'
              textSizeRatio={3}
              src={isURL(userInfo.photo) ? userInfo.photo : ''}
            />
            <div className='profile__user-name'>
              {userInfo.firstName} {userInfo.lastName}
            </div>
            <div className='profile__user-status'>Trusted | Top 5% Seller</div>
          </div>
        </section>

        <section className='profile__features'>
          <Link
            to='/upgrade'
            className='btn btn-primary profile__btn profile__btn--upgrade'
          >
            Upgrade to Pro
          </Link>

          <Link
            to='/user'
            className='btn btn-secondary profile__btn profile__btn--option'
          >
            Purchase History
            <i className='bx bx-chevron-right'></i>
          </Link>
          <Link
            to='/user'
            className='btn btn-secondary profile__btn profile__btn--option'
          >
            Sell History
            <i className='bx bx-chevron-right'></i>
          </Link>
          <Link
            to='/user'
            className='btn btn-secondary profile__btn profile__btn--option'
          >
            Invite Friends
            <i className='bx bx-chevron-right'></i>
          </Link>
          <button
            className='btn btn-secondary profile__btn profile__btn--option'
            onClick={signOutHandler}
          >
            Logout
          </button>
        </section>
      </div>
      <NavBar />
    </main>
  );
}

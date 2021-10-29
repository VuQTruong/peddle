import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { State } from '../../store';
import { setSessionTTL } from '../../features/session/sessionSlice';
import { signOut } from '../../features/user/userSlice';

export default function SessionExpiredModal() {
  const dispatch = useDispatch();

  const session = useSelector((state: State) => state.session);
  const { sessionTTL } = session;

  useEffect(() => {
    let timeoutId;
    if (sessionTTL !== 0) {
      timeoutId = setTimeout(() => {
        swal({
          title: 'Session Expired',
          text: 'Your session has been expired. Please sign in to continue!',
          icon: 'warning',
        }).then((value) => {
          dispatch(setSessionTTL(0));
          dispatch(signOut());
        });
      }, sessionTTL - 5000);
    } else {
      clearTimeout(timeoutId);
    }
  }, [dispatch, sessionTTL]);

  return <div></div>;
}

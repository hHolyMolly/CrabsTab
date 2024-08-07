import { useAppDispatch, useAppSelector } from '@store';
import { selectIsAuth, setLogout } from '@store/slices/auth';

import { Button } from '@components/UI';
import Container from '@components/layouts/Container';

function Home() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const { user, status } = useAppSelector(({ auth }) => auth);

  return (
    <div>
      <Container>
        <div>{isAuth ? 'auth' : 'no-auth'}</div>

        {isAuth && <Button onClick={() => dispatch(setLogout())}>Logout</Button>}

        <div>{status !== 'loading' ? user?.email : 'Loading...'}</div>
      </Container>
    </div>
  );
}

export default Home;

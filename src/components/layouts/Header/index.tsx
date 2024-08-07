import './index.scss';

import Container from '../Container';
import { Logo, Menu, User, Basket } from './components';

function Header() {
  return (
    <header className="w-full sticky top-0 left-0 bg-white">
      <Container>
        <div className="py-[10px] min-h-[100px] flex justify-between items-center">
          <Logo />

          <Menu />

          <div className="gap-x-[8px] flex items-center">
            <User />

            <Basket />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;

import arrowBack from './img/arrow-back.svg';
import menu from './img/menu.svg';

import './header.styles.scss';

const navigation = [
  { link: '/', title: 'Просмотр' },
  { link: '/management', title: 'Управление' },
];

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div className="header__buttons">
        <button className="header__button" type="button">
          <img alt="menu" className="header__menu" src={menu} />
        </button>

        <button className="header__button" type="button">
          <img alt="arrow back" className="header__arrow-back" src={arrowBack} />
        </button>
      </div>

      <ul className="header__navigation">
        {navigation.map((item, index) => (
          <li className={`header__navigation-item${!index ? ' header__navigation-item_active' : ''}`}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  </header>
);

export default Header;

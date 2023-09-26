import axios from 'axios';
import { useEffect, useState } from 'react';

import { INavigation } from './Header.types';
import arrowBack from './img/arrow-back.svg';
import menu from './img/menu.svg';

import './Header.styles.scss';

const Header = () => {
  const [navigation, setNavigation] = useState<INavigation[]>([]);

  const getHeaderNavData = async () => {
    try {
      const { data } = await axios.get('/src/assets/json/headerNav.json');
      setNavigation(() => data.links);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    getHeaderNavData();
  }, []);

  return (
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

        <nav>
          <ul className="header__navigation">
            {navigation.map((item, index) => (
              <li
                key={item.title}
                className={`header__navigation-item${
                  !index ? ' header__navigation-item_active' : ''
                }`}
              >
                <a
                  className={`header__navigation-item-link ${
                    !index ? ' header__navigation-item-link_active' : ''
                  }`}
                  href={item.link}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

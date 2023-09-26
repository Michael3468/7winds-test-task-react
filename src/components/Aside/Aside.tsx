import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { IAsideNav } from './Aside.types';
import navItemIcon from './img/nav-item-icon.svg';

import './Aside.styles.scss';

const Aside = () => {
  const [asideNav, setAsideNav] = useState<IAsideNav[]>([]);

  const getAsideData = useCallback(async () => {
    try {
      const { data } = await axios.get('src/assets/json/asideNav.json');
      setAsideNav(() => data.links);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAsideData();
  }, [getAsideData]);

  return (
    <aside className="aside">
      <div className="aside__header">
        <div className="aside__header-info">
          <h4 className="aside__header-caption">Название проекта</h4>
          <p className="aside__header-text">Аббревиатура</p>
        </div>
        <button className="aside__header-expand-button" type="button" />
      </div>

      <nav className="aside__nav">
        <ul className="aside__nav-items">
          {asideNav.map((item) => (
            <li key={item.title} className="aside__nav-item">
              <img alt="navigation item icon" className="aside__nav-item-image" src={navItemIcon} />
              <a className="aside__nav-item-link" href={item.link}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;

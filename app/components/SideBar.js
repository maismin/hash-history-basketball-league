import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import slug from 'slug';
import Loading from './Loading';

function SideBar({ title, list, loading }) {
  const match = useRouteMatch();

  return loading ? (
    <Loading />
  ) : (
    <div>
      <h3 className="header">{title}</h3>
      <ul className="sidebar-list">
        {list.map(item => (
          <NavLink
            key={item}
            to={`${match.url}/${slug(item)}`}
            activeStyle={{ listStyleType: 'none', fontWeight: 'bold' }}
          >
            {item.toUpperCase()}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SideBar;

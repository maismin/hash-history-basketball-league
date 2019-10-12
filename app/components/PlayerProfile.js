import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

function PlayerProfile({ playerInfo }) {
  const location = useLocation();

  const {
    name,
    position,
    teamId,
    number,
    avatar,
    apg,
    ppg,
    rpg,
    spg,
  } = playerInfo;

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <TransitionGroup className="panel">
      <CSSTransition key={location.key} timeout={250} classNames="fade">
        <div className="panel">
          <img className="avatar" src={`${avatar}`} alt={`${name}'s avatar`} />
          <h1 className="medium-header">{name}</h1>
          <h3 className="header">#{number}</h3>
          <div className="row">
            <ul className="info-list" style={{ marginRight: 80 }}>
              <li>
                Team
                <div>
                  <Link style={{ color: '#68809a' }} to={`/${teamId}`}>
                    {teamId[0].toUpperCase() + teamId.slice(1)}
                  </Link>
                </div>
              </li>
              <li>
                Position
                <div>{position}</div>
              </li>
              <li>
                PPG
                <div>{ppg}</div>
              </li>
            </ul>
            <ul className="info-list">
              <li>
                APG
                <div>{apg}</div>
              </li>
              <li>
                SPG
                <div>{spg}</div>
              </li>
              <li>
                RPG
                <div>{rpg}</div>
              </li>
            </ul>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

PlayerProfile.propTypes = {
  playerInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    apg: PropTypes.number.isRequired,
    ppg: PropTypes.number.isRequired,
    rpg: PropTypes.number.isRequired,
    spg: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlayerProfile;

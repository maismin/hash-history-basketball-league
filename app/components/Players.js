import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import SideBar from './SideBar';
import { getPlayers } from '../utils/api';

function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const fetchPlayers = teamId => {
    getPlayers(teamId).then(playersArr => {
      setPlayers(playersArr);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    if (location.search) {
      fetchPlayers(parse(location.search).teamId);
    } else {
      fetchPlayers();
    }
  }, []);

  return (
    <div className="container two-column">
      <SideBar
        title="Players"
        loading={loading}
        list={players.map(player => player.name)}
      />
      {!loading && location.pathname === '/players' ? (
        <div className="sidebar-instruction">Select a Player</div>
      ) : null}
    </div>
  );
}

export default Players;

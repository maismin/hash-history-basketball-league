import React, { useState, useEffect } from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import { parse } from 'query-string';
import slug from 'slug';
import SideBar from './SideBar';
import PlayerInfo from './PlayerProfile';
import { getPlayers } from '../utils/api';

function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const match = useRouteMatch();

  const fetchPlayers = teamId => {
    getPlayers(teamId).then(playersArr => {
      setPlayers(playersArr);
      setLoading(false);
    });
  };

  useEffect(() => {
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

      <Route
        path={`${match.url}/:playerId`}
        render={({ match }) => {
          if (loading) {
            return null;
          }

          const playerInfo = players.find(
            player => slug(player.name) === match.params.playerId,
          );

          return <PlayerInfo playerInfo={playerInfo} />;
        }}
      />
    </div>
  );
}

export default Players;

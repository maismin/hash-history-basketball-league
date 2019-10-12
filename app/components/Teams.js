import React, { useState, useEffect } from 'react';
import { Route, Link, useLocation, useRouteMatch } from 'react-router-dom';
import SideBar from './SideBar';
import { getTeamNames } from '../utils/api';
import Team from './Team';
import TeamLogo from './TeamLogo';

function Teams() {
  const [teamNames, setTeamNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const match = useRouteMatch();

  useEffect(() => {
    getTeamNames().then(teamNamesArr => {
      setTeamNames(teamNamesArr);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container two-column">
      <SideBar loading={loading} title="Teams" list={teamNames} />
      {!loading && location.pathname === '/teams' ? (
        <div className="sidebar-instruction">Select a Team</div>
      ) : null}

      <Route
        path={`${match.url}/:teamId`}
        render={({ match }) => (
          <div className="panel">
            <Team id={match.params.teamId}>
              {team =>
                team === null ? (
                  <h1>LOADING</h1>
                ) : (
                  <div style={{ width: '100%' }}>
                    <TeamLogo id={team.id} className="center" />
                    <h1 className="medium-header">{team.name}</h1>
                    <ul className="info-list row">
                      <li>
                        Established
                        <div>{team.established}</div>
                      </li>
                      <li>
                        Manager
                        <div>{team.manager}</div>
                      </li>
                      <li>
                        Coach
                        <div>{team.coach}</div>
                      </li>
                    </ul>
                    <Link
                      to={`/${match.params.teamId}`}
                      className="center btn-main"
                    >
                      {`${team.name} Team Page`}
                    </Link>
                  </div>
                )
              }
            </Team>
          </div>
        )}
      />
    </div>
  );
}

export default Teams;

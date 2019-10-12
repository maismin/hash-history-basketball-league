import React, { useState, useEffect } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import slug from 'slug';
import { getTeamsArticles, getTeamNames } from '../utils/api';
import TeamLogo from './TeamLogo';
import Team from './Team';
import Loading from './Loading';

const INITIAL_STATE = {
  articles: [],
  teamNames: [],
  loading: true,
};

function TeamPage() {
  const [state, setState] = useState(INITIAL_STATE);

  const match = useRouteMatch();

  useEffect(() => {
    let didCancel = false;
    Promise.all([getTeamNames(), getTeamsArticles(match.params.teamId)]).then(
      ([teamNames, articlesArr]) => {
        if (!didCancel) {
          setState({
            articles: articlesArr,
            teamNames,
            loading: false,
          });
        }
      },
    );

    return () => {
      didCancel = true;
    };
  }, []);

  const { loading, articles, teamNames } = state;

  if (!loading && !teamNames.includes(match.params.teamId)) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Team id={match.params.teamId}>
        {team =>
          team === null ? (
            <Loading />
          ) : (
            <div className="panel">
              <TeamLogo id={team.id} />
              <h1 className="medium-header">{team.name}</h1>
              <h4 style={{ margin: 5 }}>
                <Link
                  style={{ cursor: 'pointer' }}
                  to={{
                    pathname: '/players',
                    search: `?teamId=${match.params.teamId}`,
                  }}
                >
                  Team Roster
                </Link>
              </h4>
              <ul className="championships">
                {team.championships.map(ship => (
                  <li key={ship}>{ship}</li>
                ))}
              </ul>
              <ul className="info-list row" style={{ width: '100%' }}>
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
                <li>
                  Record
                  <div>
                    {team.wins}-{team.losses}
                  </div>
                </li>
              </ul>
              <h2 className="headers">Articles</h2>
              <ul>
                {articles.map(article => (
                  <li key={article.id}>
                    <Link to={`${match.url}/articles/${slug(article.title)}`}>
                      <h4 className="article-title">{article.title}</h4>
                      <div className="article-date">
                        {article.date.toLocaleDateString()}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      </Team>
    </div>
  );
}

export default TeamPage;

import React, { useState, useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import SideBar from './SideBar';
import { getTeamsArticles } from '../utils/api';
import Loading from './Loading';
import Article from './Article';

const INITAL_STATE = {
  loading: true,
  teamArticles: [],
};

function Articles() {
  const [state, setState] = useState(INITAL_STATE);

  const match = useRouteMatch();

  const { teamId } = match.params;

  useEffect(() => {
    getTeamsArticles(teamId).then(teamArticles => {
      setState({
        loading: false,
        teamArticles: teamArticles.map(article => article.title),
      });
    });
  }, []);

  const { loading, teamArticles } = state;

  return loading ? (
    <Loading />
  ) : (
    <div className="container two-column">
      <SideBar loading={loading} title="Articles" list={teamArticles} />
      <Route
        path={`${match.url}/:articleId`}
        render={({ match }) => (
          <Article articleId={match.params.articleId} teamId={teamId}>
            {article =>
              !article ? (
                <Loading />
              ) : (
                <div className="panel">
                  <article className="article" key={article.id}>
                    <h1 className="header">{article.title}</h1>
                    <p>{article.body}</p>
                  </article>
                </div>
              )
            }
          </Article>
        )}
      />
    </div>
  );
}

export default Articles;

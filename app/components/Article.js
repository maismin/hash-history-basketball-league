import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../utils/api';

function Article({ teamId, articleId, children }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setArticle(null);
    getArticle(teamId, articleId).then(article => {
      if (isMounted) {
        setArticle(article);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [teamId, articleId]);

  return children(article);
}

Article.propTypes = {
  teamId: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Article;

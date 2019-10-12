import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../utils/api';

function Team({ id, children }) {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setTeam(null);
    getTeam(id).then(team => {
      if (isMounted) {
        setTeam(team);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return children(team);
}

Team.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Team;

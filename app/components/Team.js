import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../utils/api';

function Team({ id, children }) {
  const [team, setTeam] = useState(null);

  const fetchTeam = id => {
    getTeam(id).then(team => setTeam(team));
  };

  useEffect(() => {
    setTeam(null);
    fetchTeam(id);
  }, [id]);

  return children(team);
}

Team.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Team;

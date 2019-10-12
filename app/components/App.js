import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import TeamPage from './TeamPage';
import Articles from './Articles';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
          <Route path="/:teamId" exact component={TeamPage} />
          <Route path="/:teamId/articles" component={Articles} />
          <Route
            render={() => <h1 className="text-center">Four Oh Four.</h1>}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

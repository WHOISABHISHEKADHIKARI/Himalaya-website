import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={About} />
        <Route path="/contact" component={Contact} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
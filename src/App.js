import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PartyCreationForm from './components/PartyCreationForm';
//import PartyCreationForm from './components/PartyCreationForm';


function App() {
  return (
    <div className="App">
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/PartyCreationForm" component={PartyCreationForm} />

          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/shop" component={Shop} /> */}
        </Switch>

      </Router>
    </div>
  );
}


export default App;

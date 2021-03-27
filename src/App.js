import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PartyCreationForm from './components/PartyCreationForm';
import { useEffect, useState } from 'react';
//import PartyCreationForm from './components/PartyCreationForm';


function App() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetch("/parties").then(response =>
      response.json().then(data => {
        setParties(data.parties);
      })
    );
  }, []);

  const Wrapper = function (props) {
    return (<PartyCreationForm  {...props} onNewParty={party => setParties(currentParties => [...currentParties, party])} parties={parties} />);
  }




  return (
    <div className="App">
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/PartyCreationForm" component={PartyCreationForm} /> */}
          <Route path="/PartyCreationForm" component={Wrapper} />

          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/shop" component={Shop} /> */}
        </Switch>

      </Router>
    </div>
  );
}


export default App;

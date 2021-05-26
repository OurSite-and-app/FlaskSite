import './App.css';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PartyCreationForm from './components/PartyCreationForm';
import Registration from './components/Registration';
import Login from './components/Login';
import PartiesOfUser from './components/PartiesOfUser';
import admin from './components/admin';

import { useEffect, useState } from 'react';
import Logout from './components/Logout';
import Adminpanel from './components/Adminpanel';
//import PartyCreationForm from './components/PartyCreationForm';


function App() {
  const [parties, setParties] = useState([]);
  // const [party_list, setUsrParty] = useState([]);

  useEffect(() => {
    fetch("/api/parties").then(response =>
      response.json().then(data => {
        setParties(data.parties);
      })
    );
  }, []);


  // useEffect(() => {
  //   let myToken = localStorage.getItem('myToken')
  //   fetch("/party_by_user", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

  //     }
  //   }).then(response =>
  //     response.json().then(data => {
  //       setUsrParty(data.party_list);
  //     })
  //   );
  // }, []);






  const Wrapper = function (props) {
    //let data = localStorage.getItem('myToken')
    //console.log(data.replace(/['"]+/g, ''))
    console.log("HELLLOO3", typeof (parties))

    return (<PartyCreationForm  {...props} onNewParty={party => setParties(currentParties => [...currentParties, party])} parties={parties} />);
  }

  // const WrapperParty = function (props) {
  //   let data = localStorage.getItem('myToken')
  //   console.log("HELLLOO", data.replace(/['"]+/g, ''))
  //   console.log("HELLLOO2", typeof (party_list))

  //   return (
  //     //<PartiesOfUser {...props} onDelParty={party => setUsrParty(currentParties => [...currentParties, party])} party_list={party_list} />
  //     <PartiesOfUser {...props} party_list={party_list} />

  //   );
  // }




  return (
    <div className="App">
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/PartyCreationForm" component={PartyCreationForm} /> */}
          <Route path="/PartyCreationForm" component={Wrapper} />
          <Route path="/Registration" component={Registration} />
          <Route path="/Login" component={Login} />
          <Route path="/PartiesOfUser" component={PartiesOfUser} />
          <Route path="/Logout" component={Logout} />
          <Route path="/admin" exact component={admin} />
          <Route path="/admin/Adminpanel" component={Adminpanel} />


          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/shop" component={Shop} /> */}
        </Switch>

      </Router>
    </div>
  );
}


export default App;

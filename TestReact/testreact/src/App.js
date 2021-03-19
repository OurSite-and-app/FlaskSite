import React, { Component } from "react";
import "./App.css";
import { Body, Body2 } from './components/Body'
import { Header } from "./components/Header";


// const Body = () => {
//   return (
//     <p className="App-intro">
//       To get started, edit <code>src/App.js</code> and save to reload.
//     </p>
//   );
// };

// function Body() {
//   return (
//     <p className="App-intro">
//       To get started, edit <code>src/App.js</code> and save to reload.
//     </p>
//   );
// }



class App extends Component {
  add(a, b) {
    return a + b;
  }

  render() {
    return (
      <div className="App">
        <Header
          title={"Hello"}
          num={7}
          myArr={[10, 2, 3]}
          myFunc={this.add}
          myObj={{
            a: 5,
            b: 6
          }}
        />
        <Body2 />
        <Body myFunc={this.add} text="i am cool" text2="i am cool2" />
        <Body myFunc={this.add} text="i am" text2="i cool2" />
      </div>
    );
  }
}

export default App;
import React, { Component } from "react";
import "./App.css";
import ImageSlider from "./components/ImageSlider";

class App extends Component {
  state = {
    visible: true
  }

  render() {
    return (
      <div className="App">
        {this.state.visible ? <ImageSlider /> : null}
        <button
          onClick={() => {
            this.setState({ visible: false });
          }}
        >
          hide
          </button>
      </div>
    );
  }
}

export default App;
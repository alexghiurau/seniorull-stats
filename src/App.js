import React from "react";
import "./App.css";
import theman from "./theman.PNG";
import iron from "./iron.png";

export default class App extends React.Component {
  state = {
    flex: "",
    solo: "",
    flexNo: "",
    soloNo: "",
    flexWins: 0,
    flexLoses: 0,
    flexLP: 0,
    soloWins: 0,
    soloLoses: 0,
    soloLP: 0
  };

  componentDidMount() {
    this.updateStats();
  }

  updateStats = () => {
    this.getData()
      .then(res =>
        this.setState({
          flex: res.data[1].tier,
          solo: res.data[0].tier,
          flexNo: res.data[1].rank,
          soloNo: res.data[0].rank,
          flexWins: res.data[1].wins,
          flexLoses: res.data[1].losses,
          flexLP: res.data[1].leaguePoints,
          soloWins: res.data[0].wins,
          soloLoses: res.data[0].losses,
          soloLP: res.data[0].leaguePoints
        })
      )
      .catch(err => console.log(err));
  };

  getData = async () => {
    const response = await fetch("/api/seniorull");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Seniorull Stats</h1>
          <div className="imageContainer">
            <img src={iron} className="App-logo" alt="iron" />
            <img src={theman} className="App-logo calin" alt="calin" />
          </div>
          <button className="btn btn-primary btn-lg" onClick={this.updateStats}>
            Refresh Stats
          </button>
          <br />
          <h3>Ranked Solo/Duo</h3>
          <p>
            <span style={{ backgroundColor: "#FFD700", color: "black" }}>
              {this.state.solo} {this.state.soloNo} {this.state.soloLP} LP
            </span>{" "}
            at Solo/Duo and has{" "}
            <span style={{ backgroundColor: "green" }}>
              {this.state.soloWins} wins
            </span>{" "}
            /{" "}
            <span style={{ backgroundColor: "red" }}>
              {this.state.soloLoses} losses
            </span>{" "}
            with a{" "}
            {parseInt(
              (this.state.soloWins /
                (this.state.soloWins + this.state.soloLoses)) *
                100
            )}
            % win ratio.
          </p>
          <h3>Ranked Flex</h3>
          <p>
            <span style={{ backgroundColor: "#cd7f32", color: "black" }}>
              {this.state.flex} {this.state.flexNo} {this.state.flexLP} LP
            </span>{" "}
            at Flex and has{" "}
            <span style={{ backgroundColor: "green" }}>
              {this.state.flexWins} wins
            </span>{" "}
            /{" "}
            <span style={{ backgroundColor: "red" }}>
              {this.state.flexLoses} losses
            </span>{" "}
            with a{" "}
            {parseInt(
              (this.state.flexWins /
                (this.state.flexWins + this.state.flexLoses)) *
                100
            )}
            % win ratio.
          </p>
          <br />
          <p className="subTitle">
            App created with <span role="img">❤️</span> by Alex using Riot Games
            API and React. &copy; 2019
          </p>
        </header>
      </div>
    );
  }
}

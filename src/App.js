import React, { Component } from "react";
import { PlayerStatus } from './PlayerStatus';
import './App.css';

export default class WarStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      teamStatus:  [
      ],
      loading: true,
     };  
  }

  componentDidMount() {
    let url = "https://json-server-rush-wars.herokuapp.com/teamStatus"
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({
      teamStatus: data,
      loading: false,
    }));
}

  toggleStatus = (id, index) => {
    let status = [...this.state.teamStatus];
    // console.log(status)
     this.state.teamStatus[index].status === true ?
        status[index].status = false :
        status[index].status = true;

    this.setState({ teamStatus: status})

    let data = this.state.teamStatus[index]
    console.log(data)

    fetch("https://json-server-rush-wars.herokuapp.com/teamStatus/" + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
                  'Content-Type': ' application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => {
      response.json().then((response) => {
        console.log(response);
      })
    }).catch(err => {
      console.error(err)
    })

    console.log(id)
  } 

  render() {
    if (this.state.loading) {
      return <h1>Loading Team Status...</h1>;
    }
    const status = this.state.teamStatus.map((teamStatus, index) => (
      <PlayerStatus key={index} index={index} status={teamStatus} 
        toggleStatus={this.toggleStatus}
        />
    ));
    return (
      <div className="container">
        <h1>
          Orange Stem War Status <br />
        </h1>

        <table>
          <thead>
            <tr>
              <td></td>
              <td>Player</td>
              <td>War Status</td>
            </tr>
          </thead>
          <tbody>{status}</tbody>
        </table>
      </div>
    );
  } 
}
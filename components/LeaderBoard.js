/* eslint-disable no-shadow */
import React, { Component } from 'react';
import Link from 'next/link';
import boardStyle from '../styles/LeaderBoard.module.css';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      person: [],
    };
  }

  async componentDidMount() {
    const url = 'https://api-kel3.herokuapp.com/infoPlayer/';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      person: data.sort((a, b) => b.score - a.score), loading: false,
    });
  }

  render() {
    const { loading, person } = this.state;
    return (
      <div className="container p-4">
        {loading || !person ? (
          <div className="spinner-border mx-auto d-block" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )
          : (
            <div>
              <div className="table-responsive">
                <table className="table table-dark responsive table-hover table-striped">
                  <thead>
                    <tr><th colSpan="3"><h1 className="text-center">LeaderBoard</h1></th></tr>
                    <tr>
                      <th> Rank </th>
                      <th> Username </th>
                      <th> Score </th>
                    </tr>
                  </thead>
                  <tbody>
                    {person.map((person, index) => (
                      <tr key={person.user_id}>
                        <th scope="row">
                          {index + 1}
                        </th>
                        <td>
                          <Link href={`/profile/${person.user_id}`} className={boardStyle.link}>{person.username}</Link>
                        </td>
                        <td>{person.score}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          )}

      </div>
    );
  }
}

export default LeaderBoard;

/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  history: state.history,
  score: state.score,
});

// eslint-disable-next-line react/prefer-stateless-function
class History extends Component {
  render() {
    const { history } = this.props;
    const { score } = this.props;

    if (!history.length) {
      return null;
    }
    return (
      <div className="p-4" style={{ backgroundColor: '#9C835F' }}>
        <h1 className="text-center">History</h1>
        <h2 className="text-center">
          SCORE GAINED:
          {score}
        </h2>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <Table dark responsive hover striped style={{ width: '50vw' }}>
            <thead>
              <tr>
                <th className="text-center"> ROUND </th>
                <th className="text-center"> PLAYER CHOICE </th>
                <th className="text-center"> COM CHOICE </th>
                <th className="text-center"> RESULT </th>
              </tr>
            </thead>
            <tbody>
              {history.map((history, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={index + 1}>
                  <td scope="row" className="text-center" style={history.result === 'WON' ? { color: 'LimeGreen' } : (history.result === 'LOST' ? { color: 'red' } : null)}>
                    {index + 1}
                  </td>
                  <td className="text-center" style={history.result === 'WON' ? { color: 'LimeGreen' } : (history.result === 'LOST' ? { color: 'red' } : null)}>
                    {history.playerChoice.toUpperCase()}
                  </td>
                  <td className="text-center" style={history.result === 'WON' ? { color: 'LimeGreen' } : (history.result === 'LOST' ? { color: 'red' } : null)}>{history.comChoice.toUpperCase()}</td>
                  <td className="text-center" style={history.result === 'WON' ? { color: 'LimeGreen' } : (history.result === 'LOST' ? { color: 'red' } : null)}>{history.result}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const showHistory = connect(mapStateToProps)(History);

export default showHistory;

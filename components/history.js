import React, { Component, Fragment } from 'react';
import {Table} from 'reactstrap';
import {connect} from 'react-redux';

const mapStateToProps=(state)=>{
  return{
    history:state.history,
    score:state.score
  }
}

class History extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let history=this.props.history
    let score=this.props.score

    if(!history.length){
      return null
    }
    return (
      <Fragment>
        <div className='p-4' style={{backgroundColor:'#9C835F'}}>
            <h1 className="text-center">History</h1>
            <h2 className="text-center">SCORE GAINED: {score}</h2>
            <div style={{display:'grid',placeItems:'center'}}>
            <Table dark responsive hover striped style={{width:'50vw'}}>
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
                  <tr key={index+1}>
                    <td scope="row" className="text-center" style={history.result=="WON"?{color:'LimeGreen'}:(history.result=="LOST"?{color:'red'}:null)}>
                      {index + 1}
                    </td>
                    <td className="text-center" style={history.result=="WON"?{color:'LimeGreen'}:(history.result=="LOST"?{color:'red'}:null)}>
                      {history.playerChoice.toUpperCase()}
                    </td>
                    <td className="text-center" style={history.result=="WON"?{color:'LimeGreen'}:(history.result=="LOST"?{color:'red'}:null)}>{history.comChoice.toUpperCase()}</td>
                    <td className="text-center" style={history.result=="WON"?{color:'LimeGreen'}:(history.result=="LOST"?{color:'red'}:null)}>{history.result}</td>
                  </tr>
                )
                )}
              </tbody>
            </Table>
            </div>
          </div>
      </Fragment>
    );
  }
}

 
const showHistory=connect(mapStateToProps)(History);

export default showHistory